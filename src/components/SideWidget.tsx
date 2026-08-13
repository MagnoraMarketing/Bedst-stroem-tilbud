"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AFFILIATE_URL } from "@/lib/constants";
import { ArrowRightIcon, BoltIcon, CloseIcon } from "./icons";

const STORAGE_KEY = "bsp-side-widget-shown";
const DELAY_MS = 20000;

export default function SideWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [slideIn, setSlideIn] = useState(false);

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
    // Double rAF so the initial (off-screen) transform paints before we
    // flip the class, otherwise the browser skips straight to the end
    // state and there's no slide-in transition to see.
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => setSlideIn(true));
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, [open]);

  function close() {
    setSlideIn(false);
    window.setTimeout(() => setOpen(false), 500);
  }

  if (!mounted || !open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-label="Tilbud fra Billigste-Strømpris.dk"
      className={`fixed bottom-5 left-5 z-[65] w-80 max-w-[calc(100vw-2.5rem)] rounded-2xl border border-border bg-white p-5 shadow-2xl transition-transform duration-500 ease-out ${
        slideIn ? "translate-x-0" : "-translate-x-[140%]"
      }`}
    >
      <button
        type="button"
        onClick={close}
        aria-label="Luk"
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-border text-foreground/60 transition-colors hover:bg-surface"
      >
        <CloseIcon className="w-3.5 h-3.5" />
      </button>

      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy text-accent">
        <BoltIcon className="w-5 h-5" />
      </span>

      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-brand-blue">
        Stadig ikke tjekket din elpris?
      </p>
      <h3 className="mt-1 font-display text-lg font-bold leading-snug text-brand-navy">
        Du kan muligvis spare over 2.000 kr. om året
      </h3>
      <p className="mt-2 text-sm text-foreground/65">
        Se gratis og uforpligtende, om du betaler for meget for din strøm.
      </p>

      <a
        href={AFFILIATE_URL}
        target="_blank"
        rel="nofollow sponsored noopener"
        onClick={close}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition-all hover:bg-accent-dark hover:shadow-lg"
      >
        Se mine tilbud
        <ArrowRightIcon className="w-3.5 h-3.5" />
      </a>
    </div>,
    document.body
  );
}
