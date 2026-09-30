import StaticPage from "@/components/StaticPage";
import { css, html, js } from "@/content/insights";
import { jsonld } from "@/content/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Guires Insights | Expert Guides on Food, Regulatory & Research Publishing",
  description: "Expert insights from Guires: food and cosmetic regulatory guides from Food Research Lab, research publishing guidance from Pubrica Academy, plus recognition and features about the group.",
  path: "/insights",
});

export default function InsightsPage() {
  return <StaticPage id="insights" css={css} html={html} js={js} jsonld={jsonld.insights} />;
}
