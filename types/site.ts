export type NavItem = { label: string; href: string };

export type Course = {
  slug: string;
  title: string;
  level: string;
  duration: string;
  price?: string;
  thumbnail: string;
  tags: string[];
  shortDescription: string;
  description: string;
  syllabus: string[];
};

export type SiteData = {
  site: { name: string; baseUrl: string; logo: string };
  nav: NavItem[];
  hero: {
    title: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref: string;
    image?: string;
  };
  courses: Course[];
  about: { heading: string; content: string };
  contact: { email: string; location: string; note?: string };
  footer: { year: number };
};
