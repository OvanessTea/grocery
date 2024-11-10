import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable API routes rewrites to proxy requests to backend server
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:9000/:path*' // Proxy to Express backend
      }
    ]
  },

  // Output as standalone build
  output: 'standalone',

  // Enable strict mode for better development
  reactStrictMode: true,

  // Disable x-powered-by header
  poweredByHeader: false,

  // Enable source maps in production for better debugging
  productionBrowserSourceMaps: true
};

export default nextConfig;
