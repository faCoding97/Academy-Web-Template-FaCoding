# ElixFlare Academy — Next.js (App Router) + Tailwind + TypeScript

A clean, modern, fully responsive **frontend-only** academy website. All site content is read from a single JSON file.

## Tech
- Next.js 14 (App Router) + React 18
- TypeScript (strict)
- Tailwind CSS (light-only)
- qrcode.react (client-side QR generator)

## Quickstart
```bash
npm install
npm run dev
```

Build & start:
```bash
npm run build
npm start
```

## Edit Content (Single Source of Truth)
All copy, links, and course data live in **`/data/site.json`**:
- `site`: name, baseUrl, logo path
- `nav`: navigation links
- `hero`: homepage hero text and optional image
- `courses`: array of courses (slug drives `/courses/[slug]`)
- `about`, `contact`: page content
- `footer.year`: copyright year

> **Do not** hard-code copy in components/pages. Everything is read from `site.json`.

## Logo & Images
Replace the logo at **`/public/logo/logo.png`**.
Course thumbnails & hero image are under `/public/images/...`

## QR Code
The QR code on the homepage uses `qrcode.react` and points to `https://academy.elixflare.com/courses`.
The **Download QR** button converts the canvas to PNG and downloads `elixflare-courses-qr.png`.

## SEO
- App Router metadata per page
- Open Graph & Twitter cards using `/public/og.png`
- `app/sitemap.ts` and `app/robots.ts` generated from `site.json` (including all courses).

## Deployment
Prefer static generation / ISR. Standard Next.js hosting (Vercel, Node) works perfectly.

## Accessibility
Semantic HTML, keyboard navigable mobile menu with focus trap, visible focus states, and `prefers-reduced-motion` respected globally.
