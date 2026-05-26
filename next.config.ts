import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['pdf-parse'],

  allowedDevOrigins: [
    '192.168.31.125'
  ],
};

export default nextConfig;