"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AFFILIATE_URL } from "@/lib/constants";
import { ArrowRightIcon, CloseIcon } from "./icons";

const STORAGE_KEY = "bsp-savings-popup-shown";
const DELAY_MS = 10000;

export default function SavingsPopup() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Portal target (document.body) and sessionStorage only exist on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-brand-navy/70 p-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="savings-popup-title"
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-2xl sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Luk"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground/60 transition-colors hover:bg-surface"
        >
          <CloseIcon className="w-4 h-4" />
        </button>

        <h2
          id="savings-popup-title"
          className="font-display text-2xl font-bold leading-snug text-brand-navy sm:text-3xl"
        >
          Du kan muligvis spare over{" "}
          <span className="text-brand-blue">2.000 kr.</span> årligt!
        </h2>

        <p className="mt-5 text-foreground/70">
          Er du sikker på du har den billigste elaftale?
        </p>
        <p className="mt-3 text-foreground/70">
          Det koster dig intet at prøve, men kan muligvis spare mange penge –
          hvert år.
        </p>

        <a
          href={AFFILIATE_URL}
          target="_blank"
          rel="nofollow sponsored noopener"
          onClick={() => setOpen(false)}
          className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 font-semibold text-accent-foreground shadow-sm transition-all hover:bg-accent-dark hover:shadow-lg hover:-translate-y-0.5"
        >
          Okay, lad mig prøve
          <ArrowRightIcon className="w-4 h-4" />
        </a>
      </div>
    </div>,
    document.body
  );
}
