/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  output: "standalone",
  experimental: {
    appDir: true,
  },

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
    return [
      {
        source: "/restapi/:path*",
        destination: "http://localhost:8080/swagger-ui/:path*",
      },
      {
        source: "/api-docs/:path*",
        destination: "http://localhost:8080/api-docs/:path*",
      },
      {
        source: "/v3/api-docs/:path*",
        destination: "http://localhost:8080/v3/api-docs/:path*",
      },
    ];
  },
};

//  정적 export 방지용 (SSR 강제)
export const dynamic = "force-dynamic";

//  ESM 방식으로 내보내기
export default nextConfig;
