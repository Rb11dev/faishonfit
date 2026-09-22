"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { FabricPlate } from "@/components/shared/fabric-plate";
import { StarRating } from "@/components/ui/star-rating";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { formatPrice, cn } from "@/lib/utils";

export interface ProductCardData {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAtPrice?: number | null;
  rating: number;
  reviewCount: number;
  colors: string[];
  tone: string;
  badge?: string | null;
}

export function ProductCard({
  product,
  onQuickView,
  className,
}: {
  product: ProductCardData;
  onQuickView?: (product: ProductCardData) => void;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [activeColor, setActiveColor] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.has(product.id));

  const discountPct = product.compareAtPrice
    ? Math.round(100 - (product.price / product.compareAtPrice) * 100)
    : null;

  return (
    <div
      className={cn("group relative flex flex-col", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-hairline/20">
        <Link href={`/product/${product.slug}`} aria-label={product.name}>
          <AnimatePresence initial={false}>
            <motion.div
              key={hovered ? "back" : "front"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: hovered ? 1.045 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <FabricPlate tone={product.tone} className="h-full w-full" />
            </motion.div>
          </AnimatePresence>
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.badge && (
            <Badge variant={product.badge === "NEW" ? "new" : product.badge === "ARCHIVE" ? "archive" : "sale"}>
              {product.badge}
            </Badge>
          )}
          {discountPct && !product.badge && <Badge variant="sale">-{discountPct}%</Badge>}
        </div>

        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlisted}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-bone/90 text-void backdrop-blur-sm transition-transform duration-300 hover:scale-110"
        >
          <Heart size={15} strokeWidth={1.75} className={cn(isWishlisted && "fill-clay text-clay")} />
        </button>

        <div
          className={cn(
            "absolute inset-x-3 bottom-3 flex gap-2 opacity-0 translate-y-2 transition-all duration-300",
            "group-hover:opacity-100 group-hover:translate-y-0 focus-within:opacity-100 focus-within:translate-y-0"
          )}
        >
          <button
            onClick={() =>
              addItem({
                id: product.id,
                productId: product.id,
                slug: product.slug,
                name: product.name,
                image: product.tone,
                price: product.price,
                size: "M",
                color: "Default",
              })
            }
            className="flex h-11 flex-1 items-center justify-center gap-2 bg-bone text-[11px] font-medium uppercase tracking-[0.16em] text-void transition-colors hover:bg-champagne"
          >
            <ShoppingBag size={14} strokeWidth={1.75} />
            Add to Cart
          </button>
          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              aria-label="Quick view"
              className="flex h-11 w-11 items-center justify-center bg-void/80 text-bone backdrop-blur-sm transition-colors hover:bg-void"
            >
              <Eye size={16} strokeWidth={1.75} />
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <span className="font-body text-[10px] uppercase tracking-[0.2em] text-current/45">
          {product.category}
        </span>
        <Link
          href={`/product/${product.slug}`}
          className="font-display text-[17px] leading-snug transition-colors hover:text-champagne"
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-2 pt-0.5">
          <StarRating rating={product.rating} />
          <span className="font-body text-[11px] text-current/45">({product.reviewCount})</span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <span className="font-body text-sm font-medium">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="font-body text-sm text-current/40 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>

        {product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 pt-1">
            {product.colors.map((c, i) => (
              <button
                key={c + i}
                onClick={() => setActiveColor(i)}
                aria-label={`View color ${i + 1}`}
                className={cn(
                  "h-4 w-4 rounded-full border transition-all",
                  activeColor === i ? "border-current scale-110" : "border-transparent"
                )}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
