import axios from "axios";
import { store } from "@/store/store"; // ✅ 전역 store import
import { login, logout } from "@/store/authSlice";
import { refreshAccessToken } from "@/api/authApi"; // refresh API

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

// 요청 인터셉터
api.interceptors.request.use(
    (config) => {
      const state = store.getState(); // ✅ Redux state 접근
      const token = state.auth?.accessToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터
api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // 토큰 만료 시도
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const data = await refreshAccessToken();

          if (data?.accessToken) {
            // ✅ Redux 업데이트
            store.dispatch(login({ accessToken: data.accessToken }));

            // 헤더 교체 후 재요청
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return api(originalRequest);
          } else {
            store.dispatch(logout());
          }
        } catch (err) {
          console.error("Refresh 실패:", err);
          store.dispatch(logout());
        }
      }

      return Promise.reject(error);
    }
);

export default api;
