import Container from "@/components/Container";
import siteData from "@/data/site.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `About • ${siteData.site.name}`,
  description: siteData.about.content,
};

export default function AboutPage() {
  return (
    <Container>
      <section className="py-12 sm:py-16">
        <h1 className="text-3xl font-bold">{siteData.about.heading}</h1>
        <p className="mt-4 text-gray-700 max-w-3xl">{siteData.about.content}</p>
      </section>
    </Container>
  );
}
