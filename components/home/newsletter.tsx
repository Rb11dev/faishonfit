"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { newsletterSchema } from "@/lib/validations/commerce";
import { FabricPlate } from "@/components/shared/fabric-plate";
import { Reveal } from "@/components/shared/reveal";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = newsletterSchema.safeParse({ email });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Enter a valid email address");
      setStatus("error");
      return;
    }
    setError(null);
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Try again in a moment.");
    }
  }

  return (
    <section className="relative overflow-hidden bg-void py-24 text-bone sm:py-32">
      <div className="absolute inset-0 opacity-30">
        <FabricPlate tone="from-[#241e15] to-[#0a0a0b]" className="h-full w-full" sheen={false} />
      </div>

      <div className="container relative">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <Reveal>
            <span className="font-body text-[11px] font-medium uppercase tracking-[0.32em] text-champagne">
              Join the List
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">
              First access. Every drop.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-md font-body text-sm leading-relaxed text-bone/60">
              Subscribers get 48-hour early access to new collections, invitations to
              in-person fit sessions, and 15% off their first order.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="w-full max-w-md">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 border border-champagne/40 bg-champagne/10 px-6 py-4 font-body text-sm"
              >
                <Check size={16} className="text-champagne" />
                You&rsquo;re on the list. Watch your inbox.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex items-stretch border-b border-bone/25 focus-within:border-champagne">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    aria-label="Email address"
                    className="h-14 flex-1 bg-transparent px-1 font-body text-sm placeholder:text-bone/35 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    aria-label="Subscribe"
                    className="flex items-center gap-2 px-4 font-body text-[11px] font-medium uppercase tracking-[0.18em] text-champagne transition-opacity hover:opacity-70 disabled:opacity-40"
                  >
                    {status === "loading" ? "Sending…" : "Subscribe"}
                    <ArrowRight size={14} />
                  </button>
                </div>
                {error && <span className="text-left font-body text-xs text-clay-light">{error}</span>}
              </form>
            )}
          </Reveal>

          <Reveal delay={0.3}>
            <p className="font-body text-[10px] text-bone/35">
              By subscribing, you agree to our{" "}
              <a href="/privacy-policy" className="underline underline-offset-2">
                Privacy Policy
              </a>
              . Unsubscribe anytime.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
