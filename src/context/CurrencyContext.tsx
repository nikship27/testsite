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

export type CurrencyCode = "INR" | "USD" | "GBP";

const CURRENCIES: { code: CurrencyCode; symbol: string; label: string }[] = [
  { code: "INR", symbol: "₹", label: "₹ INR" },
  { code: "USD", symbol: "$", label: "$ USD" },
  { code: "GBP", symbol: "£", label: "£ GBP" },
];

const RATES: Record<CurrencyCode, number> = {
  INR: 1,
  USD: 0.012,
  GBP: 0.0095,
};

const formatters: Record<CurrencyCode, Intl.NumberFormat> = {
  INR: new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }),
  USD: new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }),
  GBP: new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }),
};

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  currencies: typeof CURRENCIES;
  convert: (rupees: number) => number;
  format: (rupees: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const STORAGE_KEY = "ethnic-threads-currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("INR");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "USD" || stored === "GBP" || stored === "INR") {
      // Restore the persisted currency once the client has mounted.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrencyState(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currency);
  }, [currency]);

  const setCurrency = useCallback((next: CurrencyCode) => {
    setCurrencyState(next);
  }, []);

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrency,
      currencies: CURRENCIES,
      convert: (rupees) => rupees * RATES[currency],
      format: (rupees) => formatters[currency].format(rupees * RATES[currency]),
    }),
    [currency, setCurrency]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return ctx;
}
