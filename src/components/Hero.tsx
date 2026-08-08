import Link from "next/link";
import {
  ArrowRightIcon,
  ExternalLinkIcon,
  MapPinIcon,
  RotateIcon,
  ShieldCheckIcon,
  SparkleIcon,
  TruckIcon,
} from "@/components/icons";

const GOOGLE_PROFILE_URL = "https://share.google/tYb9P3DsNjLZYdsXX";

const trustBadges = [
  { icon: ShieldCheckIcon, label: "100% Authentic Handloom" },
  { icon: TruckIcon, label: "Express Shipping" },
  { icon: RotateIcon, label: "Easy 7-Day Returns" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
      <div className="absolute -left-24 top-8 -z-10 h-72 w-72 rounded-full bg-emerald/20 blur-3xl" />
      <div className="absolute -right-24 top-24 -z-10 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 -z-10 h-64 w-96 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(231,195,106,0.08),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(189,69,103,0.10),transparent_45%)]" />

      <div className="mx-auto max-w-4xl px-4 pb-14 pt-16 text-center sm:px-6 sm:pt-24">
        <span className="glass animate-fade-in-up inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-gold">
          <SparkleIcon className="h-3.5 w-3.5" />
          Handcrafted by Master Artisans
        </span>

        <h1 className="animate-fade-in-up mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          Timeless Heritage &amp;
          <br />
          <span className="text-gradient">Handcrafted Ethnic Fashion</span>
        </h1>

        <p className="animate-fade-in-up mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg">
          From Banarasi silk sarees to hand-embroidered lehengas — every piece is
          woven, dyed and embellished by master artisans, and delivered to your
          door.
        </p>

        <div className="animate-fade-in-up mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#products"
            className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white shadow-lg shadow-accent/30 transition hover:opacity-90 active:scale-[0.98]"
          >
            Explore Collection
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="glass flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-gold transition hover:border-gold/60 hover:shadow-lg hover:shadow-gold/10"
          >
            <MapPinIcon className="h-4 w-4" />
            Visit Our Store
            <ExternalLinkIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="animate-fade-in-up mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {trustBadges.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-2 text-xs font-semibold text-muted"
            >
              <Icon className="h-4 w-4 text-gold" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
