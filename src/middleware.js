import { NextResponse } from "next/server";

// JWT 파서
function parseJwt(token) {
  try {
    const base64Payload = token.split(".")[1];
    return JSON.parse(Buffer.from(base64Payload, "base64").toString("utf8"));
  } catch (e) {
    console.error("Invalid JWT:", e);
    return null;
  }
}

export function middleware(req) {
  const token = req.cookies.get("SR_ACCESS")?.value;
  const login = req.cookies.has("SR_ACTIVE");

  if (token) {
    const user = parseJwt(token);
    console.log("User from SR_ACCESS:", user);

    // 로그인 페이지 접근 제한
    if (req.nextUrl.pathname.startsWith("/member/login") && user) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 관리자 접근제한.
    if (req.nextUrl.pathname.startsWith("/admin")) {
      const roles = Array.isArray(user?.roles)
          ? user.roles
          : [user?.role].filter(Boolean);

      if (!roles.includes("ADMIN")) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  }
  // 로그인 안한 유저 관리
  else if(!login) {
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
