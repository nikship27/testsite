import { BadgeCheckIcon, QuoteIcon, StarIcon } from "@/components/icons";

const reviews = [
  {
    name: "Priya S.",
    location: "Delhi",
    quote:
      "The Banarasi silk saree I ordered is absolutely breathtaking — the gold zari catches the light perfectly. You can feel the handloom quality in every thread. This will be a family heirloom.",
    rating: 5,
    verified: true,
  },
  {
    name: "Anjali K.",
    location: "Mumbai",
    quote:
      "I bought the Royal Anarkali for my sister's wedding and the fit was flawless. The embroidery detail is incredible — people kept asking which designer it was from. So proud to wear Indian craftsmanship.",
    rating: 5,
    verified: true,
  },
  {
    name: "Meera R.",
    location: "Bangalore",
    quote:
      "The Chanderi kurti set is my new work-to-festive staple. Lightweight, breathable, and the dupatta adds just the right touch of elegance. Fast delivery and beautiful packaging too.",
    rating: 5,
    verified: true,
  },
  {
    name: "Rohit & Neha",
    location: "Hyderabad",
    quote:
      "We visited the flagship store and the experience was amazing — the team helped my wife pick a bridal lehenga and walked us through every fabric detail. The bandhani dupatta we got is stunning. 10/10.",
    rating: 5,
    verified: true,
  },
];

export default function CustomerReviews() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-12 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-soft px-4 py-1.5 text-xs font-semibold text-gold">
          <StarIcon className="h-3.5 w-3.5" />
          Google Maps Reviews
        </span>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Loved by <span className="text-gradient">150+ happy customers</span>
        </h2>
        <div className="mx-auto mt-5 flex max-w-md items-center justify-center gap-4 text-sm text-muted">
          <span className="flex items-center gap-1 font-bold text-accent">
            <StarIcon className="h-5 w-5 fill-current" />
            <StarIcon className="h-5 w-5 fill-current" />
            <StarIcon className="h-5 w-5 fill-current" />
            <StarIcon className="h-5 w-5 fill-current" />
            <StarIcon className="h-5 w-5 fill-current" />
            4.9 / 5.0
          </span>
          <span className="hidden sm:inline">(150+ Verified Reviews)</span>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map(({ name, location, quote, rating, verified }) => (
          <article
            key={name}
            className="glass rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-0.5">
                {[...Array(rating)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="h-4 w-4 fill-current text-gold"
                  />
                ))}
                {verified && (
                  <BadgeCheckIcon className="h-4 w-4 text-emerald-600" />
                )}
              </div>
              <QuoteIcon className="h-5 w-5 text-gold/40" />
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted">
              &ldquo;{quote}&rdquo;
            </p>

            <div className="mt-5 flex items-center gap-2">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white text-sm font-bold">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div>
                <p className="text-sm font-semibold">{name}</p>
                <p className="text-xs text-muted">{location}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}