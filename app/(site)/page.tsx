import Hero from "@/components/Hero";
import Container from "@/components/Container";
import Section from "@/components/Section";
import CourseCard from "@/components/CourseCard";
import QRCodeCard from "@/components/QRCodeCard";
import siteData from "@/data/site.json";

export default function HomePage() {
  const featured = siteData.courses.slice(0, 6);
  return (
    <>
      <Hero />
      <Container>
        <div className="mt-10">
          <QRCodeCard />
        </div>
        <Section title="Featured Courses" description="A refreshed selection to get you started.">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </Section>
      </Container>
    </>
  );
}
