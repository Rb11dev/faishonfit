"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MESSAGES = [
  "Complimentary shipping on orders over $200",
  "New: FW26 Collection — 94 pieces, live now",
  "Extended returns through January 15",
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % MESSAGES.length), 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative z-[60] flex h-9 items-center justify-center overflow-hidden bg-void text-bone">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-[11px] font-medium uppercase tracking-[0.16em]"
        >
          {MESSAGES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
