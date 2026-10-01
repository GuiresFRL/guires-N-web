import redirects from "./content/redirects.json" with { type: "json" };

// Set BASE_PATH (e.g. "/guires-N-web") to build a static export for GitHub Pages.
const basePath = process.env.BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  ...(basePath
    ? { output: "export", basePath, trailingSlash: true }
    : {
        // 301 redirects from the old guires.com/newsroom URLs to the new SEO structure
        async redirects() {
          return redirects;
        },
      }),
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};
export default nextConfig;
