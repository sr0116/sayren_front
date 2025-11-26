/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "kiylab-bucket.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },

  async rewrites() {
    const isProd = process.env.NODE_ENV === "production";

    const backend = isProd
        ? "https://api.sayren.imchobo.com"
        : "http://localhost:8080";

    return [
      {
        source: "/api/proxy/:path*",
        destination: `${backend}/:path*`, // <-- 여기 정확해야 한다.
      },
    ];
  },
};

module.exports = nextConfig;
