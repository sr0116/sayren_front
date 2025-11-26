import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // 빌드 타임 실행 방지
export const revalidate = 0;

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_SERVER_API_BASE_URL;

    const res = await fetch(`${baseUrl}/api/user/term/privacy`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
          { error: "개인정보 처리방침이 존재하지 않습니다." },
          { status: 404 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("개인정보 처리방침 조회 실패:", err);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}
