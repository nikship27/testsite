import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
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
  title: "lumina · Tech & style commerce",
  description:
    "A modern e-commerce storefront with a curated catalog, instant cart, and Stripe-powered checkout.",
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
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}if(t==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <CartProvider>
            <Suspense fallback={<HeaderFallback />}>
              <Header categories={categories} />
            </Suspense>
            <main className="flex-1">{children}</main>
            <CartDrawer />
          </CartProvider>
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
