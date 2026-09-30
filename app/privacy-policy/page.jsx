import StaticPage from "@/components/StaticPage";
import { legal, legalCss, legalJs } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

const p = legal["privacy-policy"];
export const metadata = pageMetadata({ title: p.meta.title, description: p.meta.description, path: "/privacy-policy" });

export default function Page() {
  return <StaticPage id="privacy-policy" css={legalCss} html={p.html} js={legalJs} jsonld={[p.jsonld]} />;
}
