import { NextResponse } from "next/server";

// ✅ 반드시 명시 — 절대 undefined 되지 않도록
const BASE_URL =
    process.env.NEXT_SERVER_API_BASE_URL || "http://15.165.159.88:8800/api";

let isRefreshing = false;
let refreshPromise = null;

export async function callSpringAPI(req, url, method = "GET") {
  try {
    let token = req.cookies.get("SR_ACCESS")?.value;
    const refreshToken = req.cookies.get("SR_REFRESH")?.value;

    const originalUrl = new URL(req.url);
    const queryString = originalUrl.search || "";

    // ✅ 실제 fetch 함수
    const doFetch = async (accessToken) => {
      const res = await fetch(`${BASE_URL}${url}${queryString}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        body: ["POST", "PUT", "PATCH", "DELETE"].includes(method)
            ? JSON.stringify(await req.json().catch(() => null))
            : undefined,
        credentials: "include",
        cache: "no-store",
      });
      return res;
    };

    // ✅ refresh 요청 처리
    const tryRefresh = async () => {
      if (!refreshToken) return null;
      if (isRefreshing) return refreshPromise;

      isRefreshing = true;
      refreshPromise = (async () => {
        try {
          const refreshRes = await fetch(`${BASE_URL}/api/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          if (!refreshRes.ok) return null;
          const refreshData = await refreshRes.json();
          return refreshData.accessToken;
        } catch (err) {
          console.error("리프레시 요청 실패:", err);
          return null;
        } finally {
          isRefreshing = false;
        }
      })();

      return refreshPromise;
    };

    // ✅ Access Token 검증 및 요청 처리
    if (!token && refreshToken) {
      const newToken = await tryRefresh();
      if (newToken) {
        token = newToken;
        const retryRes = await doFetch(token);
        return await buildResponse(retryRes, token);
      }
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let res = await doFetch(token);

    if (res.status === 401 || res.status === 403) {
      let errBody;
      try {
        errBody = await res.clone().json();
      } catch (e) {}

      const isExpired =
          errBody?.errorCode === "TOKEN_EXPIRED" ||
          errBody?.message?.includes("Access Token이 만료되었습니다.");

      if (isExpired && refreshToken) {
        const newToken = await tryRefresh();
        if (newToken) {
          token = newToken;
          const retryRes = await doFetch(token);
          return await buildResponse(retryRes, newToken);
        }
      }
    }

    return await buildResponse(res, token);
  } catch (err) {
    console.error(`Spring API 호출 실패: [${method}] ${url}`, err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

async function buildResponse(res, newToken) {
  const contentType = res.headers.get("content-type");
  const data = contentType?.includes("application/json")
      ? await res.json()
      : await res.text();

  const response = NextResponse.json(data, { status: res.status });

  if (newToken) {
    const maxAgeSec = Number(process.env.NEXT_PUBLIC_ACCESS_TOKEN_MAXAGE) * 60;
    response.cookies.set("SR_ACCESS", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: maxAgeSec,
      sameSite: "lax",
    });
  }

  return response;
}
