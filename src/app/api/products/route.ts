import { NextRequest } from "next/server";
import { getProducts } from "@/lib/products";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q");
  const category = searchParams.get("category");
  const occasion = searchParams.get("occasion");

  const products = await getProducts({ q, category, occasion });

  return Response.json({ products });
}
