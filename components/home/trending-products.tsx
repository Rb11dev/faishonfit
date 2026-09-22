"use client";

import { useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TRENDING_PRODUCTS } from "@/lib/constants/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProductCard, type ProductCardData } from "@/components/product/product-card";
import { QuickViewDialog } from "@/components/product/quick-view-dialog";

export function TrendingProducts() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [quickViewProduct, setQuickViewProduct] = useState<ProductCardData | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="bg-void py-24 text-bone sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="What's Moving"
          title="Trending this week"
          cta={{ label: "Shop All Trending", href: "/shop?filter=trending" }}
          className="mb-12"
        />

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-4 flex">
              {TRENDING_PRODUCTS.map((product) => (
                <div
                  key={product.id}
                  className="min-w-0 shrink-0 grow-0 basis-[78%] pl-4 sm:basis-[42%] lg:basis-[27%] xl:basis-[23%]"
                >
                  <ProductCard
                    product={product as unknown as ProductCardData}
                    onQuickView={setQuickViewProduct}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 hidden justify-end gap-3 sm:flex">
            <button
              onClick={scrollPrev}
              aria-label="Previous products"
              className="flex h-11 w-11 items-center justify-center border border-bone/20 transition-colors hover:border-champagne hover:text-champagne"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next products"
              className="flex h-11 w-11 items-center justify-center border border-bone/20 transition-colors hover:border-champagne hover:text-champagne"
            >
              <ChevronRight size={18} />
            </button>
          </div>
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
