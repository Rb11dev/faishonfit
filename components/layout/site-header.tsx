"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Heart, ShoppingBag, User } from "lucide-react";
import { MAIN_NAV, SITE } from "@/lib/constants/site";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());
  const openCart = useCartStore((s) => s.openCart);
  const wishlistCount = useWishlistStore((s) => s.productIds.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-bone/10 bg-void/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="container flex h-20 items-center justify-between text-bone">
          <button
            className="flex items-center gap-2 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {MAIN_NAV.slice(0, 3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-bone/80 transition-colors hover:text-champagne"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-display text-2xl tracking-[0.08em] lg:static lg:translate-x-0"
          >
            {SITE.name}
          </Link>

          <div className="flex items-center gap-5">
            <nav className="hidden items-center gap-8 lg:flex">
              {MAIN_NAV.slice(3).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-bone/80 transition-colors hover:text-champagne"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <button aria-label="Search" className="transition-colors hover:text-champagne">
                <Search size={18} strokeWidth={1.5} />
              </button>
              <Link href="/account" aria-label="Account" className="hidden transition-colors hover:text-champagne sm:block">
                <User size={18} strokeWidth={1.5} />
              </Link>
              <Link
                href="/account/wishlist"
                aria-label="Wishlist"
                className="relative hidden transition-colors hover:text-champagne sm:block"
              >
                <Heart size={18} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-champagne text-[9px] font-medium text-void">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <button
                aria-label="Open cart"
                onClick={openCart}
                className="relative transition-colors hover:text-champagne"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-champagne text-[9px] font-medium text-void">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-void/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 left-0 z-[61] flex w-[86vw] max-w-sm flex-col bg-bone p-6 text-void lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between pb-8">
                <span className="font-display text-xl">{SITE.name}</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {MAIN_NAV.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between border-b border-void/10 py-4 font-display text-2xl"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-4 pt-8">
                <Link href="/account" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 font-body text-xs uppercase tracking-[0.18em]">
                  <User size={16} /> My Account
                </Link>
                <Link href="/account/wishlist" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 font-body text-xs uppercase tracking-[0.18em]">
                  <Heart size={16} /> Wishlist
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
