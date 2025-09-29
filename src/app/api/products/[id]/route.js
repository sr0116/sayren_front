import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function GET(request, { params }) {
    try {
        const products = await redis.get("PRODUCTS");

        if (!products) {
            return NextResponse.json({ error: "상품이 없습니다." }, { status: 404 });
        }

        const parsed = JSON.parse(products);
        const product = parsed.find((p) => String(p.id) === params.id);

        if (!product) {
            return NextResponse.json({ error: "상품이 없습니다." }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (err) {
        console.error("상품 상세 조회 실패:", err);
        return NextResponse.json({ error: "서버 에러" }, { status: 500 });
    }
}
