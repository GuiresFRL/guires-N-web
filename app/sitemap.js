export const dynamic = "force-static";
import { newsroom } from "@/content/newsroom";
import { SITE_URL } from "@/lib/seo";

export default function sitemap() {
  const now = new Date("2026-09-30");
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1,
      images: ["/og-image.jpg", "/team.jpg", "/ganesan-anbazhagan.jpg", "/radhika-ganesan.jpg", "/manish-ganesan.jpg", "/suresh.jpg", "/sineka-sivalingam.jpg",
        "/facilities/formulation.jpg", "/facilities/nutraceutical.jpg", "/facilities/cosmeceutical.jpg", "/facilities/microbiology.jpg",
        "/facilities/sensory.jpg", "/facilities/pilot.jpg", "/facilities/packaging.jpg", "/facilities/store.jpg"].map((p) => SITE_URL + p) },
    { url: `${SITE_URL}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/news`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/publications`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...["privacy-policy","terms-and-conditions","cookie-policy","disclaimer"].map((p) => ({ url: `${SITE_URL}/${p}`, lastModified: now, changeFrequency: "yearly", priority: 0.3 })),
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...Object.keys(newsroom.categories).map((c) => ({ url: `${SITE_URL}/news/${c}`, lastModified: now, changeFrequency: "weekly", priority: 0.6 })),
    ...Object.values(newsroom.articles).map((a) => ({ url: a.meta.canonical, lastModified: new Date(a.meta.date), changeFrequency: "yearly", priority: 0.6 })),
  ];
}
