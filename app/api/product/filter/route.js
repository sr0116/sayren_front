import { NextResponse } from "next/server";
import { callSpringAPI } from "@/lib/serverFetch";


// export async function GET(req) {
//     // 쿼리 문자열 가져오기 (예: ?type=PURCHASE&page=0&size=12)
//     const query = req.nextUrl.search;
//     const targetUrl = `/api/product/filter${query}`;
//
//     // callSpringAPI: 헤더, 토큰, fetch 처리 모두 내부에서 담당
//     return callSpringAPI(req, targetUrl, "GET");
// }
  // 큐레이션 전용 프록시
export const revalidate = false;

export async function GET(req) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SPRING_API_BASE_URL; // 백엔드 주소
        const query = req.nextUrl.search;
        const url = `${baseUrl}/api/product/filter${query}`;

        const res = await fetch(url, { cache: "no-store" });
        const contentType = res.headers.get("content-type");

        const data = contentType?.includes("application/json")
            ? await res.json()
            : await res.text();

        return NextResponse.json(data, { status: res.status });
    } catch (err) {
        console.error("큐레이션 API 프록시 오류:", err);
        return NextResponse.json({ error: "서버 오류" }, { status: 500 });
    }
}

