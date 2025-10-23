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
        pathname: "/**", // S3 버킷 내 모든 경로 허용
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
        source: "/v3/api-docs/:path*",     // 추가
        destination: "http://localhost:8080/v3/api-docs/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
