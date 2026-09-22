import { cn } from "@/lib/utils";

/**
 * FabricPlate renders a tone-on-tone gradient plate with a grain overlay
 * and a subtle diagonal sheen — the brand's stand-in for campaign
 * photography across the site until real shoot assets are wired in via
 * ProductImage.url / Collection.heroImage.
 */
export function FabricPlate({
  tone = "from-[#221f1c] to-[#0a0a0b]",
  className,
  grain = true,
  sheen = true,
  children,
}: {
  tone?: string;
  className?: string;
  grain?: boolean;
  sheen?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-gradient-to-br", tone, className)}>
      {sheen && (
        <div
          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            background:
              "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.14) 48%, transparent 62%)",
          }}
        />
      )}
      {grain && (
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18] mix-blend-overlay">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      )}
      {children}
    </div>
  );
}
