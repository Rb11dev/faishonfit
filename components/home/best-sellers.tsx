"use client";

import { useState } from "react";
import { TRENDING_PRODUCTS } from "@/lib/constants/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProductCard, type ProductCardData } from "@/components/product/product-card";
import { QuickViewDialog } from "@/components/product/quick-view-dialog";
import { Reveal } from "@/components/shared/reveal";

// Re-rank a slice of the catalog by rating * reviewCount as a stand-in
// for a real "units sold" query against OrderItem in production.
const BEST_SELLERS = [...TRENDING_PRODUCTS]
  .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
  .slice(0, 5);

export function BestSellers() {
  const [quickViewProduct, setQuickViewProduct] = useState<ProductCardData | null>(null);

  return (
    <section className="bg-bone py-24 text-void sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Ranked by Reorders"
          title="Best sellers"
          description="Updated weekly against live order volume — these are the five pieces customers come back for."
          className="mb-14"
        />

        <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-5">
          {BEST_SELLERS.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.06} className="relative">
              <span className="absolute -left-1 -top-3 z-10 font-display text-5xl text-void/10">
                {String(i + 1).padStart(2, "0")}
              </span>
              <ProductCard
                product={product as unknown as ProductCardData}
                onQuickView={setQuickViewProduct}
              />
            </Reveal>
          ))}
        </div>
      </div>

      <QuickViewDialog
        product={quickViewProduct}
        open={!!quickViewProduct}
        onOpenChange={(open) => !open && setQuickViewProduct(null)}
      />
    </section>
  );
}
