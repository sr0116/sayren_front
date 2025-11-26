import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req, { params }) {
  try {
    const baseUrl = process.env.NEXT_SERVER_API_BASE_URL;
    const res = await fetch(`${baseUrl}/api/user/product/${params.id}`, {
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("상품 상세 조회 실패:", err);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}
