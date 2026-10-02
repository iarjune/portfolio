import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/portfolio' : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath,

  // Expose basePath to the client side
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  images: {
    unoptimized: true,
  },

  allowedDevOrigins: ['192.168.0.69']
};

export default nextConfig;