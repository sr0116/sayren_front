// src/lib/axios.js
import axios from "axios";

// ✅ 1️⃣ 백엔드 기본 주소 (직접 접근용 fallback)
const BACKEND_BASE =
    typeof window === "undefined"
        ? process.env.NEXT_SERVER_API_BASE_URL
        : process.env.NEXT_PUBLIC_API_BASE_URL;

// ✅ 2️⃣ 프록시 기반 요청 (Next → /api/... → Nginx → Spring)
const api = axios.create({
  baseURL: "/api", // ✅ 절대주소 X, 프록시용 상대경로만 사용
  withCredentials: true,
});

// ✅ 3️⃣ 직접 백엔드 접근 (테스트/로컬 용도)
const noApi = axios.create({
  baseURL: BACKEND_BASE,
  withCredentials: true,
});

console.log("[Axios Config] baseURLs =>", {
  api: api.defaults.baseURL,
  noApi: noApi.defaults.baseURL,
});

// ✅ 공통 응답 인터셉터
const onFulfilled = (res) => res.data;
const onRejected = (err) => {
  console.error("Axios Error:", err.message);
  return Promise.reject(err);
};

api.interceptors.response.use(onFulfilled, onRejected);
noApi.interceptors.response.use(onFulfilled, onRejected);

export { api, noApi };
