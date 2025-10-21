"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  nav: { label: string; href: string }[];
};

export default function MobileMenu({ isOpen, onClose, nav }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Lock scroll
      const { body } = document;
      const prev = body.style.overflow;
      body.style.overflow = "hidden";
      // Focus first link
      const firstLink = dialogRef.current?.querySelector("a");
      (firstLink as HTMLElement | null)?.focus();
      return () => {
        body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        // rudimentary focus trap
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute("disabled"));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-menu-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div
        ref={dialogRef}
        className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-soft p-6 focus:outline-none"
      >
        <div className="flex items-center justify-between">
          <h2 id="mobile-menu-title" className="text-lg font-semibold">
            Menu
          </h2>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded p-2 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
          >
            ✕
          </button>
        </div>
        <nav className="mt-6 grid gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded px-3 py-2 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
