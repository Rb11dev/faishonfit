import { FabricPlate } from "@/components/shared/fabric-plate";
import { Marquee } from "@/components/shared/marquee";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function BrandStory() {
  return (
    <section className="bg-bone text-void">
      <Marquee
        items={["Considered Tailoring", "Technical Fabrics", "Made to Move", "Since 2019"]}
        className="border-void/10"
      />

      <div className="container grid grid-cols-1 gap-0 lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-6 py-20 pr-0 sm:py-28 lg:pr-16">
          <Reveal>
            <span className="font-body text-[11px] font-medium uppercase tracking-[0.32em] text-clay">
              The House
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl">
              Started in one Brooklyn workshop. Built for wherever you&rsquo;re headed next.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-lg font-body text-sm leading-relaxed text-void/60 sm:text-base">
              FaishonFit began in 2019 as a six-person pattern-cutting studio with a simple
              complaint: nothing on the market moved the way its founders&rsquo; lives did. Seven
              years later, we&rsquo;re still cutting every first sample by hand, still fit-testing
              on real bodies in motion, and still refusing to release a piece that doesn&rsquo;t
              earn its place in rotation.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="max-w-lg font-body text-sm leading-relaxed text-void/60 sm:text-base">
              Today that means 12 fabric mills across three continents, a wear-test panel of
              over 200 people, and a size range built from actual body-scan data — not a
              single sample block scaled up and down.
            </p>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="pt-2">
              <Button variant="outline" size="lg" className="border-void/30" asChild>
                <Link href="/about">Our Full Story</Link>
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="relative grid min-h-[420px] grid-cols-2 gap-4 py-12 lg:py-16">
          <FabricPlate tone="from-[#221f1b] to-[#0a0a09]" className="mt-12 aspect-[3/4]" />
          <FabricPlate tone="from-[#1c211d] to-[#08090a]" className="aspect-[3/4]" />
        </div>
      </div>
    </section>
  );
}
