"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "./icons";

const STORAGE_KEY = "bsp-gardinbus-widget-shown";
const DELAY_MS = 20000;
const GARDINBUS_URL = "https://www.bookgardinbussen.online/";
const DRIVE_MS = 1800;

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
    // state and there's no drive-in transition to see.
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => setSlideIn(true));
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, [open]);

  function close() {
    setSlideIn(false);
    window.setTimeout(() => setOpen(false), DRIVE_MS);
  }

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className={`fixed bottom-6 left-4 z-[65] w-80 max-w-[calc(100vw-2rem)] transition-transform ease-[cubic-bezier(0.16,1,0.3,1)] ${
        slideIn ? "translate-x-0" : "-translate-x-[100vw]"
      }`}
      style={{ transitionDuration: `${DRIVE_MS}ms` }}
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
        className="group block text-center"
      >
        <span className="inline-block rounded-2xl bg-white px-4 py-2 shadow-lg">
          <span className="inline-flex items-center gap-1.5 text-base font-extrabold tracking-tight text-[#2f5d50]">
            Book Gardinbussen
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
          <span className="mt-0.5 block text-xs font-medium text-foreground/55">
            Gratis hjemmebesøg i hele Danmark
          </span>
        </span>

        <svg
          viewBox="0 0 260 120"
          className="mt-2 w-full h-auto drop-shadow-xl transition-transform group-hover:-translate-y-1"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="gbBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3a6f60" />
              <stop offset="1" stopColor="#1f3d34" />
            </linearGradient>
            <linearGradient id="gbGlass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#eef6f2" />
              <stop offset="1" stopColor="#cfe3da" />
            </linearGradient>
          </defs>

          {/* motion lines trailing behind */}
          <g stroke="#3a6f60" strokeLinecap="round">
            <line x1="0" y1="42" x2="20" y2="42" strokeWidth="4" opacity="0.5" />
            <line x1="4" y1="58" x2="24" y2="58" strokeWidth="4" opacity="0.35" />
            <line x1="0" y1="74" x2="18" y2="74" strokeWidth="4" opacity="0.2" />
          </g>

          <ellipse cx="140" cy="111" rx="102" ry="6" fill="rgba(11,37,69,0.15)" />

          <rect x="28" y="28" width="204" height="58" rx="20" fill="url(#gbBody)" />

          <rect x="44" y="34" width="100" height="24" rx="9" fill="url(#gbGlass)" opacity="0.96" />
          <rect x="150" y="34" width="2" height="24" fill="#1f3d34" opacity="0.25" />
          <rect x="190" y="34" width="36" height="32" rx="11" fill="url(#gbGlass)" />

          <rect x="32" y="63" width="196" height="18" rx="5" fill="#d98a3d" />
          <text
            x="130"
            y="76"
            textAnchor="middle"
            fontFamily="Segoe UI, Arial, sans-serif"
            fontWeight="700"
            fontSize="10.5"
            letterSpacing="0.5"
            fill="#241505"
          >
            GRATIS HJEMMEBESØG
          </text>

          <circle cx="236" cy="58" r="4" fill="#ffd77a" />

          <circle cx="70" cy="98" r="15" fill="#1f3d34" />
          <circle cx="70" cy="98" r="9" fill="#3a6f60" />
          <circle cx="70" cy="98" r="3.5" fill="#faf7f2" />
          <circle cx="198" cy="98" r="15" fill="#1f3d34" />
          <circle cx="198" cy="98" r="9" fill="#3a6f60" />
          <circle cx="198" cy="98" r="3.5" fill="#faf7f2" />
        </svg>
      </a>
    </div>,
    document.body
  );
}
