import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export interface ProductFilters {
  q?: string | null;
  category?: string | null;
}

export async function getProducts(filters: ProductFilters = {}) {
  const { q, category } = filters;

  const where: Prisma.ProductWhereInput = {};

  if (category) {
    where.category = category;
  }

  if (q && q.trim()) {
    const query = q.trim();
    where.OR = [
      { title: { contains: query } },
      { description: { contains: query } },
      { category: { contains: query } },
    ];
  }

  return prisma.product.findMany({
    where,
    orderBy: { createdAt: "asc" },
  });
}

export async function getCategories() {
  const rows = await prisma.product.groupBy({
    by: ["category"],
    _count: { _all: true },
  });
  return rows.map((row) => ({
    name: row.category,
    count: row._count._all,
  }));
}
