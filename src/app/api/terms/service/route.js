import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function GET() {
  try {
    const serviceTerm = await redis.get("SERVICE_TERM");

    if (!serviceTerm) {
      return NextResponse.json({ error: "서비스 이용약관이 없습니다." }, { status: 404 });
    }

    return NextResponse.json(JSON.parse(serviceTerm));
  } catch (err) {
    console.error("서비스 약관 조회 실패:", err);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}
