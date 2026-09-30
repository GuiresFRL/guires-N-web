import StaticPage from "@/components/StaticPage";
import { legal, legalCss, legalJs } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

const p = legal["terms-and-conditions"];
export const metadata = pageMetadata({ title: p.meta.title, description: p.meta.description, path: "/terms-and-conditions" });

export default function Page() {
  return <StaticPage id="terms-and-conditions" css={legalCss} html={p.html} js={legalJs} jsonld={[p.jsonld]} />;
}
