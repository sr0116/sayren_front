// ✅ next.config.js
const dotenv = require("dotenv");
const path = require("path");

// ✅ .env.local 강제 로드
dotenv.config({ path: ".env.local" });

// ✅ 1️⃣ 기본 주소 정의 (우선순위: 서버 → 클라이언트 → fallback)
const serverBase =
    process.env.NEXT_SERVER_API_BASE_URL || "http://15.165.159.88:8080"; // SSR에서 Spring 직접 호출
const clientBase =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://15.165.159.88:8800"; // CSR에서 Nginx 프록시 사용

console.log(" Next.js Config Loaded:", {
  serverBase,
  clientBase,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  // ✅ 2️⃣ 환경 변수 Next.js 런타임으로 주입
  env: {
    NEXT_PUBLIC_API_BASE_URL: clientBase, // CSR용 (프록시)
    NEXT_SERVER_API_BASE_URL: serverBase, // SSR용 (직접 접근)
    NEXT_PUBLIC_SPRING_API_BASE_URL:
        process.env.NEXT_PUBLIC_SPRING_API_BASE_URL || "http://sayren-backend:8080",
    NEXT_PUBLIC_IMP_CODE: process.env.NEXT_PUBLIC_IMP_CODE,
    NEXT_PUBLIC_ACCESS_TOKEN_MAXAGE: process.env.NEXT_PUBLIC_ACCESS_TOKEN_MAXAGE,
  },

  // ✅ 3️⃣ 이미지 도메인 설정 (삭제 금지)
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      {
        protocol: "https",
        hostname: "kiylab-bucket.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },

  // ✅ 4️⃣ API 프록시 (CSR 환경에서만 사용됨)
  async rewrites() {
    return process.env.NODE_ENV === "production"
        ? [
          {
            source: "/api/:path*",
            destination: "http://sayren-backend:8080/:path*",
          },
        ]
        : [
          {
            source: "/api/:path*",
            destination: "http://15.165.159.88:8800/:path*",
          },
        ];
  }

  ,
  // ✅ 5️⃣ 빌드 관련 설정
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // ✅ 6️⃣ 경로 별칭 설정
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    config.resolve.alias["@app"] = path.resolve(__dirname, "app");
    return config;
  },
};

module.exports = nextConfig;
