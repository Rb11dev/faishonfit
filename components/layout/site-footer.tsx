"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { FOOTER_LINKS, SOCIAL_LINKS, SITE } from "@/lib/constants/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-bone/10 bg-void text-bone">
      <div className="container py-16 sm:py-20">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 flex flex-col gap-4 lg:col-span-2">
            <Link href="/" className="font-display text-3xl tracking-[0.06em]">
              {SITE.name}
            </Link>
            <p className="max-w-xs font-body text-sm leading-relaxed text-bone/50">
              {SITE.description}
            </p>
            <div className="flex items-center gap-3 pt-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/15 transition-colors hover:border-champagne hover:text-champagne"
                >
                  <span className="font-body text-[10px]">{s.label.slice(0, 2)}</span>
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-3">
              <span className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-bone/40">
                {heading}
              </span>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-bone/65 transition-colors hover:text-champagne"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-bone/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-xs text-bone/40">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"].map((method) => (
              <span
                key={method}
                className="flex h-7 items-center border border-bone/15 px-2.5 font-body text-[9px] uppercase tracking-wide text-bone/50"
              >
                {method}
              </span>
            ))}
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center self-end rounded-full border border-bone/15 transition-colors hover:border-champagne hover:text-champagne sm:self-auto"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
