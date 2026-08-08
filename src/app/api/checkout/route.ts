import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripe, hasStripeKey } from "@/lib/stripe";

interface CheckoutLine {
  productId: string;
  quantity: number;
}

function getBaseUrl(request: NextRequest) {
  return (
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
    new URL(request.url).origin
  );
}

export async function POST(request: NextRequest) {
  if (!hasStripeKey()) {
    return Response.json(
      { error: "Stripe is not configured. Set STRIPE_SECRET_KEY." },
      { status: 503 }
    );
  }

  let body: { items?: CheckoutLine[] };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const rawItems = Array.isArray(body.items) ? body.items : [];
  if (rawItems.length === 0) {
    return Response.json({ error: "Cart is empty" }, { status: 400 });
  }

  const items: CheckoutLine[] = [];
  for (const item of rawItems) {
    const productId = typeof item?.productId === "string" ? item.productId : "";
    const quantity = Math.floor(Number(item?.quantity));
    if (!productId || !Number.isInteger(quantity) || quantity < 1) {
      return Response.json(
        { error: "Each item needs a valid productId and a positive quantity" },
        { status: 400 }
      );
    }
    items.push({ productId, quantity });
  }

  const products = await prisma.product.findMany({
    where: { id: { in: items.map((i) => i.productId) } },
  });

  if (products.length !== items.length) {
    return Response.json(
      { error: "One or more products were not found" },
      { status: 404 }
    );
  }

  const productById = new Map(products.map((p) => [p.id, p]));
  let totalAmount = 0;

  const lineItems = items.map(({ productId, quantity }) => {
    const product = productById.get(productId)!;
    if (product.stock < quantity) {
      throw new Error(
        `Insufficient stock for "${product.title}" (${product.stock} available)`
      );
    }
    totalAmount += product.price * quantity;
    return {
      quantity,
      price_data: {
        currency: "usd",
        unit_amount: product.price,
        product_data: {
          name: product.title,
          description: product.description.slice(0, 250),
          images: [product.image],
        },
      },
    };
  });

  const baseUrl = getBaseUrl(request);

  try {
    const session = await getStripe()!.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?canceled=1`,
      billing_address_collection: "auto",
      metadata: { itemCount: items.reduce((n, i) => n + i.quantity, 0) },
    });

    const order = await prisma.order.create({
      data: {
        totalAmount,
        status: "PENDING",
        stripeSessionId: session.id,
        items: {
          create: items.map(({ productId, quantity }) => ({
            productId,
            quantity,
            price: productById.get(productId)!.price,
          })),
        },
      },
    });

    return Response.json({ url: session.url, orderId: order.id });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to create checkout session";
    return Response.json({ error: message }, { status: 400 });
  }
}
