import Image from "next/image";
import Link from "next/link";
import Tag from "./Tag";
import type { Course } from "@/types/site";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <article className="group rounded-2xl border border-gray-200 bg-white shadow-soft overflow-hidden h-full flex flex-col transition-transform">
      <div className="relative h-40 w-full">
        <Image
          src={course.thumbnail}
          alt={`${course.title} cover`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-5 flex-1 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold group-hover:text-brand-700 transition-colors">{course.title}</h3>
          <span className="text-xs rounded-full bg-brand-50 border border-brand-200 text-brand-800 px-2 py-1">
            {course.level}
          </span>
        </div>
        <p className="text-sm text-gray-600">{course.shortDescription}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {course.tags.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
      </div>
      <div className="p-5 pt-0">
        <div className="flex items-center justify-between text-sm text-gray-700">
          <span>Duration: {course.duration}</span>
          {course.price ? <span>{course.price}</span> : null}
        </div>
        <Link
          href={`/courses/${course.slug}`}
          className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-brand-300 px-4 py-2 hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
        >
          View details
        </Link>
      </div>
    </article>
  );
}
