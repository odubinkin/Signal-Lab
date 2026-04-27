import type { NextConfig } from "next";
import path from "node:path";

// next dev runs with cwd = apps/frontend (npm workspace), so the repo root
// is two levels up. Using cwd avoids __dirname being undefined if the config
// is compiled to ESM.
const repoRoot = path.resolve(process.cwd(), "../..");

const nextConfig: NextConfig = {
  turbopack: {
    root: repoRoot,
  },
};

export default nextConfig;
