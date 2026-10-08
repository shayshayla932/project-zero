import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Relative /_next assets so out/index.html opens from disk, not only from a server.
  assetPrefix: process.env.NODE_ENV === "production" ? "./" : undefined,
  images: { unoptimized: true },
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "*.cursor.sh",
    "**.cursor.sh",
    "*.cursor.com",
    "**.cursor.com",
    "*.trycloudflare.com",
    "**.trycloudflare.com",
  ],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
