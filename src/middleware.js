import { NextResponse } from "next/server";

// JWT 파서
function parseJwt(token) {
  try {
    const base64Payload = token.split(".")[1];
    const payload = atob(base64Payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(payload);
  } catch (e) {
    return null;
  }
}

export function middleware(req) {
  const token = req.cookies.get("SR_ACCESS")?.value;

  if (token) {
    const user = parseJwt(token);
    console.log("User from SR_ACCESS:", user);

    // 로그인 페이지 접근 제한
    if (req.nextUrl.pathname.startsWith("/member/login") && user) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 관리자 접근 제한
    if (req.nextUrl.pathname.startsWith("/admin")) {
      const roles = Array.isArray(user?.role) ? user.role : [user?.role];
      if (!roles.includes("ADMIN")) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  }
  // 로그인 안한 유저 관리
  else {
    if (req.nextUrl.pathname.startsWith("/mypage")) {
      return NextResponse.redirect(new URL("/member/login", req.url));
    }

  }

  return NextResponse.next();
}

// 체크할 url
export const config = {
  matcher: [
    "/member/login/:path*",
    "/admin/:path*",
    "/mypage/:path*",
  ],
};
