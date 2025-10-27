const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  distDir: ".next",
  reactStrictMode: true,
  compress: true,

  generateStaticParams: false,
  staticPageGenerationTimeout: 60,

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // ✅ Docker 빌드 시 SSR/Static Generation 비활성화
  experimental: {
    appDir: true,
    serverActions: false,
    disableOptimizedLoading: true,
    turbo: {
      rules: {
        "*.js": {
          loaders: [],
        },
      },
    },
  },

  env: {
    NEXT_DISABLE_STATIC_EXPORT: "true",
  },

  webpack(config) {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kiylab-bucket.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://sayren-backend:8080/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
