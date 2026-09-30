import { notFound } from "next/navigation";
import StaticPage from "@/components/StaticPage";
import { newsroom, newsroomCss, newsroomJs } from "@/content/newsroom";
import { SITE_NAME } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(newsroom.articles).map((a) => ({ category: a.category, slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const a = newsroom.articles[`${category}/${slug}`];
  if (!a) return {};
  const m = a.meta;
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: m.canonical },
    openGraph: { type: "article", siteName: SITE_NAME, title: m.title, description: m.description, url: m.canonical, publishedTime: m.date, section: m.section, images: [m.image] },
    twitter: { card: "summary_large_image", title: m.title, description: m.description, images: [m.image] },
  };
}

export default async function ArticlePage({ params }) {
  const { category, slug } = await params;
  const a = newsroom.articles[`${category}/${slug}`];
  if (!a) notFound();
  return <StaticPage id={`article-${slug}`} css={newsroomCss} html={a.html} js={newsroomJs} jsonld={[a.jsonld]} />;
}
