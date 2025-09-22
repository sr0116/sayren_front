import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_SPRING_API_BASE_URL;

export async function callSpringAPI(req, url, method = "GET") {
  try {
    // 쿠키에서 SR_ACCESS 꺼내기
    const token = req.cookies.get("SR_ACCESS")?.value;

    const doFetch = async () => {
      return await fetch(`${BASE_URL}${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }), // ✅ 헤더에 붙이기
        },
        body: ["POST", "PUT", "PATCH"].includes(method)
          ? JSON.stringify(await req.json().catch(() => null))
          : undefined,
        cache: "no-store",
        credentials: "include",
      });
    };

    let res = await doFetch();

    // 401 → refresh 시도
    if (res.status === 401) {
      const refreshRes = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (refreshRes.ok) {
        const refreshData = await refreshRes.json(); // { accessToken }

        // 새 토큰으로 Authorization 헤더 교체
        const newToken = refreshData.accessToken;
        const retryRes = await fetch(`${BASE_URL}${url}`, {
          method,
          headers: {
            "Content-Type": "application/json",
            ...(newToken && { Authorization: `Bearer ${newToken}` }),
          },
          body: ["POST", "PUT", "PATCH"].includes(method)
            ? JSON.stringify(await req.json().catch(() => null))
            : undefined,
          cache: "no-store",
          credentials: "include",
        });

        // ✅ 쿠키 갱신 포함해서 응답 빌드
        return await buildResponse(retryRes, newToken);
      } else {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    return await buildResponse(res);
  } catch (err) {
    console.error(`Spring API 호출 실패: [${method}] ${url}`, err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function buildResponse(res, newToken) {
  const contentType = res.headers.get("content-type");
  const data = contentType?.includes("application/json")
    ? await res.json()
    : await res.text();

  const response = NextResponse.json(data, { status: res.status });

  if (newToken) {
    response.cookies.set("SR_ACCESS", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: parseInt(process.env.NEXT_PUBLIC_ACCESS_TOKEN_MAXAGE, 10),
      sameSite: "lax",
    });
  }

  return response;
}
