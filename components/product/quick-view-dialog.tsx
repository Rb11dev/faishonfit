"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Heart } from "lucide-react";
import { useState } from "react";
import { FabricPlate } from "@/components/shared/fabric-plate";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import type { ProductCardData } from "@/components/product/product-card";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { formatPrice, cn } from "@/lib/utils";

const SIZES = ["XS", "S", "M", "L", "XL"];

export function QuickViewDialog({
  product,
  open,
  onOpenChange,
}: {
  product: ProductCardData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [size, setSize] = useState("M");
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.has(product?.id ?? ""));

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && product && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[70] bg-void/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                className="fixed left-1/2 top-1/2 z-[71] w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 bg-bone text-void shadow-2xl"
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <Dialog.Title className="sr-only">{product.name}</Dialog.Title>
                <Dialog.Close className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-void/5 transition-colors hover:bg-void/10">
                  <X size={16} />
                </Dialog.Close>

                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <FabricPlate tone={product.tone} className="aspect-[3/4] sm:aspect-auto sm:h-full" />

                  <div className="flex flex-col gap-4 p-6 sm:p-10">
                    <span className="font-body text-[10px] uppercase tracking-[0.24em] text-void/45">
                      {product.category}
                    </span>
                    <h3 className="font-display text-3xl leading-tight">{product.name}</h3>

                    <div className="flex items-center gap-2">
                      <StarRating rating={product.rating} />
                      <span className="font-body text-xs text-void/50">
                        {product.reviewCount} reviews
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-body text-lg font-medium">{formatPrice(product.price)}</span>
                      {product.compareAtPrice && (
                        <span className="font-body text-sm text-void/40 line-through">
                          {formatPrice(product.compareAtPrice)}
                        </span>
                      )}
                    </div>

                    <p className="font-body text-sm leading-relaxed text-void/60">
                      Cut from responsibly sourced material with a considered, precise drape.
                      Finished by hand and quality-checked before it ships.
                    </p>

                    <div className="flex flex-col gap-2 pt-2">
                      <span className="font-body text-[11px] uppercase tracking-[0.18em] text-void/50">
                        Size
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {SIZES.map((s) => (
                          <button
                            key={s}
                            onClick={() => setSize(s)}
                            className={cn(
                              "flex h-10 min-w-10 items-center justify-center border px-3 font-body text-xs transition-colors",
                              size === s
                                ? "border-void bg-void text-bone"
                                : "border-void/20 hover:border-void/60"
                            )}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-2 flex gap-3">
                      <Button
                        className="flex-1"
                        onClick={() =>
                          addItem({
                            id: product.id,
                            productId: product.id,
                            slug: product.slug,
                            name: product.name,
                            image: product.tone,
                            price: product.price,
                            size,
                            color: "Default",
                          })
                        }
                      >
                        <ShoppingBag size={14} />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleWishlist(product.id)}
                        aria-label="Toggle wishlist"
                      >
                        <Heart size={16} className={cn(isWishlisted && "fill-clay text-clay")} />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
