import { BadgeCheck } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { StarRating } from "@/components/ui/star-rating";
import { Reveal } from "@/components/shared/reveal";

export function CustomerReviews() {
  const avgRating =
    TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / TESTIMONIALS.length;

  return (
    <section className="bg-bone py-24 text-void sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Trusted by 40,000+ Customers"
          title="What people are wearing"
          className="mb-6"
        />

        <div className="mb-14 flex items-center gap-3">
          <StarRating rating={avgRating} size={16} />
          <span className="font-body text-sm text-void/60">
            {avgRating.toFixed(1)} average · 12,480 verified reviews
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.07}>
              <div className="flex h-full flex-col gap-4 border border-void/10 p-6">
                <StarRating rating={t.rating} />
                <p className="flex-1 font-body text-sm leading-relaxed text-void/75">
                  &ldquo;{t.body}&rdquo;
                </p>
                <div className="flex flex-col gap-1 border-t border-void/10 pt-4">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display text-base">{t.name}</span>
                    {t.verified && (
                      <BadgeCheck size={14} className="fill-champagne text-void" />
                    )}
                  </div>
                  <span className="font-body text-[11px] text-void/45">{t.location}</span>
                  <span className="font-body text-[11px] text-void/45">
                    Purchased: {t.purchased}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
