import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import siteData from "@/data/site.json";

export const metadata: Metadata = {
  metadataBase: new URL(siteData.site.baseUrl),
  title: `${siteData.site.name}`,
  description: siteData.hero.subtitle,
  openGraph: {
    title: siteData.site.name,
    description: siteData.hero.subtitle,
    url: siteData.site.baseUrl,
    siteName: siteData.site.name,
    images: ["/og.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteData.site.name,
    description: siteData.hero.subtitle,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
