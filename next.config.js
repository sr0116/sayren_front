/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**", // placehold.co 밑 모든 경로 허용
      },
    ],
  },
};

module.exports = nextConfig;
