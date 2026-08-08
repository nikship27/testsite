import Link from "next/link";
import { ArrowRightIcon, SparkleIcon } from "@/components/icons";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="absolute -top-24 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />

      <div className="mx-auto max-w-4xl px-4 pb-16 pt-16 text-center sm:px-6 sm:pt-24">
        <span className="glass animate-fade-in-up inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-accent">
          <SparkleIcon className="h-3.5 w-3.5" />
          New collection · Free shipping over $75
        </span>

        <h1 className="animate-fade-in-up mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          Tech meets style,
          <br />
          <span className="text-gradient">curated for you.</span>
        </h1>

        <p className="animate-fade-in-up mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg">
          Discover a hand-picked lineup of premium electronics and fashion
          essentials — fast checkout, secure payments, delivered with care.
        </p>

        <div className="animate-fade-in-up mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#products"
            className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:opacity-90 active:scale-[0.98]"
          >
            Shop now
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            href="/?category=Audio"
            className="glass rounded-full px-6 py-3 text-sm font-semibold transition hover:border-accent/50"
          >
            Browse audio
          </Link>
        </div>
      </div>
    </section>
  );
}
