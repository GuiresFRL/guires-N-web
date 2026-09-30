import redirects from "./content/redirects.json" with { type: "json" };

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  // 301 redirects from the old guires.com/newsroom URLs to the new SEO structure
  async redirects() {
    return redirects;
  },
};
export default nextConfig;
