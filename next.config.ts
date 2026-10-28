import type { NextConfig } from "next";

// GitHub Pages serves a project site from /<repo>, so the static export needs that prefix.
// Set only by the deploy workflow, so `pnpm dev` and local builds keep serving from "/".
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
