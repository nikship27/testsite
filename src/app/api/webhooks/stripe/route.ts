import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature");

  const stripe = getStripe();

  if (!stripe) {
    return Response.json(
      { error: "STRIPE_SECRET_KEY is not configured" },
      { status: 500 }
    );
  }

  if (!signature) {
    return Response.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return Response.json(
      { error: "STRIPE_WEBHOOK_SECRET is not configured" },
      { status: 500 }
    );
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, secret);
  } catch {
    return Response.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      if (!session.id) break;

      const order = await prisma.order.findUnique({
        where: { stripeSessionId: session.id },
        include: { items: true },
      });

      if (!order) {
        return Response.json(
          { error: "No order found for session" },
          { status: 404 }
        );
      }

      if (order.status !== "COMPLETED") {
        await prisma.$transaction([
          prisma.order.update({
            where: { id: order.id },
            data: { status: "COMPLETED" },
          }),
          ...order.items.map((item) =>
            prisma.product.update({
              where: { id: item.productId },
              data: { stock: { decrement: item.quantity } },
            })
          ),
        ]);
      }
      break;
    }
    case "checkout.session.expired": {
      const session = event.data.object;
      if (session.id) {
        await prisma.order.updateMany({
          where: { stripeSessionId: session.id, status: "PENDING" },
          data: { status: "EXPIRED" },
        });
      }
      break;
    }
  }

  return Response.json({ received: true });
}
