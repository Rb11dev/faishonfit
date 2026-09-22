import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  cta,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  cta?: { label: string; href: string };
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        cta && align === "left" && "sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className={cn("flex flex-col gap-3", align === "center" && "items-center")}>
        <Reveal>
          <span className="font-body text-[11px] font-medium uppercase tracking-[0.32em] text-champagne">
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h2>
        </Reveal>
        {description && (
          <Reveal delay={0.16}>
            <p className="max-w-xl font-body text-sm leading-relaxed text-current/60 sm:text-base">
              {description}
            </p>
          </Reveal>
        )}
      </div>
      {cta && (
        <Reveal delay={0.2}>
          <Link
            href={cta.href}
            className="group inline-flex items-center gap-2 whitespace-nowrap font-body text-xs font-medium uppercase tracking-[0.2em] text-current/80 transition-colors hover:text-champagne"
          >
            {cta.label}
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </Reveal>
      )}
    </div>
  );
}
