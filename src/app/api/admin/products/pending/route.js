import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function GET() {
    try {
        const products = await redis.get("PRODUCTS");

        if (!products) {
            return NextResponse.json({ error: "상품이 없습니다." }, { status: 404 });
        }

        const parsed = JSON.parse(products);

        // isUse = false 인 상품만 필터링 (승인 대기)
        const pending = parsed.filter((p) => !p.isUse);

        if (pending.length === 0) {
            return NextResponse.json({ message: "승인 대기 상품이 없습니다." }, { status: 200 });
        }

        return NextResponse.json(pending);
    } catch (err) {
        console.error("승인 대기 상품 조회 실패:", err);
        return NextResponse.json({ error: "서버 에러" }, { status: 500 });
    }
}