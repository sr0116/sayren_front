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
    // ✅ 환경 변수 기반 백엔드 주소 (로컬/도커 자동 분기)
    const backend =
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        (process.env.NODE_ENV === "production"
            ? "http://sayren-backend:8080" // 도커 네트워크용 백엔드 서비스 이름
            : "http://localhost:8080");    // 로컬 개발용

    return [
      // ✅ 백엔드 API 프록시
      {
        source: "/api/:path*",
        destination: `${backend}/:path*`,
      },
      // ✅ Swagger 문서 경로들
      {
        source: "/restapi/:path*",
        destination: `${backend}/swagger-ui/:path*`,
      },
      {
        source: "/api-docs/:path*",
        destination: `${backend}/api-docs/:path*`,
      },
      {
        source: "/v3/api-docs/:path*",
        destination: `${backend}/v3/api-docs/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
