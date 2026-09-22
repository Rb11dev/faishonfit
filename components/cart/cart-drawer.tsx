"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { FabricPlate } from "@/components/shared/fabric-plate";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-void/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[81] flex w-[92vw] max-w-md flex-col bg-bone text-void"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between border-b border-void/10 px-6 py-5">
              <span className="font-display text-xl">
                Your Bag {items.length > 0 && `(${items.length})`}
              </span>
              <button onClick={closeCart} aria-label="Close cart">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <ShoppingBag size={32} strokeWidth={1} className="text-void/30" />
                <p className="font-body text-sm text-void/50">
                  Your bag is empty. Time to change that.
                </p>
                <Button variant="outline" onClick={closeCart} asChild>
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <ul className="flex flex-col gap-6">
                    {items.map((item) => (
                      <li key={item.id} className="flex gap-4">
                        <FabricPlate tone={item.image} className="h-28 w-20 shrink-0" grain={false} />
                        <div className="flex flex-1 flex-col gap-1">
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              href={`/product/${item.slug}`}
                              onClick={closeCart}
                              className="font-display text-base leading-tight"
                            >
                              {item.name}
                            </Link>
                            <button
                              onClick={() => removeItem(item.id)}
                              aria-label="Remove item"
                              className="text-void/40 transition-colors hover:text-clay"
                            >
                              <X size={14} />
                            </button>
                          </div>
                          <span className="font-body text-xs text-void/50">
                            {item.size} / {item.color}
                          </span>
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center border border-void/15">
                              <button
                                className="flex h-7 w-7 items-center justify-center"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                aria-label="Decrease quantity"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-6 text-center font-body text-xs">{item.quantity}</span>
                              <button
                                className="flex h-7 w-7 items-center justify-center"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                aria-label="Increase quantity"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <span className="font-body text-sm font-medium">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-void/10 px-6 py-6">
                  <div className="mb-4 flex items-center justify-between font-body text-sm">
                    <span className="text-void/60">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mb-4 font-body text-[11px] text-void/45">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/checkout" onClick={closeCart}>
                      Checkout — {formatPrice(subtotal)}
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
