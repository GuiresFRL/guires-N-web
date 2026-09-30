export const SITE_URL = "https://guires.com";
export const SITE_NAME = "Guires Research & Innovation Centre";
export const KEYWORDS = [
  "Guires", "Guires Research & Innovation Centre", "Guires Group", "contract R&D", "pilot manufacturing",
  "food product development", "nutraceutical formulation", "cosmetic formulation", "cosmeceutical R&D",
  "pet food development", "laboratory testing", "food testing lab", "microbiology testing", "bioscience",
  "biotech", "clinical research organisation", "CRO India", "regulatory writing", "medical writing",
  "publication support", "Food Research Lab", "Cosmetic Science Lab", "Pet Nutrition Lab",
  "Guires Analytical Lab", "Pepgra", "Pubrica", "Chennai", "Dallas",
];

export function pageMetadata({ title, description, path = "/" }) {
  const url = SITE_URL + path;
  return {
    title,
    description,
    keywords: KEYWORDS,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url,
      locale: "en_IN",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Guires Research & Innovation Centre: the pathway from research to real-world impact" }],
    },
    twitter: { card: "summary_large_image", site: "@guiressolutions", title, description, images: ["/og-image.jpg"] },
  };
}
