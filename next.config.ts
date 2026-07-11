import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // basePath is set for GitHub Pages deployment under a repo subdirectory.
  // Change "anadoluKitchen" to your actual GitHub repository name.
  basePath: process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}`
    : "",
  images: {
    // Static export requires unoptimized images (no server-side optimization)
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
