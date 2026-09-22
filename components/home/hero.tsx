"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FabricPlate } from "@/components/shared/fabric-plate";

const PARTICLE_COUNT = 34;

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const leftCurtain = useRef<HTMLDivElement>(null);
  const rightCurtain = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });
      tl.to([leftCurtain.current, rightCurtain.current], {
        opacity: 1,
        duration: 0.01,
      })
        .to(leftCurtain.current, { xPercent: -100, duration: 1.4 }, 0.15)
        .to(rightCurtain.current, { xPercent: 100, duration: 1.4 }, 0.15)
        .fromTo(
          ".hero-plate",
          { scale: 1.18, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.6, ease: "power3.out" },
          0.3
        );

      gsap.to(".hero-float-1", {
        y: -22,
        rotate: 4,
        duration: 5.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(".hero-float-2", {
        y: 18,
        rotate: -3,
        duration: 6.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 0.4,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-void">
      <div className="hero-plate absolute inset-0">
        <FabricPlate tone="from-[#2b2620] via-[#15120f] to-[#0a0a0b]" className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-void/60" />
      </div>

      {/* GSAP curtain reveal */}
      <div ref={leftCurtain} className="pointer-events-none absolute inset-y-0 left-0 z-30 w-1/2 bg-void opacity-0" />
      <div ref={rightCurtain} className="pointer-events-none absolute inset-y-0 right-0 z-30 w-1/2 bg-void opacity-0" />

      {/* Ambient particle field */}
      <div className="pointer-events-none absolute inset-0 z-[5]">
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <span
            key={i}
            className="absolute block rounded-full bg-champagne/40"
            style={{
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animation: `float-particle ${8 + (i % 6)}s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Floating accent frames */}
      <div className="hero-float-1 pointer-events-none absolute right-[8%] top-[22%] z-10 hidden aspect-[3/4] w-40 border border-champagne/30 backdrop-blur-[2px] lg:block" />
      <div className="hero-float-2 pointer-events-none absolute bottom-[16%] left-[6%] z-10 hidden h-24 w-24 rounded-full border border-bone/20 lg:block" />

      <div className="relative z-20 flex h-full flex-col justify-end">
        <div className="container pb-16 sm:pb-24">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 block font-body text-[11px] font-medium uppercase tracking-[0.32em] text-champagne"
          >
            FW26 Collection — Now Live
          </motion.span>

          <h1 className="font-display text-[13vw] leading-[0.92] tracking-tight text-bone sm:text-[8.5vw] lg:text-[6.4vw]">
            {["Fit for the", "world you're", "building."].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 1.3 + i * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <p className="max-w-md font-body text-sm leading-relaxed text-bone/60 sm:text-base">
              Considered tailoring and technical fabrics, cut for the studio, the street,
              and everything after. Ninety-four pieces, live now.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" variant="champagne" asChild>
                <Link href="/shop">
                  Shop the Drop <ArrowRight size={15} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-bone/40 text-bone hover:bg-bone hover:text-void" asChild>
                <Link href="/lookbook">View Lookbook</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        >
          <span className="font-body text-[10px] uppercase tracking-[0.28em] text-bone/50">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown size={16} className="text-bone/50" />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-18px) translateX(6px); opacity: 0.7; }
        }
      `}</style>
    </section>
  );
}
