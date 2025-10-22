"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  nav: { label: string; href: string }[];
};

export default function MobileMenu({ isOpen, onClose, nav }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Lock scroll + scrollbar compensation
  useEffect(() => {
    if (!isOpen) return;
    const { body, documentElement } = document;
    const prevOverflow = body.style.overflow;
    const prevPadRight = body.style.paddingRight;
    const scrollBarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      body.style.paddingRight = `${scrollBarWidth}px`;
    }

    // focus first focusable
    const firstFocusable =
      dialogRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ) ?? closeBtnRef.current;
    firstFocusable?.focus();

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadRight;
    };
  }, [isOpen]);

  // ESC + focus trap
  useEffect(() => {
    if (!isOpen) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute("disabled"));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Portal: از هر والد با overflow/transform مستقل می‌شود
  return createPortal(
    <div
      className="fixed inset-0 z-[1000]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-menu-title"
    >
      {/* Backdrop: کلیک بیرون روی همین می‌افتد */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity duration-200 opacity-100"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <div
        ref={dialogRef}
        className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-xl outline-none
                   translate-x-0 transition-transform duration-200 will-change-transform
                   motion-reduce:transition-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h2 id="mobile-menu-title" className="text-lg font-semibold">
              Menu
            </h2>
            <button
              ref={closeBtnRef}
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
    </div>,
    document.body
  );
}
