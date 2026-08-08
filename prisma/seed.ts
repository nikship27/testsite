import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});

const prisma = new PrismaClient({ adapter });

const products = [
  {
    title: "Banarasi Silk Saree (Pure Gold Zari)",
    description:
      "A timeless Banarasi silk saree woven on handlooms with pure gold zari. Rich butis, a regal pallu, and the unmistakable sheen of silk make this the heirloom piece your festive wardrobe deserves.",
    price: 12999,
    category: "Sarees",
    image:
      "https://images.pexels.com/photos/4227116/pexels-photo-4227116.jpeg?auto=compress&cs=tinysrgb&w=800",
    fabric: "Pure Silk · Gold Zari",
    careInstructions: "Dry Clean Only",
    sizes: "One Size",
    occasion: "Bridal & Wedding",
    stock: 12,
  },
  {
    title: "Chanderi Cotton Kurti Set with Dupatta",
    description:
      "Featherlight Chanderi cotton kurti set with a matching handwoven dupatta. Breathable, elegant, and perfect from desk to dinner — a daily-wear classic with festive charm.",
    price: 4499,
    category: "Kurtas & Sets",
    image:
      "https://images.pexels.com/photos/36311379/pexels-photo-36311379.jpeg?auto=compress&cs=tinysrgb&w=800",
    fabric: "Chanderi Cotton",
    careInstructions: "Gentle machine wash / Dry clean",
    sizes: "S,M,L,XL,XXL",
    occasion: "Casual & Office",
    stock: 20,
  },
  {
    title: "Royal Anarkali Suit (Hand-Embroidered)",
    description:
      "A flowing royal anarkali in soft georgette, hand-embroidered with delicate resham and zardozi details. The flared silhouette flatters every frame — made for weddings and celebrations.",
    price: 8999,
    category: "Kurtas & Sets",
    image:
      "https://images.pexels.com/photos/33343591/pexels-photo-33343591.jpeg?auto=compress&cs=tinysrgb&w=800",
    fabric: "Georgette · Hand-Embroidered",
    careInstructions: "Dry Clean Only",
    sizes: "S,M,L,XL,XXL",
    occasion: "Bridal & Wedding",
    stock: 10,
  },
  {
    title: "Chikankari Handloom Tunic",
    description:
      "Handcrafted Lucknowi chikankari on pure handloom cotton. Shadow-work embroidery in thread that matches the fabric creates a subtle, sophisticated texture you can wear anywhere.",
    price: 2999,
    category: "Kurtas & Sets",
    image:
      "https://images.pexels.com/photos/28512776/pexels-photo-28512776.jpeg?auto=compress&cs=tinysrgb&w=800",
    fabric: "Handloom Cotton · Chikankari",
    careInstructions: "Dry Clean Only",
    sizes: "S,M,L,XL,XXL",
    occasion: "Casual & Office",
    stock: 25,
  },
  {
    title: "Floral Printed Festive Lehenga",
    description:
      "A dreamy festive lehenga in floral-printed georgette with a flowing flared skirt and embellished blouse. Twirl-worthy, camera-ready, and sized for the bride-to-be's best friend.",
    price: 15999,
    category: "Lehengas",
    image:
      "https://images.pexels.com/photos/28405815/pexels-photo-28405815.jpeg?auto=compress&cs=tinysrgb&w=800",
    fabric: "Georgette · Floral Print",
    careInstructions: "Dry Clean Only",
    sizes: "S,M,L,XL,XXL",
    occasion: "Festive Celebrations",
    stock: 8,
  },
  {
    title: "Handwoven Bandhani Dupatta",
    description:
      "A vibrant handwoven bandhani dupatta with hundreds of hand-tied dots in jewel tones. The perfect finishing layer over kurtas, sarees, and lehengas alike.",
    price: 1899,
    category: "Dupattas",
    image:
      "https://images.pexels.com/photos/13584935/pexels-photo-13584935.jpeg?auto=compress&cs=tinysrgb&w=800",
    fabric: "Handwoven Cotton",
    careInstructions: "Gentle hand wash",
    sizes: "One Size",
    occasion: "Festive Celebrations",
    stock: 30,
  },
  {
    title: "Antique Kundan Jhumka Earrings",
    description:
      "Statement antique kundan jhumkas with layered pearls and intricate meenakari detailing. Lightweight enough for all-day wear, dazzling enough for the front row at any function.",
    price: 1499,
    category: "Jewelry & Accessories",
    image:
      "https://images.pexels.com/photos/7314466/pexels-photo-7314466.jpeg?auto=compress&cs=tinysrgb&w=800",
    fabric: "Gold-Plated · Kundan & Pearls",
    careInstructions: "Keep away from water & perfume",
    sizes: "One Size",
    occasion: "Gifting & Accessories",
    stock: 40,
  },
  {
    title: "Hand-Embroidered Velvet Potli Bag",
    description:
      "A luxurious velvet potli bag hand-embroidered with gold zardozi and finished with a tassel drawstring. The quintessential accessory to carry to any celebration.",
    price: 1199,
    category: "Jewelry & Accessories",
    image:
      "https://images.pexels.com/photos/7353386/pexels-photo-7353386.jpeg?auto=compress&cs=tinysrgb&w=800",
    fabric: "Velvet · Zardozi Embroidery",
    careInstructions: "Wipe clean with a soft dry cloth",
    sizes: "One Size",
    occasion: "Gifting & Accessories",
    stock: 35,
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
