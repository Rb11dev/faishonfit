"use client";

import { useMemo, useState } from "react";
import { NEW_ARRIVALS } from "@/lib/constants/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { FabricPlate } from "@/components/shared/fabric-plate";
import Link from "next/link";
import { formatPrice, cn } from "@/lib/utils";

const FILTERS = ["All", "Women", "Men", "Streetwear", "Sportswear", "Maison", "Accessories"] as const;

export function NewArrivals() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const products = useMemo(
    () =>
      filter === "All"
        ? NEW_ARRIVALS
        : NEW_ARRIVALS.filter((p) => p.category === filter),
    [filter]
  );

  return (
    <section className="bg-bone py-24 text-void sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Just In"
          title="New arrivals"
          className="mb-10"
        />

        <div className="mb-10 flex flex-wrap gap-2 border-b border-void/10 pb-6">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 font-body text-[11px] font-medium uppercase tracking-[0.16em] transition-colors",
                filter === f
                  ? "bg-void text-bone"
                  : "bg-void/5 text-void/60 hover:bg-void/10"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.05}>
              <Link href={`/product/${p.slug}`} className="group block">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <FabricPlate
                    tone={p.tone}
                    className="h-full w-full transition-transform duration-700 ease-luxury group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 bg-champagne px-2.5 py-1 font-body text-[10px] font-medium uppercase tracking-[0.14em] text-void">
                    New
                  </span>
                </div>
                <div className="mt-3 flex flex-col gap-0.5">
                  <span className="font-body text-[10px] uppercase tracking-[0.18em] text-void/45">
                    {p.category}
                  </span>
                  <span className="font-display text-base leading-snug group-hover:text-clay">
                    {p.name}
                  </span>
                  <span className="font-body text-sm">{formatPrice(p.price)}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
