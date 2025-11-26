import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_SERVER_API_BASE_URL;
    const res = await fetch(`${baseUrl}/api/user/product`, {
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (e) {
    return NextResponse.json({ error: "fail" }, { status: 500 });
  }
}
