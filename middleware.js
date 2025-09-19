import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("🔥 미들웨어 작동중:", request.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}