import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_SPRING_API_BASE_URL;

export async function callSpringAPI(req, url, method = "GET") {
  try {
    // 쿠키에서 SR_ACCESS / SR_REFRESH 꺼내기
    let token = req.cookies.get("SR_ACCESS")?.value;
    const refreshToken = req.cookies.get("SR_REFRESH")?.value;

    const doFetch = async (accessToken) => {
      console.log(accessToken);
      return await fetch(`${BASE_URL}${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        body: ["POST", "PUT", "PATCH"].includes(method)
            ? JSON.stringify(await req.json().catch(() => null))
            : undefined,
        cache: "no-store",
        credentials: "include",
      });
    };

    // AccessToken이 없을 때 → Refresh 시도
    if (!token && refreshToken) {
      const refreshRes = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `SR_REFRESH=${refreshToken}; Path=/; HttpOnly`,
        },
      });

      if (refreshRes.ok) {
        const refreshData = await refreshRes.json(); // { accessToken }
        token = refreshData.accessToken;

        const retryRes = await doFetch(token);
        return await buildResponse(retryRes, token);
      } else {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    // AccessToken 있을 때 → 요청
    let res = await doFetch(token);

    // 401 → Refresh 시도
    if (res.status === 401 && refreshToken) {
      const refreshRes = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `SR_REFRESH=${refreshToken}; Path=/; HttpOnly`,
        },
      });

      if (refreshRes.ok) {
        const refreshData = await refreshRes.json(); // { accessToken }
        token = refreshData.accessToken;
        console.log("refreshData", refreshData);

        const retryRes = await doFetch(token);
        return await buildResponse(retryRes, token);
      } else {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    // 정상 응답
    return await buildResponse(res, token);
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

  // AccessToken 재발급 시 쿠키 갱신
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