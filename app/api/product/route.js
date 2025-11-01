import { NextResponse } from "next/server";

export const revalidate = false;
export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SPRING_API_BASE_URL; // 백엔드 주소
    const url = `${baseUrl}/api/user/product`;

    const res = await fetch(url, { cache: "no-store" });
    const contentType = res.headers.get("content-type");

    const data = contentType?.includes("application/json")
      ? await res.json()
      : await res.text();

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("서버오류 오류:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
