"use client";

import { useCurrency } from "@/context/CurrencyContext";

export default function CurrencySwitcher() {
  const { currency, setCurrency, currencies } = useCurrency();

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value as "INR" | "USD" | "GBP")}
      aria-label="Currency"
      className="glass hidden rounded-full px-4 py-2 text-sm font-medium outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30 sm:block"
    >
      {currencies.map((c) => (
        <option key={c.code} value={c.code}>
          {c.label}
        </option>
      ))}
    </select>
  );
}