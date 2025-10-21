import type { Metadata } from "next";
import Container from "@/components/Container";
import siteData from "@/data/site.json";
import Link from "next/link";

export async function generateStaticParams() {
  return siteData.courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const course = siteData.courses.find((c) => c.slug === params.slug);
  if (!course) {
    return {
      title: `Course • ${siteData.site.name}`,
      description: "Course not found",
    };
  }
  return {
    title: `${course.title} • ${siteData.site.name}`,
    description: course.shortDescription,
    openGraph: {
      title: course.title,
      description: course.shortDescription,
      images: [course.thumbnail],
    },
    twitter: {
      title: course.title,
      description: course.shortDescription,
      images: [course.thumbnail],
    },
  };
}

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = siteData.courses.find((c) => c.slug === params.slug);
  if (!course) {
    return (
      <Container>
        <section className="py-12 sm:py-16">
          <h1 className="text-2xl font-semibold">Course not found</h1>
          <Link href="/courses" className="mt-4 inline-block text-brand-700 underline">Back to courses</Link>
        </section>
      </Container>
    );
  }

  return (
    <Container>
      <section className="py-12 sm:py-16 max-w-3xl">
        <h1 className="text-3xl font-bold">{course.title}</h1>
        <p className="mt-2 text-gray-700">{course.shortDescription}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <span className="rounded bg-gray-100 border border-gray-200 px-2 py-1">Level: {course.level}</span>
          <span className="rounded bg-gray-100 border border-gray-200 px-2 py-1">Duration: {course.duration}</span>
          {course.price ? <span className="rounded bg-gray-100 border border-gray-200 px-2 py-1">Price: {course.price}</span> : null}
        </div>

        {course.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={course.thumbnail}
            alt={`${course.title} cover`}
            className="mt-6 w-full rounded-xl border border-gray-200"
          />
        ) : null}

        <div className="mt-8 prose prose-neutral max-w-none">
          <p>{course.description}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Syllabus</h2>
          <ul className="mt-3 list-disc pl-6 space-y-2">
            {course.syllabus.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <Link href="/courses" className="mt-8 inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500">
          ← Back to courses
        </Link>
      </section>
    </Container>
  );
}
