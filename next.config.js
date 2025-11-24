/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "kiylab-bucket.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },

  async rewrites() {
    const isProd = process.env.NODE_ENV === "production";

    return [
      {
        source: "/restapi/:path*",
        destination: isProd
            ? "https://api.sayren.imchobo.com/swagger-ui/:path*"
            : "http://localhost:8080/swagger-ui/:path*",
      },
      {
        source: "/api-docs/:path*",
        destination: isProd
            ? "https://api.sayren.imchobo.com/api-docs/:path*"
            : "http://localhost:8080/api-docs/:path*",
      },
      {
        source: "/v3/api-docs/:path*",
        destination: isProd
            ? "https://api.sayren.imchobo.com/v3/api-docs/:path*"
            : "http://localhost:8080/v3/api-docs/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
