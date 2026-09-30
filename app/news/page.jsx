import StaticPage from "@/components/StaticPage";
import { css, html, js } from "@/content/news";
import { jsonld } from "@/content/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Guires News & Media | Announcements, Milestones & Life at Guires",
  description: "Official news from Guires Research & Innovation Centre: company announcements, anniversaries, partnerships, events, community initiatives and life at Guires.",
  path: "/news",
});

export default function NewsPage() {
  return <StaticPage id="news" css={css} html={html} js={js} jsonld={jsonld.news} />;
}
