"use client";

import Image from "next/image";
import Link from "next/link";
import siteData from "@/data/site.json";
import Container from "./Container";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";

// ✅ تایپ امن برای hero (imageAlt اختیاری)
type HeroModel = {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
  imageAlt?: string;
};

// helper: روی دستگاه‌های تاچ، افکت ماوس نده
const hasFinePointer = () =>
  typeof window !== "undefined" && matchMedia("(pointer:fine)").matches;

export default function Hero() {
  // cast امن: اجازه بده imageAlt اختیاری باشه
  const hero = useMemo(
    () =>
      ({
        ...siteData.hero,
      }) as HeroModel,
    []
  );

  // ---- Parallax tilt for image card ----
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useTransform(y, [-50, 50], [8, -8]);
  const ry = useTransform(x, [-50, 50], [-8, 8]);
  const rxs = useSpring(rx, { stiffness: 120, damping: 12 });
  const rys = useSpring(ry, { stiffness: 120, damping: 12 });

  function handleMove(e: React.MouseEvent) {
    // روی تاچ کاری نکن
    if (!hasFinePointer()) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx / 4);
    y.set(dy / 4);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const title = hero.title ?? "Learn by building";
  const subtitle = hero.subtitle ?? "Hands-on lessons, modern stack.";
  const ctaHref = hero.ctaHref ?? "/courses";
  const ctaLabel = hero.ctaLabel ?? "Browse courses";
  const imgSrc = hero.image ?? "/og-image.png";
  const imgAlt = hero.imageAlt ?? "Learning illustration";

  return (
    <section className="relative overflow-hidden pt-8 sm:pt-12">
      {/* Background — absolute در سکشن تا با سایر سکشن‌ها تداخل نکنه */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* soft blobs */}
        <div className="absolute -top-[20%] -left-[10%] h-[40rem] w-[40rem] rounded-full bg-brand-300/40 blur-3xl animate-blob motion-reduce:animate-none" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[36rem] w-[36rem] rounded-full bg-brand-500/30 blur-3xl animate-blob animation-delay-2000 motion-reduce:animate-none" />
        {/* soft vignette */}
        <div className="absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_20%,black,transparent)] bg-[linear-gradient(to_bottom_right,rgba(0,0,0,0.06),transparent_45%)]" />
        {/* subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24px,rgba(0,0,0,0.05)_25px),linear-gradient(90deg,transparent_24px,rgba(0,0,0,0.05)_25px)] bg-[size:26px_26px]" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-3xl border border-brand-200/60 bg-white/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(2,6,23,0.06)]"
        >
          <div className="grid grid-cols-1 items-center gap-10 p-6 sm:p-10 md:grid-cols-2">
            {/* Left: copy */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.06, delayChildren: 0.05 },
                },
              }}
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: { opacity: 1, y: 0 },
                }}
                className="inline-flex items-center rounded-full border border-brand-200 bg-brand-100 px-3 py-1 text-xs text-brand-800 shadow-sm"
              >
                Learn by building
              </motion.span>

              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 },
                }}
                className="mt-3 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl"
              >
                {title}
              </motion.h1>

              {subtitle && (
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className="mt-4 text-lg text-gray-700"
                >
                  {subtitle}
                </motion.p>
              )}

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 },
                }}
                className="mt-6 flex items-center gap-3"
              >
                <Link
                  href={ctaHref}
                  className="group inline-flex items-center rounded-xl bg-brand-600 px-5 py-3 text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                >
                  {ctaLabel}
                  <svg
                    className="ml-2 size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M5 12h14m0 0-5-5m5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center rounded-xl border border-brand-300 px-5 py-3 text-brand-800 transition hover:bg-brand-50/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                >
                  About us
                </Link>
              </motion.div>

              {/* tiny skill chips */}
              <motion.ul
                aria-hidden
                className="mt-8 hidden gap-2 text-xs text-gray-600 md:flex"
              >
                {["TypeScript", "Next.js", "Tailwind", "Framer Motion"].map(
                  (chip, i) => (
                    <motion.li
                      key={chip}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.06 }}
                      className="rounded-full border bg-white/70 px-3 py-1 backdrop-blur-sm"
                    >
                      {chip}
                    </motion.li>
                  )
                )}
              </motion.ul>
            </motion.div>

            {/* Right: image */}
            {imgSrc ? (
              <motion.div
                ref={cardRef}
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
                className="group relative h-64 w-full sm:h-80 md:h-[420px]"
                style={{ perspective: 1000 }}
              >
                <motion.div
                  style={{ rotateX: rxs, rotateY: rys }}
                  className="relative size-full overflow-hidden rounded-2xl border border-brand-100 shadow-[0_12px_40px_rgba(2,6,23,0.08)] will-change-transform motion-reduce:transform-none"
                  whileHover={{ scale: hasFinePointer() ? 1.02 : 1 }}
                  transition={{ type: "spring", stiffness: 160, damping: 14 }}
                >
                  <Image
                    src={imgSrc}
                    alt={imgAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />

                  {/* glossy sweep */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute -inset-40 rotate-12 bg-gradient-to-r from-white/0 via-white/20 to-white/0" />
                  </div>
                </motion.div>

                {/* floating badge */}
                <motion.div
                  className="absolute -top-3 -left-3 rounded-full border bg-white/90 px-3 py-1 text-xs shadow"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                >
                  ✨ New lessons weekly
                </motion.div>
              </motion.div>
            ) : null}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
