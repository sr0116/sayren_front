import { NextResponse } from "next/server";

// export const revalidate = false;
export async function GET(request, { params }) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SPRING_API_BASE_URL; // 백엔드 주소
    const url = `${baseUrl}/api/admin/product/${params.id}`;

    const res = await fetch(url, { cache: "no-store" });
    const contentType = res.headers.get("content-type");

    const data = contentType?.includes("application/json")
      ? await res.json()
      : await res.text();

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("상품 상세 조회 실패:", err);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}
