import { notFound } from "next/navigation";
import StaticPage from "@/components/StaticPage";
import { newsroom, newsroomCss, newsroomJs } from "@/content/newsroom";
import { SITE_NAME } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(newsroom.categories).map((category) => ({ category }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const p = newsroom.categories[category];
  if (!p) return {};
  const m = p.meta;
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: m.canonical },
    openGraph: { type: "website", siteName: SITE_NAME, title: m.title, description: m.description, url: m.canonical, images: [m.image] },
    twitter: { card: "summary_large_image", title: m.title, description: m.description, images: [m.image] },
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const p = newsroom.categories[category];
  if (!p) notFound();
  return <StaticPage id={`news-${category}`} css={newsroomCss} html={p.html} js={newsroomJs} jsonld={[p.jsonld]} />;
}
