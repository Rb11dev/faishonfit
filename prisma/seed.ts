import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = await Promise.all(
    [
      { name: "Women", slug: "women" },
      { name: "Men", slug: "men" },
      { name: "Streetwear", slug: "streetwear" },
      { name: "Sportswear", slug: "sportswear" },
      { name: "Maison", slug: "luxury" },
    ].map((c) =>
      prisma.category.upsert({
        where: { slug: c.slug },
        update: {},
        create: c,
      })
    )
  );

  const womens = categories.find((c) => c.slug === "women")!;

  const blazer = await prisma.product.upsert({
    where: { slug: "wool-crepe-tailored-blazer" },
    update: {},
    create: {
      name: "Wool-Crêpe Tailored Blazer",
      slug: "wool-crepe-tailored-blazer",
      description:
        "A single-breasted blazer cut from Italian wool-crêpe with a structured shoulder and softened waist. Fully lined, horn-effect buttons, finished by hand.",
      shortDescription: "Structured wool-crêpe blazer with a softened waist.",
      sku: "FF-BLZ-001",
      price: 428,
      compareAtPrice: 540,
      status: "ACTIVE",
      isFeatured: true,
      isBestSeller: true,
      material: "96% Wool, 4% Elastane",
      careInstructions: "Dry clean only.",
      categoryId: womens.id,
      images: {
        create: [{ url: "/images/products/blazer-1.jpg", isPrimary: true, position: 0 }],
      },
      variants: {
        create: [
          { sku: "FF-BLZ-001-BLK-S", size: "S", color: "Black", colorHex: "#0A0A0B", inventory: 12 },
          { sku: "FF-BLZ-001-BLK-M", size: "M", color: "Black", colorHex: "#0A0A0B", inventory: 18 },
          { sku: "FF-BLZ-001-BLK-L", size: "L", color: "Black", colorHex: "#0A0A0B", inventory: 9 },
          { sku: "FF-BLZ-001-CLY-M", size: "M", color: "Clay", colorHex: "#8B4225", inventory: 6 },
        ],
      },
    },
  });

  console.log({ categoriesSeeded: categories.length, sampleProduct: blazer.slug });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
