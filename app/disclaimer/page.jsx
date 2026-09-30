import StaticPage from "@/components/StaticPage";
import { legal, legalCss, legalJs } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

const p = legal["disclaimer"];
export const metadata = pageMetadata({ title: p.meta.title, description: p.meta.description, path: "/disclaimer" });

export default function Page() {
  return <StaticPage id="disclaimer" css={legalCss} html={p.html} js={legalJs} jsonld={[p.jsonld]} />;
}
