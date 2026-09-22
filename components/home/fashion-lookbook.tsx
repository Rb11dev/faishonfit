"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LOOKBOOK_EDITORIALS } from "@/lib/constants/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { FabricPlate } from "@/components/shared/fabric-plate";
import { Reveal } from "@/components/shared/reveal";

export function FashionLookbook() {
  return (
    <section className="bg-void py-24 text-bone sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="The Lookbook"
          title="Editorial, FW26"
          cta={{ label: "View Full Lookbook", href: "/lookbook" }}
          className="mb-14"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {LOOKBOOK_EDITORIALS.map((editorial, i) => (
            <Reveal key={editorial.id} delay={i * 0.08}>
              <Link href={`/lookbook/${editorial.id}`} className="group relative block overflow-hidden">
                <motion.div initial="rest" whileHover="hover" className="relative aspect-[4/5]">
                  <motion.div
                    variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full w-full"
                  >
                    <FabricPlate tone={editorial.tone} className="h-full w-full" />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent opacity-80" />

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                    <div>
                      <span className="font-body text-[10px] uppercase tracking-[0.24em] text-champagne">
                        {editorial.issue}
                      </span>
                      <h3 className="mt-1 font-display text-3xl leading-tight sm:text-4xl">
                        {editorial.title}
                      </h3>
                    </div>
                    <motion.span
                      variants={{ rest: { opacity: 0, x: -8 }, hover: { opacity: 1, x: 0 } }}
                      transition={{ duration: 0.3 }}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-bone/30 bg-void/40 backdrop-blur-sm"
                    >
                      <ArrowUpRight size={18} />
                    </motion.span>
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
