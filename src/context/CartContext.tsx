"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/generated/prisma/client";

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

function itemKey(productId: string, size?: string) {
  return `${productId}|${size ?? ""}`;
}

interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const STORAGE_KEY = "ethnic-threads-cart";

const CartContext = createContext<CartContextValue | null>(null);

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{
    items: CartItem[];
    hydrated: boolean;
  }>({ items: [], hydrated: false });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Restore the persisted cart once the client has mounted.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(() => ({ items: loadCart(), hydrated: true }));
  }, []);

  useEffect(() => {
    if (state.hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    }
  }, [state.items, state.hydrated]);

  const addToCart = useCallback(
    (product: Product, quantity = 1, size?: string) => {
      setState((prev) => {
        const existing = prev.items.find(
          (i) =>
            i.product.id === product.id &&
            itemKey(i.product.id, i.size) === itemKey(product.id, size)
        );
        if (existing) {
          return {
            ...prev,
            items: prev.items.map((i) =>
              itemKey(i.product.id, i.size) === itemKey(product.id, size)
                ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) }
                : i
            ),
          };
        }
        return {
          ...prev,
          items: [
            ...prev.items,
            { product, quantity: Math.min(quantity, product.stock), size },
          ],
        };
      });
    },
    []
  );

  const removeFromCart = useCallback((productId: string, size?: string) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.filter(
        (i) => itemKey(i.product.id, i.size) !== itemKey(productId, size)
      ),
    }));
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number, size?: string) => {
      setState((prev) => ({
        ...prev,
        items:
          quantity <= 0
            ? prev.items.filter(
                (i) => itemKey(i.product.id, i.size) !== itemKey(productId, size)
              )
            : prev.items.map((i) => {
                if (itemKey(i.product.id, i.size) !== itemKey(productId, size))
                  return i;
                const max = i.product.stock;
                return { ...i, quantity: Math.min(quantity, max) };
              }),
      }));
    },
    []
  );

  const clearCart = useCallback(() => {
    setState((prev) => ({ ...prev, items: [] }));
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const { totalItems, totalPrice } = useMemo(() => {
    return state.items.reduce(
      (acc, item) => {
        acc.totalItems += item.quantity;
        acc.totalPrice += item.product.price * item.quantity;
        return acc;
      },
      { totalItems: 0, totalPrice: 0 }
    );
  }, [state.items]);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
