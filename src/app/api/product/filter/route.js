import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req) {
  try {
    const baseUrl = process.env.NEXT_SERVER_API_BASE_URL;
    const query = req.nextUrl.search;
    const res = await fetch(`${baseUrl}/api/product/filter${query}`, {
      cache: "no-store",
    });

    const json = await res.json();
    return NextResponse.json(json, { status: res.status });
  } catch (e) {
    return NextResponse.json({ error: "fail" }, { status: 500 });
  }
}
