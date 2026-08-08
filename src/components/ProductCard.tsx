"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/generated/prisma/client";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { CheckIcon, PlusIcon } from "@/components/icons";

export default function ProductCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: (product: Product) => void;
}) {
  const { addToCart, openCart } = useCart();
  const { format } = useCurrency();
  const [justAdded, setJustAdded] = useState(false);

  const sizes = product.sizes
    ? product.sizes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : ["One Size"];
  const isOneSize = sizes.length === 1 && sizes[0].toLowerCase() === "one size";

  const [selectedSize, setSelectedSize] = useState(() =>
    sizes.includes("M") ? "M" : sizes[0]
  );

  const outOfStock = product.stock <= 0;

  const quickAdd = () => {
    if (outOfStock) return;
    addToCart(product, 1, isOneSize ? undefined : selectedSize);
    setJustAdded(true);
    window.setTimeout(() => {
      setJustAdded(false);
      openCart();
    }, 500);
  };

  return (
    <article className="glass group flex flex-col overflow-hidden rounded-2xl shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10">
      <button
        type="button"
        onClick={() => onOpen(product)}
        aria-label={`View details for ${product.title}`}
        className="relative block aspect-square w-full cursor-pointer overflow-hidden text-left"
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

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

        {product.fabric && (
          <span className="glass absolute bottom-3 left-3 right-3 truncate rounded-full px-3 py-1 text-center text-[11px] font-semibold text-gold">
            {product.fabric}
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <button
          type="button"
          onClick={() => onOpen(product)}
          className="text-left"
        >
          <h3 className="line-clamp-1 text-sm font-semibold leading-snug hover:text-accent">
            {product.title}
          </h3>
        </button>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted">
          {product.description}
        </p>

        {!isOneSize && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                aria-label={`Select size ${size}`}
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition ${
                  selectedSize === size
                    ? "bg-accent text-white"
                    : "glass hover:border-accent/50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="text-base font-bold tracking-tight text-accent">
            {format(product.price)}
          </span>

          <button
            type="button"
            onClick={quickAdd}
            disabled={outOfStock}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition active:scale-95 ${
              justAdded
                ? "bg-emerald-500 text-white"
                : "bg-accent text-white shadow-md shadow-accent/25 hover:opacity-90"
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
