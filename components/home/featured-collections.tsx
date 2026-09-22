"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { COLLECTIONS } from "@/lib/constants/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { FabricPlate } from "@/components/shared/fabric-plate";
import { Reveal } from "@/components/shared/reveal";

// Asymmetric spans: index 0 spans 2 cols on desktop, others are single
const SPAN_MAP: Record<number, string> = {
  0: "sm:col-span-2 sm:row-span-2",
  3: "sm:col-span-2",
};

export function FeaturedCollections() {
  return (
    <section className="bg-bone py-24 text-void sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Shop by World"
          title="Six collections, one point of view"
          description="Each collection is cut around a specific way of moving through the day — pick the one that matches yours."
          className="mb-14"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:grid-rows-2">
          {COLLECTIONS.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.06} className={SPAN_MAP[i] ?? ""}>
              <Link
                href={`/category/${c.slug}`}
                className="group relative block h-full min-h-[280px] overflow-hidden"
              >
                <motion.div className="absolute inset-0" whileHover="hover" initial="rest">
                  <motion.div
                    variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full w-full"
                  >
                    <FabricPlate tone={c.tone} className="h-full w-full" />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent" />

                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span className="font-body text-[10px] uppercase tracking-[0.24em] text-champagne">
                      {c.itemCount} pieces
                    </span>
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="font-display text-3xl leading-tight text-bone sm:text-4xl">
                          {c.name}
                        </h3>
                        <p className="font-body text-xs text-bone/60">{c.tagline}</p>
                      </div>
                      <motion.span
                        variants={{ rest: { x: 0, y: 0 }, hover: { x: 4, y: -4 } }}
                        transition={{ duration: 0.3 }}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bone/10 text-bone backdrop-blur-sm"
                      >
                        <ArrowUpRight size={16} />
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
