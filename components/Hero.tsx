import Image from "next/image";
import Link from "next/link";
import siteData from "@/data/site.json";
import Container from "./Container";

export default function Hero() {
  const hero = siteData.hero;
  return (
    <section className="pt-8 sm:pt-12">
      <Container>
        <div className="hero-pattern rounded-2xl bg-gradient-to-br from-brand-50 via-white to-white p-6 sm:p-10 border border-brand-100 shadow-lift">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            <div>
              <span className="inline-flex items-center rounded-full bg-brand-100 text-brand-800 px-3 py-1 text-xs border border-brand-200">
                Learn by building
              </span>
              <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
                {hero.title}
              </h1>
              <p className="mt-4 text-lg text-gray-700">{hero.subtitle}</p>
              <div className="mt-6 flex items-center gap-3">
                <Link
                  href={hero.ctaHref}
                  className="inline-flex items-center rounded-xl bg-brand-600 px-5 py-3 text-white shadow-lift hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700"
                >
                  {hero.ctaLabel}
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center rounded-xl border border-brand-300 px-5 py-3 text-brand-800 hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700"
                >
                  About us
                </Link>
              </div>
            </div>
            {hero.image ? (
              <div className="relative w-full h-64 sm:h-80 md:h-[420px]">
                <Image
                  src={hero.image}
                  alt="Learning illustration"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-2xl border border-brand-100 shadow-soft"
                  priority
                />
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
