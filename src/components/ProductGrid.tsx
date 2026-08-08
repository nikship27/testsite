"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import type { Product } from "@/generated/prisma/client";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import { SearchIcon, SparkleIcon } from "@/components/icons";

const OCCASIONS = [
  "Bridal & Wedding",
  "Festive Celebrations",
  "Casual & Office",
  "Gifting & Accessories",
];

function OccasionTabs() {
  const searchParams = useSearchParams();
  const current = searchParams.get("occasion") ?? "";

  const makeHref = (occasion: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (occasion) params.set("occasion", occasion);
    else params.delete("occasion");
    const qs = params.toString();
    return qs ? `/?${qs}` : "/";
  };

  const tabClass = (active: boolean) =>
    `rounded-full px-4 py-1.5 text-sm font-semibold transition ${
      active
        ? "bg-gold text-white shadow-md shadow-gold/30"
        : "glass hover:border-gold/50"
    }`;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <span className="mr-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted">
        <SparkleIcon className="h-3.5 w-3.5 text-gold" />
        Occasion
      </span>
      <Link href={makeHref(null)} className={tabClass(!current)}>
        All
      </Link>
      {OCCASIONS.map((occasion) => (
        <Link
          key={occasion}
          href={makeHref(occasion)}
          className={tabClass(current === occasion)}
        >
          {occasion}
        </Link>
      ))}
    </div>
  );
}

export default function ProductGrid({
  products,
  hasFilters,
}: {
  products: Product[];
  hasFilters: boolean;
}) {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <>
      <Suspense fallback={<div className="mb-6 h-9" />}>
        <OccasionTabs />
      </Suspense>

      {products.length === 0 ? (
        <div className="glass flex flex-col items-center gap-3 rounded-3xl px-6 py-20 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-soft">
            <SearchIcon className="h-7 w-7 text-gold" />
          </span>
          <h2 className="text-lg font-semibold">
            {hasFilters ? "No pieces match your filters" : "No pieces yet"}
          </h2>
          <p className="max-w-sm text-sm text-muted">
            {hasFilters
              ? "Try a different search, category or occasion."
              : "Check back soon — new handcrafted arrivals are on the way."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={setSelected}
            />
          ))}
        </div>
      )}

      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
