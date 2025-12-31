import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },

  // Redirects สำหรับ Legacy Service Pages
  async redirects() {
    return [
      {
        source: '/service/Modern',
        destination: '/service#templates',
        permanent: false, // 302 redirect
      },
      {
        source: '/service/Professional',
        destination: '/service#enterprise',
        permanent: false,
      },
      {
        source: '/service/Environmentally',
        destination: '/service#enterprise',
        permanent: false,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nextjs-micro-account.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      }
    ],
  },
};

export default nextConfig;
