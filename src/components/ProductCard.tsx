"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/generated/prisma/client";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { CheckIcon, PlusIcon } from "@/components/icons";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const outOfStock = product.stock <= 0;

  const quickAdd = () => {
    addToCart(product);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article className="glass group flex flex-col overflow-hidden rounded-2xl shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        <span className="glass absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold">
          {product.category}
        </span>

        {outOfStock ? (
          <span className="absolute right-3 top-3 rounded-full bg-red-500/90 px-2.5 py-1 text-xs font-semibold text-white">
            Out of stock
          </span>
        ) : product.stock <= 5 ? (
          <span className="absolute right-3 top-3 rounded-full bg-amber-500/90 px-2.5 py-1 text-xs font-semibold text-white">
            Only {product.stock} left
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-1 text-sm font-semibold leading-snug">
          {product.title}
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="text-base font-bold tracking-tight">
            {formatPrice(product.price)}
          </span>

          <button
            type="button"
            onClick={quickAdd}
            disabled={outOfStock}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition active:scale-95 ${
              justAdded
                ? "bg-emerald-500 text-white"
                : "bg-accent text-white hover:opacity-90"
            } ${outOfStock ? "cursor-not-allowed bg-slate-400 text-white opacity-60" : ""}`}
          >
            {justAdded ? (
              <>
                <CheckIcon className="h-3.5 w-3.5" /> Added
              </>
            ) : outOfStock ? (
              "Sold out"
            ) : (
              <>
                <PlusIcon className="h-3.5 w-3.5" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
