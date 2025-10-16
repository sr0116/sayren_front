import {NextResponse} from "next/server";

export async function callSpringAPI(req, path, method = "GET") {
    const baseUrl = process.env.NEXT_PUBLIC_SPRING_API_BASE_URL;

    const res = await fetch(`${baseUrl}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: req.headers.get("authorization"), // ✅ 이거 없으면 토큰 안 넘어감
        },
        body: method !== "GET" ? await req.text() : undefined,
    });

    const data = await res.json();
    return NextResponse.json(data);
}
