/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  // ✅ Docker용 standalone 모드
  output: "standalone",
  experimental: {
    appDir: true,
  },

  // ✅ 이미지 허용 경로
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      { protocol: "https", hostname: "kiylab-bucket.s3.ap-northeast-2.amazonaws.com", pathname: "/**" },
    ],
  },

  // ✅ 컨테이너 내부 요청은 backend 이름으로 연결
  async rewrites() {
    return [
      { source: "/restapi/:path*", destination: "http://backend:8080/swagger-ui/:path*" },
      { source: "/api-docs/:path*", destination: "http://backend:8080/api-docs/:path*" },
      { source: "/v3/api-docs/:path*", destination: "http://backend:8080/v3/api-docs/:path*" },
    ];
  },
};

// ✅ 정적 export 방지용 (SSR 강제)
const dynamic = "force-dynamic";

// ✅ CommonJS 방식으로 내보내기 (Docker 빌드 시 필수)
module.exports = {
  ...nextConfig,
  dynamic,
};

