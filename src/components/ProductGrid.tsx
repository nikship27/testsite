import type { Product } from "@/generated/prisma/client";
import ProductCard from "@/components/ProductCard";
import { SearchIcon } from "@/components/icons";

export default function ProductGrid({
  products,
  hasFilters,
}: {
  products: Product[];
  hasFilters: boolean;
}) {
  if (products.length === 0) {
    return (
      <div className="glass flex flex-col items-center gap-3 rounded-3xl px-6 py-20 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft">
          <SearchIcon className="h-7 w-7 text-accent" />
        </span>
        <h2 className="text-lg font-semibold">
          {hasFilters ? "No products match your filters" : "No products yet"}
        </h2>
        <p className="max-w-sm text-sm text-muted">
          {hasFilters
            ? "Try a different search term or category."
            : "Check back soon — new arrivals are on the way."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
