import { NextResponse } from "next/server";
import { callSpringAPI } from "@/lib/serverFetch";

export async function GET(req) {
    // 관리자 상품 카테고리 목록 조회 (JWT 토큰 자동 전달)
    return callSpringAPI(req, "/api/admin/product/category", "GET");
}
