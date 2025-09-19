// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  // SR_ACTIVE 쿠키 존재 여부만 확인
  const hasActiveCookie = req.cookies.has("SR_ACTIVE");

  if (req.nextUrl.pathname.startsWith("/member/login") && hasActiveCookie) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/member/login/:path*"], // 경로 설정
  runtime: "experimental-edge",
};
