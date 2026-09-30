import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  // The GitHub Pages copy (BASE_PATH set) is a preview: keep it out of search results.
  robots: process.env.NEXT_PUBLIC_BASE_PATH
    ? { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } }
    : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo.svg` },
  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Chennai",
    "geo.position": "13.0604;80.2496",
    ICBM: "13.0604, 80.2496",
  },
};

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#263B78" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=Source+Sans+3:wght@400;500;600;700&display=swap"
        />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
