"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import siteData from "@/data/site.json";

export default function Header() {
  const [open, setOpen] = useState(false);
  const nav = siteData.nav;

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={siteData.site.logo}
            alt={`${siteData.site.name} Logo`}
            width={36}
            height={36}
            className="h-9 w-9 rounded-xl border border-gray-200"
            priority
          />
          <span className="font-semibold tracking-tight">{siteData.site.name}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          className="md:hidden inline-flex items-center justify-center rounded-xl border border-gray-300 px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
          aria-label="Open menu"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">Open menu</span>
          ☰
        </button>
      </div>
      <div id="mobile-menu">
        <MobileMenu isOpen={open} onClose={() => setOpen(false)} nav={nav} />
      </div>
    </header>
  );
}
