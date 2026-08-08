"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import {
  ArrowRightIcon,
  CartIcon,
  CloseIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "@/components/icons";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
    totalItems,
  } = useCart();
  const { format } = useCurrency();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  const checkout = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
            size: i.size,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Checkout failed");
      }
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed");
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "animate-fade-in" : "opacity-0"
        }`}
        onClick={closeCart}
      />

      <aside
        className={`glass-strong absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="flex items-center gap-2 text-base font-semibold">
            <CartIcon className="h-5 w-5 text-accent" />
            Your cart
            {totalItems > 0 && (
              <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="rounded-full p-2 transition hover:bg-accent-soft"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-soft">
              <CartIcon className="h-8 w-8 text-accent" />
            </span>
            <h3 className="text-base font-semibold">Your cart is empty</h3>
            <p className="text-sm text-muted">
              Add a few products and they will show up here.
            </p>
            <button
              type="button"
              onClick={closeCart}
              className="mt-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Start shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {items.map((item) => (
                <li
                  key={`${item.product.id}|${item.size ?? ""}`}
                  className="glass flex gap-3 rounded-2xl p-3"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={item.product.image}
                      alt={item.product.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="line-clamp-2 text-sm font-medium">
                        {item.product.title}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id, item.size)}
                        aria-label={`Remove ${item.product.title}`}
                        className="shrink-0 rounded-md p-1 text-muted transition hover:text-red-500"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>

                    {item.size && (
                      <span className="mt-1 inline-flex w-fit rounded-full bg-gold-soft px-2 py-0.5 text-[11px] font-semibold text-gold">
                        Size {item.size}
                      </span>
                    )}

                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1 rounded-full border">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.size
                            )
                          }
                          aria-label="Decrease quantity"
                          className="rounded-full p-1.5 transition hover:bg-accent-soft"
                        >
                          <MinusIcon className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.size
                            )
                          }
                          disabled={item.quantity >= item.product.stock}
                          aria-label="Increase quantity"
                          className="rounded-full p-1.5 transition hover:bg-accent-soft disabled:opacity-40"
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-bold">
                        {format(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="glass-strong space-y-3 border-t px-5 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="text-lg font-bold">
                  {format(totalPrice)}
                </span>
              </div>
              <p className="text-xs text-muted">
                Taxes and shipping are calculated at checkout.
              </p>

              {error && (
                <p className="rounded-xl bg-red-500/10 px-3 py-2 text-xs font-medium text-red-500">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={checkout}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Redirecting…
                  </span>
                ) : (
                  <>
                    Proceed to checkout
                    <ArrowRightIcon className="h-4 w-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={clearCart}
                className="w-full text-center text-xs text-muted underline-offset-2 transition hover:text-red-500 hover:underline"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
