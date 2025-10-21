import { ReactNode } from "react";

export default function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight inline-flex items-baseline gap-3">
          <span>{title}</span>
          <span className="h-[3px] w-20 bg-brand-400 rounded-full align-baseline"></span>
        </h2>
        {description ? (
          <p className="mt-3 text-gray-600">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
