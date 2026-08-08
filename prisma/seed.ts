import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});

const prisma = new PrismaClient({ adapter });

const products = [
  {
    title: "Aurora Wireless Headphones",
    description:
      "Premium over-ear headphones with active noise cancellation, 40-hour battery life, and plush memory-foam earcups for all-day comfort.",
    price: 19999,
    category: "Audio",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    stock: 18,
  },
  {
    title: "Pulse Smartwatch Pro",
    description:
      "Advanced health and fitness smartwatch with AMOLED display, GPS tracking, sleep analysis, and 7-day battery life.",
    price: 29999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    stock: 25,
  },
  {
    title: "Vista Mirrorless Camera",
    description:
      "Full-frame mirrorless camera with 4K video, dual card slots, and a 24MP sensor that delivers stunning low-light performance.",
    price: 89999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    stock: 8,
  },
  {
    title: "Echo Smart Speaker",
    description:
      "Room-filling 360° sound with voice control, built-in assistant, and seamless multi-room pairing.",
    price: 12999,
    category: "Audio",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
    stock: 30,
  },
  {
    title: "Nomad Travel Backpack",
    description:
      "Water-resistant 30L travel backpack with padded 16-inch laptop sleeve, hidden anti-theft pocket, and ergonomic straps.",
    price: 8999,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    stock: 22,
  },
  {
    title: "Velocity Running Shoes",
    description:
      "Lightweight performance runners with responsive foam cushioning, breathable knit upper, and superior grip.",
    price: 11999,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    stock: 15,
  },
  {
    title: "Solstice Polarized Sunglasses",
    description:
      "Handcrafted acetate frames with polarized UV400 lenses, glare reduction, and a timeless silhouette.",
    price: 7499,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
    stock: 40,
  },
  {
    title: "Classic Cotton Tee",
    description:
      "Soft, breathable 100% organic cotton t-shirt with a relaxed fit and pre-shrunk finish that lasts wash after wash.",
    price: 2499,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    stock: 50,
  },
];

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  const result = await prisma.product.createMany({
    data: products,
  });

  console.log(`Seeded ${result.count} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
