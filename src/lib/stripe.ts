import Stripe from "stripe";

let cachedStripe: Stripe | null | undefined;

export function getStripe(): Stripe | null {
  if (cachedStripe !== undefined) return cachedStripe;
  const key = process.env.STRIPE_SECRET_KEY;
  cachedStripe = key ? new Stripe(key) : null;
  return cachedStripe;
}

export function hasStripeKey() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
