import Script from "next/script";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
// Markup, CSS and scripts use root-absolute links/assets; prefix them when hosted under a sub-path.
const ASSET = "(?:brands|facilities|news-images)/|[\\w-]+\\.(?:jpg|jpeg|png|svg|webp)\\b";
const QUOTED_ASSET = new RegExp("([\"'`])/(?=" + ASSET + ")", "g");
const withBase = (s) =>
  BASE
    ? s
        .replace(/\b(href|src)=(\\?["'])\/(?!\/)/g, `$1=$2${BASE}/`)
        .replace(/url\(\/(?!\/)/g, `url(${BASE}/`)
        .replace(QUOTED_ASSET, `$1${BASE}/`)
    : s;

/**
 * Renders one approved Guires page: its styles, server-rendered markup (crawlable),
 * JSON-LD structured data, and the interactive behaviour (animations, tabs, forms).
 */
export default function StaticPage({ id, css, html, js, jsonld }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: withBase(css) }} />
      {(jsonld || []).map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}
      <div id={`page-${id}`} dangerouslySetInnerHTML={{ __html: withBase(html) }} />
      <Script id={`page-${id}-script`} strategy="afterInteractive">{withBase(js || "")}</Script>
    </>
  );
}
