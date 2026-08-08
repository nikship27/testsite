"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Product } from "@/generated/prisma/client";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import SizeGuideModal from "@/components/SizeGuideModal";
import {
  BadgeCheckIcon,
  CheckIcon,
  CloseIcon,
  MinusIcon,
  PlusIcon,
  RulerIcon,
  ShieldCheckIcon,
} from "@/components/icons";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart, openCart } = useCart();
  const { format } = useCurrency();

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
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const outOfStock = product.stock <= 0;

  const handleAdd = () => {
    if (outOfStock) return;
    addToCart(product, quantity, isOneSize ? undefined : selectedSize);
    setJustAdded(true);
    window.setTimeout(() => {
      onClose();
      openCart();
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={product.title}
    >
      <div
        className="animate-fade-in absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="glass-strong animate-scale-in relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-4 top-4 z-10 rounded-full bg-black/30 p-2 text-white backdrop-blur transition hover:bg-black/50"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        <div className="grid flex-1 overflow-y-auto md:grid-cols-2">
          <div className="relative aspect-[4/5] w-full md:aspect-auto md:min-h-full">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(min-width: 768px) 384px, 100vw"
              className="object-cover"
              priority
            />
            <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
              {product.category}
            </span>
            {outOfStock && (
              <span className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                Out of stock
              </span>
            )}
          </div>

          <div className="flex flex-col gap-4 p-6 sm:p-7">
            <div>
              <h2 className="text-xl font-bold leading-snug tracking-tight">
                {product.title}
              </h2>
              <p className="mt-2 text-2xl font-extrabold text-accent">
                {format(product.price)}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.fabric && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <BadgeCheckIcon className="h-3.5 w-3.5" />
                  {product.fabric}
                </span>
              )}
              {product.careInstructions && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold text-gold">
                  <ShieldCheckIcon className="h-3.5 w-3.5" />
                  {product.careInstructions}
                </span>
              )}
            </div>

            <p className="text-sm leading-relaxed text-muted">
              {product.description}
            </p>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                Select size
              </span>
              {isOneSize ? (
                <p className="mt-2 text-sm font-medium">One Size -- fits all</p>
              ) : (
                <div className="mt-2 flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        selectedSize === size
                          ? "bg-accent text-white shadow-md shadow-accent/25"
                          : "glass hover:border-accent/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={() => setShowSizeGuide(true)}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gold underline-offset-2 transition hover:underline"
              >
                <RulerIcon className="h-4 w-4" />
                Size & Custom Stitching Guide
              </button>
            </div>

            <div className="mt-auto flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Quantity
                </span>
                <div className="flex items-center gap-1 rounded-full border">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="rounded-full p-2 transition hover:bg-accent-soft"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((q) => Math.min(product.stock, q + 1))
                    }
                    disabled={quantity >= product.stock}
                    aria-label="Increase quantity"
                    className="rounded-full p-2 transition hover:bg-accent-soft disabled:opacity-40"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                disabled={outOfStock}
                className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold text-white transition active:scale-[0.98] ${
                  justAdded
                    ? "bg-emerald-500"
                    : "bg-accent shadow-lg shadow-accent/25 hover:opacity-90"
                } ${outOfStock ? "cursor-not-allowed bg-slate-400 opacity-60" : ""}`}
              >
                {justAdded ? (
                  <>
                    <CheckIcon className="h-4 w-4" /> Added to cart
                  </>
                ) : outOfStock ? (
                  "Sold out"
                ) : (
                  "Add to cart \u00B7 " + format(product.price * quantity)
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    {showSizeGuide && (
        <SizeGuideModal onClose={() => setShowSizeGuide(false)} />
      )}
    </div>
  );
}