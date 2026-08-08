import Link from "next/link";
import {
  ClockIcon,
  ExternalLinkIcon,
  MapPinIcon,
  SparkleIcon,
} from "@/components/icons";

const GOOGLE_PROFILE_URL = "https://share.google/tYb9P3DsNjLZYdsXX";

const STORE_INFO = {
  name: "Ethnic Threads — Flagship Store",
  addressLine1: "Shop No. 12, Heritage Bazaar",
  addressLine2: "City Centre, India",
  hours: [
    { day: "Monday – Saturday", time: "10:30 AM – 8:30 PM" },
    { day: "Sunday", time: "Closed" },
  ],
};

export default function StoreLocation() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-8 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-soft px-4 py-1.5 text-xs font-semibold text-gold">
          <MapPinIcon className="h-3.5 w-3.5" />
          Visit Our Flagship Store
        </span>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Experience the craft <span className="text-gradient">in person</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
          Walk in, drape a saree, and feel the weave of every handloom piece.
          Our artisans and stylists will help you find your perfect fit.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-3xl p-7 sm:p-9">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-white shadow-md shadow-accent/25">
              <SparkleIcon className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-lg font-bold">{STORE_INFO.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {STORE_INFO.addressLine1}
                <br />
                {STORE_INFO.addressLine2}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-gold-soft p-5">
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold">
              <ClockIcon className="h-4 w-4" />
              Store timing
            </h4>
            <ul className="mt-3 space-y-2">
              {STORE_INFO.hours.map((row) => (
                <li
                  key={row.day}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="font-medium">{row.day}</span>
                  <span className="text-muted">{row.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white shadow-lg shadow-accent/25 transition hover:opacity-90 active:scale-[0.98]"
          >
            <MapPinIcon className="h-4 w-4" />
            Get Directions on Google Maps
            <ExternalLinkIcon className="h-4 w-4" />
          </Link>
        </div>

        <Link
          href={GOOGLE_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open store location on Google Maps"
          className="group relative block min-h-[320px] overflow-hidden rounded-3xl border border-card-border"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(30,122,82,0.25),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(166,124,29,0.2),transparent_50%)]" />
          <div className="bg-grid absolute inset-0 opacity-70" />
          <div className="absolute left-1/4 top-1/4 h-24 w-24 rounded-full bg-emerald/10 blur-xl" />
          <div className="absolute bottom-1/4 right-1/4 h-28 w-28 rounded-full bg-gold/10 blur-xl" />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-xl shadow-accent/40 transition group-hover:scale-110">
              <MapPinIcon className="h-8 w-8" />
            </span>
            <span className="glass-strong rounded-full px-5 py-2 text-sm font-bold text-accent">
              Open in Google Maps
            </span>
          </div>

          <span className="glass-strong absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold text-muted">
            Map preview
          </span>
        </Link>
      </div>
    </section>
  );
}
