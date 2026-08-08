import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { formatPrice } from "@/lib/format";
import { ArrowRightIcon, CartIcon, CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Order confirmed · Ethnic Threads",
};

export default async function SuccessPage(props: PageProps<"/success">) {
  const searchParams = await props.searchParams;
  const sessionId =
    typeof searchParams.session_id === "string"
      ? searchParams.session_id
      : null;

  let order = null;
  let paymentStatus: string | null = null;
  let customerEmail: string | null = null;

  if (sessionId) {
    const stripe = getStripe();
    if (stripe) {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        paymentStatus = session.payment_status;
        customerEmail =
          typeof session.customer_details?.email === "string"
            ? session.customer_details.email
            : null;
      } catch {
        paymentStatus = null;
      }
    }

    order = await prisma.order.findUnique({
      where: { stripeSessionId: sessionId },
      include: { items: { include: { product: true } } },
    });
  }

  const confirmed =
    paymentStatus === "paid" || order?.status === "COMPLETED";

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="animate-scale-in text-center">
        <span
          className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${
            confirmed
              ? "bg-emerald-500/15 text-emerald-500"
              : "bg-amber-500/15 text-amber-500"
          }`}
        >
          <CheckIcon className="h-10 w-10" />
        </span>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight">
          {confirmed ? "Thank you for your order!" : "Order received"}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          {confirmed
            ? "Your payment was successful. A receipt has been sent to your email, and your order is being prepared."
            : order
              ? "Your payment is being processed. We will confirm your order as soon as the payment settles."
              : "We couldn't find an order for that session."}
        </p>
      </div>

      {order ? (
        <div className="glass mt-10 overflow-hidden rounded-3xl">
          <div className="border-b px-6 py-4">
            <p className="text-sm text-muted">Order</p>
            <p className="mt-0.5 font-mono text-sm font-semibold">{order.id}</p>
          </div>

          <ul className="divide-y px-6">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center gap-4 py-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={item.product.image}
                    alt={item.product.title}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {item.product.title}
                  </p>
                  <p className="text-xs text-muted">
                    {item.quantity} × {formatPrice(item.price)}
                    {item.size ? ` · Size ${item.size}` : ""}
                  </p>
                </div>
                <span className="text-sm font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="space-y-2 border-t px-6 py-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="font-medium">{formatPrice(order.totalAmount)}</span>
            </div>
            <div className="flex items-center justify-between text-base font-bold">
              <span>Total</span>
              <span>{formatPrice(order.totalAmount)}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted">Status</span>
              <span
                className={`rounded-full px-2.5 py-0.5 font-semibold ${
                  confirmed
                    ? "bg-emerald-500/15 text-emerald-500"
                    : "bg-amber-500/15 text-amber-500"
                }`}
              >
                {confirmed ? "Paid" : order.status.toLowerCase()}
              </span>
            </div>
            {customerEmail && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted">Receipt sent to</span>
                <span className="font-medium">{customerEmail}</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="glass mt-10 rounded-3xl px-6 py-10 text-center text-sm text-muted">
          {sessionId
            ? "This looks like an old or invalid checkout session."
            : "No checkout session was provided."}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Link
          href="/"
          className="glass flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:border-accent/50"
        >
          <CartIcon className="h-4 w-4 text-accent" />
          Continue shopping
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
