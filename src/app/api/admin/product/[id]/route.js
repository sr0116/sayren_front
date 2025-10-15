import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const baseUrl = process.env.NEXT_PUBLIC_SPRING_API_BASE_URL;
    const token = request.headers.get("authorization"); // 프론트에서 보낸 토큰 받기

    const res = await fetch(`${baseUrl}/api/admin/product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // 그대로 백엔드로 전달
      },
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("프록시 실패:", err);
    return NextResponse.json({ error: "프록시 에러" }, { status: 500 });
  }
}
