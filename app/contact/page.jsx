import StaticPage from "@/components/StaticPage";
import { css, html, js } from "@/content/contact";
import { jsonld } from "@/content/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Guires | Chennai Headquarters, Production Unit & Dallas Office",
  description: "Contact Guires Research & Innovation Centre. Global headquarters: 10, Kutty Street, Nungambakkam, Chennai 600034. Production unit: Ambattur, Chennai. US office: Dallas, Texas. Email info@guires.com or call +91 98406 74433.",
  path: "/contact",
});

export default function ContactPage() {
  return <StaticPage id="contact" css={css} html={html} js={js} jsonld={jsonld.contact} />;
}
