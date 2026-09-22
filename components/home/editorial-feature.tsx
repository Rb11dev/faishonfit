"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FabricPlate } from "@/components/shared/fabric-plate";
import { Reveal } from "@/components/shared/reveal";

export function EditorialFeature() {
  const imgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-void py-24 text-bone sm:py-32">
      <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative aspect-[4/5] overflow-hidden">
          <div ref={imgRef} className="absolute inset-0 h-[124%] -top-[12%]">
            <FabricPlate tone="from-[#2a1f16] via-[#150f0a] to-[#0a0a0b]" className="h-full w-full" />
          </div>
          <div className="absolute bottom-6 left-6 border border-champagne/40 bg-void/60 px-4 py-3 backdrop-blur-sm">
            <span className="font-display text-3xl text-champagne">04</span>
            <span className="block font-body text-[10px] uppercase tracking-[0.2em] text-bone/60">
              Fabrics Sourced
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Reveal>
            <span className="font-body text-[11px] font-medium uppercase tracking-[0.32em] text-champagne">
              Editorial — Issue 12
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <blockquote className="font-display text-3xl leading-[1.15] sm:text-4xl lg:text-[2.75rem]">
              &ldquo;We don&rsquo;t design for a season. We design for the version of you that has
              somewhere real to be.&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-md font-body text-sm leading-relaxed text-bone/55">
              Every FaishonFit piece moves through three fit rounds and a wear-test cycle
              before it&rsquo;s approved for production — on bodies that actually run, commute,
              and stand in rooms that matter.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-2 grid grid-cols-3 gap-6 border-t border-bone/10 pt-6">
              {[
                { value: "94", label: "Pieces this drop" },
                { value: "12", label: "Countries sourced from" },
                { value: "3", label: "Fit rounds per style" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="font-display text-3xl text-champagne">{stat.value}</span>
                  <span className="font-body text-[10px] uppercase tracking-[0.16em] text-bone/50">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
