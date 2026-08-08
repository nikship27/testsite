import Link from "next/link";
import {
  ClockIcon,
  ExternalLinkIcon,
  MapPinIcon,
  SparkleIcon,
} from "@/components/icons";

const GOOGLE_PROFILE_URL = "https://share.google/tYb9P3DsNjLZYdsXX";

const shopLinks = [
  { label: "Sarees", href: "/?category=Sarees" },
  { label: "Kurtas & Sets", href: "/?category=Kurtas%20%26%20Sets" },
  { label: "Lehengas", href: "/?category=Lehengas" },
  { label: "Dupattas", href: "/?category=Dupattas" },
  { label: "Jewelry & Accessories", href: "/?category=Jewelry%20%26%20Accessories" },
];

export default function Footer() {
  return (
    <footer className="glass-strong mt-auto border-t">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white shadow-md shadow-accent/25">
              <SparkleIcon className="h-5 w-5" />
            </span>
            <span className="text-base font-extrabold tracking-tight">
              Ethnic Threads
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            Timeless heritage &amp; handcrafted ethnic fashion. Every saree,
            lehenga and jewel is created by master artisans who have carried
            their craft across generations.
          </p>
          <Link
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gold transition hover:text-accent"
          >
            <MapPinIcon className="h-4 w-4" />
            Find us on Google Maps
            <ExternalLinkIcon className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-gold">
            Collections
          </h3>
          <ul className="mt-4 space-y-2.5">
            {shopLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-gold">
            Visit us
          </h3>
          <p className="mt-4 text-sm text-muted">
            Ethnic Threads Flagship Store
            <br />
            Heritage Bazaar, City Centre
          </p>
          <p className="mt-4 flex items-start gap-2 text-sm text-muted">
            <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <span>
              Mon – Sat: 10:30 AM – 8:30 PM
              <br />
              Sunday: Closed
            </span>
          </p>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} Ethnic Threads · All rights reserved
          </p>
          <p className="flex items-center gap-1.5">
            <span className="text-gold">✦</span>
            Proudly handcrafted with love in India
          </p>
        </div>
      </div>
    </footer>
  );
}
