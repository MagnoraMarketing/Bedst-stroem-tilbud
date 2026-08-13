"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "./icons";

const STORAGE_KEY = "bsp-gardinbus-widget-shown";
const DELAY_MS = 20000;
const GARDINBUS_URL = "https://www.bookgardinbussen.online/";

export default function GardinbusWidget() {
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
      className={`fixed bottom-8 left-4 z-[65] w-72 max-w-[calc(100vw-2rem)] transition-transform duration-500 ease-out ${
        slideIn ? "translate-x-0" : "-translate-x-[140%]"
      }`}
    >
      <button
        type="button"
        onClick={close}
        aria-label="Luk"
        className="absolute -top-3 right-1 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-white text-foreground/60 shadow-md transition-colors hover:bg-surface"
      >
        <CloseIcon className="w-3.5 h-3.5" />
      </button>

      <a
        href={GARDINBUS_URL}
        target="_blank"
        rel="noopener"
        onClick={close}
        aria-label="Book gratis hjemmebesøg hos Gardinbussen – åbner bookgardinbussen.online"
        className="group block drop-shadow-xl transition-transform hover:-translate-y-1"
      >
        <svg viewBox="0 0 220 110" className="w-full h-auto" aria-hidden="true">
          <ellipse cx="110" cy="101" rx="92" ry="6" fill="rgba(11,37,69,0.15)" />
          <rect x="8" y="22" width="204" height="58" rx="18" fill="#2f5d50" />
          <rect x="8" y="22" width="204" height="58" rx="18" fill="none" stroke="#1f3d34" strokeOpacity="0.15" />
          <rect x="168" y="30" width="34" height="30" rx="8" fill="#faf7f2" />
          <rect x="24" y="30" width="34" height="22" rx="6" fill="#faf7f2" opacity="0.92" />
          <rect x="66" y="30" width="34" height="22" rx="6" fill="#faf7f2" opacity="0.92" />
          <rect x="8" y="55" width="204" height="21" fill="#d98a3d" />
          <text
            x="110"
            y="69.5"
            textAnchor="middle"
            fontFamily="Segoe UI, Arial, sans-serif"
            fontWeight="700"
            fontSize="11"
            letterSpacing="0.5"
            fill="#241505"
          >
            GRATIS HJEMMEBESØG
          </text>
          <circle cx="46" cy="88" r="13" fill="#1f3d34" />
          <circle cx="46" cy="88" r="5" fill="#faf7f2" />
          <circle cx="174" cy="88" r="13" fill="#1f3d34" />
          <circle cx="174" cy="88" r="5" fill="#faf7f2" />
        </svg>
        <span className="mt-1 block text-center text-xs font-semibold text-brand-navy">
          bookgardinbussen.online →
        </span>
      </a>
    </div>,
    document.body
  );
}
