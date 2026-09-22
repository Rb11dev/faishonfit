import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
  reverse = false,
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={cn("group relative flex overflow-hidden border-y border-current/10 py-4", className)}>
      <div
        className={cn(
          "flex shrink-0 items-center gap-8 animate-marquee",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-8 font-display text-sm uppercase tracking-[0.28em] text-current/70"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-champagne" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
