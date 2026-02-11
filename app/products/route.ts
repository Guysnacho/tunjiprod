import { getActiveProducts } from "@/lib/stripe";

export async function GET() {
  try {
    const products = await getActiveProducts();
    return Response.json(products);
  } catch (err) {
    return Response.json(
      // @ts-expect-error should be an error message somewhere
      { message: err.message },
      { status: 500 },
    );
  }
}
