import {callSpringAPI} from "@/lib/serverFetch";

export async function GET(req) {
    // 관리자 상품 카테고리 목록 조회 (JWT 토큰 자동 전달)
    return callSpringAPI(req, "/api/admin/product/category", "GET");
}

export async function POST(req) {
    // 요청 본문(body)을 그대로 스프링으로 전달
    return callSpringAPI(req, "/api/admin/product/register", "POST");
}
