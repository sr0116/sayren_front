import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_SPRING_API_BASE_URL;

let isRefreshing = false;
let refreshPromise = null;

export async function callSpringAPI(req, url, method = "GET") {
  try {
    //  [빌드 타임 차단 로직]
    // Next.js 빌드(`npm run build`) 중일 때 API 요청 방지
    if (process.env.NEXT_PHASE === "phase-production-build") {
      console.log(` Skipping API call during build: [${method}] ${url}`);
      return NextResponse.json(
          { message: "Skipped during build phase" },
          { status: 200 }
      );
    }

    // -------------------------
    // 기존 인증 및 API 요청 로직
    // -------------------------
    let token = req.cookies.get("SR_ACCESS")?.value;
    const refreshToken = req.cookies.get("SR_REFRESH")?.value;

    // 쿼리스트링 추출
    const originalUrl = new URL(req.url);
    const queryString = originalUrl.search;

    // 실제 API 호출
    const doFetch = async (accessToken) => {
      return await fetch(`${BASE_URL}${url}${queryString}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        body: ["POST", "PUT", "PATCH", "DELETE"].includes(method)
            ? JSON.stringify(await req.json().catch(() => null))
            : undefined,
        cache: "no-store",
        credentials: "include",
      });
    };

    // 토큰 갱신 로직
    const tryRefresh = async () => {
      if (!refreshToken) return null;
      if (isRefreshing) return refreshPromise;

      isRefreshing = true;
      refreshPromise = (async () => {
        try {
          const refreshRes = await fetch(`${BASE_URL}/api/auth/refresh`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Cookie: `SR_REFRESH=${refreshToken}`,
            },
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

    // -------------------------
    // Access / Refresh 토큰 처리
    // -------------------------

    // 토큰이 없고 refreshToken만 있으면 새 토큰 발급
    if (!token && refreshToken) {
      const newToken = await tryRefresh();
      if (newToken) {
        token = newToken;
        const retryRes = await doFetch(token);
        return await buildResponse(retryRes, token);
      } else {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    // 토큰이 있을 경우 일반 호출
    let res = await doFetch(token);

    // 만료 시 refresh 재시도
    if (res.status === 401 || res.status === 403) {
      let errBody = null;
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
        } else {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
      }
    }

    // 정상 응답 반환
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

  // AccessToken 갱신 시 쿠키 업데이트
  if (newToken) {
    const maxAgeSec =
        Number(process.env.NEXT_PUBLIC_ACCESS_TOKEN_MAXAGE) * 60;

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
