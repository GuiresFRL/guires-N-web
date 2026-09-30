import StaticPage from "@/components/StaticPage";
import { css, html, js } from "@/content/careers";
import { jsonld } from "@/content/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Careers at Guires | Jobs in R&D, Labs, Clinical Research & Publishing",
  description: "Join Guires: full-time, part-time, remote, consultant and internship roles across food, cosmetic and pet nutrition R&D, laboratory testing, clinical research and scientific publishing in Chennai and worldwide.",
  path: "/careers",
});

export default function CareersPage() {
  return <StaticPage id="careers" css={css} html={html} js={js} jsonld={jsonld.careers} />;
}
