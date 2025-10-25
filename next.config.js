/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  //  모든 페이지를 SSR로 강제 (빌드 시 prerender-manifest.json 생성 방지)
  output: "standalone", // optional — 빌드 경량화 원할 때만
  experimental: {
    appDir: true, // App Router 사용 명시
  },

  //  이미지 도메인 설정
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

  //  백엔드 API 경로 리라이트
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

//  동적 렌더링 강제 (정적 export 시도 방지)
export const dynamic = "force-dynamic";

module.exports = nextConfig;
