import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getCategories } from "@/lib/products";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ethnic Threads · Handcrafted Ethnic Fashion",
  description:
    "Timeless heritage & handcrafted ethnic fashion — Banarasi sarees, lehengas, kurtas and artisan jewelry from Ethnic Threads.",
  openGraph: {
    title: "Ethnic Threads · Handcrafted Ethnic Fashion",
    description:
      "Timeless heritage & handcrafted ethnic fashion — Banarasi sarees, lehengas, kurtas and artisan jewelry.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://ethnicthreads.shop/#localbusiness",
      name: "Ethnic Threads",
      description:
        "Timeless heritage & handcrafted ethnic fashion — Banarasi sarees, lehengas, kurtas and artisan jewelry.",
      url: "https://ethnicthreads.shop/",
      telephone: "+91-99999-99999",
      priceRange: "₹1199-₹15999",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Shop No. 12, Heritage Bazaar",
        addressLocality: "City Centre",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "0.0",
        longitude: "0.0",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "10:30",
          closes: "20:30",
        },
      ],
      sameAs: [
        "https://share.google/tYb9P3DsNjLZYdsXX",
        "https://wa.me/919999999999",
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://ethnicthreads.shop/#organization",
      name: "Ethnic Threads",
      url: "https://ethnicthreads.shop/",
      logo: "https://ethnicthreads.shop/logo.png",
      sameAs: [
        "https://share.google/tYb9P3DsNjLZYdsXX",
        "https://wa.me/919999999999",
      ],
    },
  ],
};

export default async function RootLayout({
  children,
}: LayoutProps<"/">) {
  const categories = await getCategories();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}if(t==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <CurrencyProvider>
            <CartProvider>
              <Suspense fallback={<HeaderFallback />}>
                <Header categories={categories} />
              </Suspense>
              <main className="flex-1">{children}</main>
              <CartDrawer />
              <Footer />
              <WhatsAppButton />
            </CartProvider>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

function HeaderFallback() {
  return (
    <header className="glass-strong sticky top-0 z-40 border-b">
      <div className="mx-auto h-[62px] max-w-7xl px-4 sm:px-6" />
    </header>
  );
}
