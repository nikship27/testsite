"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import {
  CartIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
  SparkleIcon,
} from "@/components/icons";

export default function Header({
  categories,
}: {
  categories: { name: string; count: number }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { totalItems, openCart } = useCart();
  const { theme, toggleTheme } = useTheme();

  const [search, setSearch] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    if (pathname === "/") {
      const urlSearch = searchParams.get("q");
      if (urlSearch !== search) {
        // Keep the input in sync when navigation changes the URL query.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSearch(urlSearch ?? "");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const currentCategory = searchParams.get("category") ?? "";

  const applyFilters = (next: { q?: string; category?: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    const q = next.q ?? search;
    if (q) params.set("q", q);
    else params.delete("q");
    if (next.category) params.set("category", next.category);
    else params.delete("category");
    if (params.get("canceled")) params.delete("canceled");

    const qs = params.toString();
    const href = qs ? `/?${qs}` : "/";

    if (pathname === "/") {
      router.replace(href, { scroll: false });
    } else {
      router.push(href, { scroll: false });
    }
  };

  useEffect(() => {
    if (pathname !== "/") return;
    const handler = setTimeout(() => {
      applyFilters({ q: search });
    }, 400);
    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, pathname]);

  const onCategoryChange = (value: string) => {
    applyFilters({ category: value });
  };

  return (
    <header className="glass-strong sticky top-0 z-40 border-b">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-6 sm:px-6">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight"
        >
          <span className="text-gradient flex items-center">
            <SparkleIcon className="h-5 w-5" />
            <span className="ml-1">lumina</span>
          </span>
        </Link>

        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              aria-label="Search products"
              className="glass w-full rounded-full py-2 pl-9 pr-4 text-sm outline-none transition placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </div>

          <select
            value={currentCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            aria-label="Filter by category"
            className="glass hidden cursor-pointer rounded-full px-4 py-2 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30 sm:block"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="glass rounded-full p-2.5 transition hover:scale-105 hover:border-accent/50"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${totalItems} items`}
            className="glass relative rounded-full p-2.5 transition hover:scale-105 hover:border-accent/50"
          >
            <CartIcon className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-semibold text-white">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-3 sm:hidden">
        <select
          value={currentCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          aria-label="Filter by category"
          className="glass w-full cursor-pointer rounded-full px-4 py-2 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
