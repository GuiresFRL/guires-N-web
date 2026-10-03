// Builds content/legacy-redirects.json: old guires.com (WordPress) URLs -> current pages.
// Usage: node scripts/make-legacy-redirects.js <urls.txt>   (one old URL or path per line)
// Kept separate from redirects.json, which is overwritten by the newsroom generator.
const fs = require("fs");
const existing = new Set(require("../content/redirects.json").map((r) => r.source.replace(/\/$/, "")));

const exact = {
  "/newsroom/csr-activity": "/news/sustainability-initiatives",
  "/newsroom/newsletter-services": "/news",
  "/newsroom/slide-anything-popup-preview": "/news",
  "/newsroom/latest-event/guires-set-to-expand-in-uk-to-help-businesses-with-digital-transformations": "/news/corporate/going-international-united-kingdom",
  "/newsroom/latest-event/statswork-data-science-and-analytics-division-of-guires": "/news/corporate",
  "/newsroom/corporate-activity/need-for-availability-access-to-clinical-evidence-for-medical-devices-for-europe": "/news/thought-leadership/need-for-availability-access-to-clinical-evidence-for-medical-devices-for-europe",
  "/newsroom/latest-event/christmas-extravaganza": "/news/life-at-guires/christmas-2022-new-beginnings-magical-endings",
  "/terms-conditions": "/terms-and-conditions",
  "/cancellation-refund": "/terms-and-conditions",
  "/mission-and-vision": "/#about",
  "/about-us": "/#about",
  "/about-us/our-team": "/#leadership",
};
// Ordered prefix rules (first match wins).
const prefix = [
  ["/about-us/our-team/", "/#leadership"],
  ["/services/author-publisher-services", "/publications"],
  ["/services/scientific-and-medical-communication", "/publications"],
  ["/services", "/#businesses"],
  ["/industries", "/#businesses"],
  ["/therapeutic-areas", "/#businesses"],
  ["/career", "/careers"],
  ["/white-papers", "/insights"],
  ["/white-paper", "/insights"],
  ["/case-study", "/insights"],
  ["/sample-work", "/insights"],
  ["/resources/case_study/", "/insights"],
  ["/newsroom", "/news"],
];
const insightsSlugs = ["/strategies-of-outsourcing-oil-gas-industry", "/to-read-and-proofread", "/textbook-as-a-teaching-tool", "/software-manuals-unravelled"];
const live = new Set(["/", "/privacy-policy", "/insights", "/careers", "/contact", "/publications", "/news", "/terms-and-conditions", "/cookie-policy", "/disclaimer"]);

function dest(p) {
  if (exact[p]) return exact[p];
  if (insightsSlugs.includes(p)) return "/insights";
  const hit = prefix.find(([k]) => p === k.replace(/\/$/, "") || p.startsWith(k.endsWith("/") ? k : k + "/") || p === k);
  return hit ? hit[1] : null;
}

const paths = [...new Set(fs.readFileSync(process.argv[2], "utf8").split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
  .map((u) => decodeURI(new URL(u, "https://guires.com").pathname).replace(/\/$/, "") || "/"))];

const out = [], skipped = [], unmapped = [];
for (const p of paths) {
  if (live.has(p) || existing.has(p)) { skipped.push(p); continue; }
  const d = dest(p);
  if (!d) { unmapped.push(p); continue; }
  out.push({ source: p, destination: d, permanent: true });
}
// Catch-alls for old sections, so URLs missing from the list still land somewhere sensible.
for (const [src, d] of [["/services/author-publisher-services/:path*", "/publications"], ["/services/scientific-and-medical-communication/:path*", "/publications"],
  ["/services/:path*", "/#businesses"], ["/industries/:path*", "/#businesses"], ["/therapeutic-areas/:path*", "/#businesses"],
  ["/career/:path*", "/careers"], ["/white-papers/:path*", "/insights"], ["/case-study/:path*", "/insights"], ["/resources/:path*", "/insights"],
  ["/about-us/:path*", "/#about"], ["/newsroom/:path*", "/news"]]) out.push({ source: src, destination: d, permanent: true });

fs.writeFileSync(__dirname + "/../content/legacy-redirects.json", JSON.stringify(out, null, 1) + "\n");
console.log(`${out.length} redirects written; skipped ${skipped.length} (live or already redirected); unmapped ${unmapped.length}`);
if (unmapped.length) console.log("UNMAPPED:\n" + unmapped.join("\n"));
