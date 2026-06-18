import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static/ISR public site; long revalidation set per-route. No image domains
  // needed (we use inline SVG + system rendering). Keep config minimal so the
  // Vercel remote build stays fast.
  poweredByHeader: false,
};

export default nextConfig;
