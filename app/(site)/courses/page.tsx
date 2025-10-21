import Container from "@/components/Container";
import Section from "@/components/Section";
import CourseCard from "@/components/CourseCard";
import siteData from "@/data/site.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Courses • ${siteData.site.name}`,
  description: "Browse all courses",
};

export default function CoursesPage() {
  return (
    <Container>
      <Section title="All Courses" description="Browse our current catalog.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteData.courses.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      </Section>
    </Container>
  );
}
