import { NextResponse } from "next/server";

export async function POST(req, { params }) {
    const { id } = params;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/products/use/${id}`, {
            method: "POST",
        });

        if (!res.ok) {
            const errText = await res.text();
            console.error("백엔드 승인 실패:", errText);
            return NextResponse.json({ error: "백엔드 요청 실패" }, { status: res.status });
        }

        return NextResponse.json({ message: "상품 승인 완료" });
    } catch (err) {
        console.error("프록시 에러:", err);
        return NextResponse.json({ error: "서버 에러" }, { status: 500 });
    }

}
