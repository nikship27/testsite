import Link from "next/link";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import StoreLocation from "@/components/StoreLocation";
import CustomerReviews from "@/components/CustomerReviews";
import { getCategories, getProducts } from "@/lib/products";
import { CloseIcon } from "@/components/icons";

export default async function Home(props: PageProps<"/">) {
  const searchParams = await props.searchParams;

  const q = typeof searchParams.q === "string" ? searchParams.q : "";
  const category =
    typeof searchParams.category === "string" ? searchParams.category : "";
  const occasion =
    typeof searchParams.occasion === "string" ? searchParams.occasion : "";
  const canceled = searchParams.canceled === "1";

  const [products, categories] = await Promise.all([
    getProducts({
      q: q || null,
      category: category || null,
      occasion: occasion || null,
    }),
    getCategories(),
  ]);

  const hasFilters = Boolean(q || category || occasion);

  const categoryHref = (name: string | null) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (name) params.set("category", name);
    if (occasion) params.set("occasion", occasion);
    const qs = params.toString();
    return qs ? `/?${qs}` : "/";
  };

  return (
    <>
      {canceled && (
        <div className="border-b border-amber-500/30 bg-amber-500/10">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
            <CloseIcon className="h-4 w-4 text-amber-600" />
            <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
              Checkout was canceled. Your cart is still saved — no charges were
              made.
            </p>
          </div>
        </div>
      )}

      <Hero />

      <section id="products" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-20 sm:px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {q ? `Results for "${q}"` : "Featured products"}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {products.length} {products.length === 1 ? "product" : "products"}
              {category ? ` in ${category}` : ""}
              {occasion ? ` · ${occasion}` : ""}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href={categoryHref(null)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                !category
                  ? "bg-accent text-white shadow-md shadow-accent/25"
                  : "glass hover:border-accent/50"
              }`}
            >
              All
            </Link>
            {categories.map((c) => {
              const active = category === c.name;
              return (
                <Link
                  key={c.name}
                  href={categoryHref(c.name)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    active
                      ? "bg-accent text-white shadow-md shadow-accent/25"
                      : "glass hover:border-accent/50"
                  }`}
                >
                  {c.name}
                  <span className="ml-1 text-xs opacity-70">({c.count})</span>
                </Link>
              );
            })}
          </div>
        </div>

        <ProductGrid products={products} hasFilters={hasFilters} />
      </section>

      <CustomerReviews />

      <StoreLocation />
    </>
  );
}
