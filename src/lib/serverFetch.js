import {NextResponse} from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_SPRING_API_BASE_URL;

let isRefreshing = false;
let refreshPromise = null;

export async function callSpringAPI(req, url, method = "GET") {
  try {

    let token = req.cookies.get("SR_ACCESS")?.value;
    const refreshToken = req.cookies.get("SR_REFRESH")?.value;

    // 원본 요청 URL에서 쿼리스트링 추출
    const originalUrl = new URL(req.url);
    const queryString = originalUrl.search; // ?imp_uid=xxx

    // 실제 API 호출 함수
    const doFetch = async (accessToken) => {
      return await fetch(`${BASE_URL}${url}${queryString}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(accessToken && {Authorization: `Bearer ${accessToken}`}),
        },
        body: ["POST", "PUT", "PATCH", "DELETE"].includes(method)
          ? JSON.stringify(await req.json().catch(() => null))
          : undefined,
        cache: "no-store",
        credentials: "include",
      });
    };

    // refresh 토큰으로 새 access 발급
    const tryRefresh = async () => {
      if (!refreshToken) return null;

      // 이미 리프레시 중이면 같은 Promise 반환 (대기)
      if (isRefreshing) {
        return refreshPromise;
      }

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
          isRefreshing = false; // 항상 리셋
        }
      })();

      return refreshPromise;
    };

    // 토큰이 없고 refreshToken만 있는 경우 → 바로 refresh
    if (!token && refreshToken) {
      const newToken = await tryRefresh();
      if (newToken) {
        token = newToken;
        const retryRes = await doFetch(token);
        return await buildResponse(retryRes, token);
      } else {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
      }
    }

    // 토큰이 있을 때 → 먼저 요청
    let res = await doFetch(token);

    // 401 또는 TOKEN_EXPIRED면 refresh 후 다시 시도
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

    // 정상 응답
    return await buildResponse(res, token);

  } catch (err) {
    console.error(`Spring API 호출 실패: [${method}] ${url}`, err);
    return NextResponse.json(
      {error: "Internal Server Error"},
      {status: 500}
    );
  }
}

async function buildResponse(res, newToken) {
  const contentType = res.headers.get("content-type");
  const data = contentType?.includes("application/json")
    ? await res.json()
    : await res.text();

  const response = NextResponse.json(data, {status: res.status});

  // AccessToken 재발급 시 쿠키 갱신
  if (newToken) {
    console.log(newToken)
    const maxAgeSec = (Number(process.env.NEXT_PUBLIC_ACCESS_TOKEN_MAXAGE)) * 60;

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
