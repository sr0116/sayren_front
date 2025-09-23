import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function GET() {
  try {
    const privacyTerm = await redis.get("PRIVACY_TERM");

    if (!privacyTerm) {
      return NextResponse.json({ error: "개인정보 처리방침이 없습니다." }, { status: 404 });
    }

    return NextResponse.json(JSON.parse(privacyTerm)); // ✅ JSON 변환 후 응답
  } catch (err) {
    console.error("개인정보 처리방침 조회 실패:", err);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}
