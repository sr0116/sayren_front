import { NextResponse } from "next/server";

export const revalidate = false;

export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_API_BASE_URL}/api/user/term/privacy`,
      { next: { revalidate: false } });
    if (!res.ok) {
      return NextResponse.json(
        { error: "개인정보 처리방침이 없습니다." },
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
