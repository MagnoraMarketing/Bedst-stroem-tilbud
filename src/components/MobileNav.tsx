"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { mainNav } from "@/lib/constants";
import { CloseIcon, MenuIcon } from "./icons";
import CtaButton from "./CtaButton";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Portal target (document.body) only exists on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Åbn menu"
        className="rounded-lg p-2 text-brand-navy hover:bg-surface"
      >
        <MenuIcon />
      </button>

      {mounted &&
        open &&
        createPortal(
          <div className="fixed inset-0 z-50 flex justify-end bg-brand-navy/40 backdrop-blur-sm">
            <div className="flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-brand-navy">Menu</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Luk menu"
                  className="rounded-lg p-2 text-brand-navy hover:bg-surface"
                >
                  <CloseIcon />
                </button>
              </div>
              <nav className="mt-8 flex flex-col gap-1">
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-brand-navy hover:bg-surface"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-8">
                <CtaButton className="w-full">Få gratis tilbud</CtaButton>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
