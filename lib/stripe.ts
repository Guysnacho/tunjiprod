import { Stripe } from "stripe";

let stripeInstance: Stripe | null = null;

function getStripe() {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  return stripeInstance;
}

export interface ProductWithPrice {
  id: string;
  name: string;
  description: string | null;
  metadata: Stripe.Metadata;
  price: {
    id: string;
    unit_amount: number | null;
    currency: string;
  } | null;
}

/**
 * Fetch all active products with their default prices
 */
export async function getActiveProducts(): Promise<ProductWithPrice[]> {
  const stripe = getStripe();

  const products = await stripe.products.list({
    active: true,
    expand: ["data.default_price"],
  });

  return products.data.map((product) => {
    const price = product.default_price as Stripe.Price | null;
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      metadata: product.metadata,
      price: price
        ? {
            id: price.id,
            unit_amount: price.unit_amount,
            currency: price.currency,
          }
        : null,
    };
  });
}

/**
 * Get all active product IDs (for coupon creation)
 */
export async function getActiveProductIds(): Promise<string[]> {
  const stripe = getStripe();
  const products = await stripe.products.list({ active: true });
  return products.data.map((p) => p.id);
}

/**
 * Look up a price by product metadata tier and type
 */
export async function findPriceByTier(
  tier: string,
  memberOnly: boolean
): Promise<{ id: string; tier: string; memberOnly: string } | null> {
  const stripe = getStripe();

  const products = await stripe.products.list({
    active: true,
    expand: ["data.default_price"],
  });

  // Match product by metadata: tier=student|postdoctorial|professional, type=conference|membership
  const targetType = memberOnly ? "membership" : "conference";
  const product = products.data.find(
    (p) => p.metadata.tier === tier && p.metadata.type === targetType
  );

  if (!product || !product.default_price) return null;

  const price = product.default_price as Stripe.Price;
  return {
    id: price.id,
    tier,
    memberOnly: memberOnly ? "true" : "false",
  };
}
