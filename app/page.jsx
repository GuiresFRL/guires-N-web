import StaticPage from "@/components/StaticPage";
import { css, html, js } from "@/content/home";
import { jsonld } from "@/content/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Guires Research & Innovation Centre | R&D, Pilot Manufacturing & Lab Testing",
  description:
    "Guires Research & Innovation Centre is a global R&D, pilot manufacturing and laboratory testing group. Six businesses across food, nutraceuticals, cosmetics, pet nutrition, clinical research and publishing take ideas from research to market.",
  path: "/",
});

export default function Home() {
  return <StaticPage id="home" css={css} html={html} js={js} jsonld={jsonld.home} />;
}
