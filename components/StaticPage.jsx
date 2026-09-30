import Script from "next/script";

/**
 * Renders one approved Guires page: its styles, server-rendered markup (crawlable),
 * JSON-LD structured data, and the interactive behaviour (animations, tabs, forms).
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
// Raw markup uses root-absolute links/assets; prefix them when hosted under a sub-path.
const withBase = (h) => (BASE ? h.replace(/(href|src)="\/(?!\/)/g, `$1="${BASE}/`) : h);

export default function StaticPage({ id, css, html, js, jsonld }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {(jsonld || []).map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}
      <div id={`page-${id}`} dangerouslySetInnerHTML={{ __html: withBase(html) }} />
      <Script id={`page-${id}-script`} strategy="afterInteractive">{js}</Script>
    </>
  );
}
