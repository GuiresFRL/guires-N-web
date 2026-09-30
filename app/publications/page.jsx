import StaticPage from "@/components/StaticPage";
import { css, html, js, jsonld } from "@/content/publications";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Publications | Guires Research & Innovation Centre",
  description:
    "White papers, journal articles and research reports by Guires experts across clinical evidence, regulatory science, food and nutrition, and research publishing.",
  path: "/publications",
});

export default function PublicationsPage() {
  return <StaticPage id="publications" css={css} html={html} js={js} jsonld={[jsonld]} />;
}
