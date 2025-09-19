// api/authApi.js
import axios from "axios";
import api from "@/lib/axios";

const BASE_URL = "http://localhost:8080";

// 로그인 API (RefreshToken 쿠키 발급 + AccessToken 반환)
export const login = async ({ username, password, rememberMe }) => {
  const response = await axios.post(
      `${BASE_URL}/api/auth/login`,
      { username, password, rememberMe },
      { withCredentials: true } // ✅ RefreshToken 쿠키 저장
  );
  return response.data; // { accessToken, message }
};

// AccessToken 재발급 (RefreshToken 쿠키 사용)
export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
        `${BASE_URL}/api/auth/refresh`,
        {},
        { withCredentials: true }
    );
    return response.data; // { accessToken }
  } catch (err) {
    if (err.response?.status === 401) {
      // 로그인 안 된 상태 → 조용히 null
      return null;
    }
    console.error("토큰 갱신 실패:", err);
    return null;
  }
};

// 로그아웃 (서버에서 RefreshToken 쿠키 삭제)
export const logout = async () => {
  try {
    await axios.post(
        `${BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
    );
    return true;
  } catch (err) {
    console.error("로그아웃 실패:", err);
    return false;
  }
};

// -----------------------------
// 소셜 로그인 핸들러 (window.open)
// -----------------------------
export const googleLoginHandler = () => {
  window.open(
      `${BASE_URL}/oauth2/authorization/google`,
      "googleLogin",
      "width=500,height=600"
  );
};

export const naverLoginHandler = () => {
  window.open(
      `${BASE_URL}/oauth2/authorization/naver`,
      "naverLogin",
      "width=500,height=600"
  );
};

export const kakaoLoginHandler = () => {
  window.open(
      `${BASE_URL}/oauth2/authorization/kakao`,
      "kakaoLogin",
      "width=500,height=600"
  );
};

// -----------------------------
// 소셜 관련 API (AccessToken 필요) → api 인스턴스 사용
// -----------------------------

// 소셜 회원가입
export const socialSignup = async ({ socialUser, serviceAgree, privacyAgree }) => {
  try {
    const response = await api.post("/auth/social-signup", {
      socialUser,
      serviceAgree,
      privacyAgree,
    });
    return response.data; // { accessToken }
  } catch (err) {
    console.error("소셜 회원가입 실패:", err);
    throw err;
  }
};

// 소셜 계정 연동
export const socialLink = async ({ socialUser, password }) => {
  try {
    const res = await api.post("/auth/social-link", {
      socialUser,
      password,
    });
    return res.data; // 서버에서 내려주는 MemberLoginResponseDTO
  } catch (err) {
    console.error("소셜 계정 연동 실패:", err);
    throw err;
  }
};

// 소셜 연동 시작 (리다이렉트 URL 받아서 팝업 오픈)
export const socialLinkHandler = async (provider) => {
  try {
    const res = await api.post(`/auth/link/${provider}/start`);
    const { redirectUrl } = res.data;

    window.open(
        redirectUrl,
        `${provider}Login`,
        "width=500,height=600"
    );
  } catch (err) {
    console.error(`${provider} 연동 시작 실패:`, err);
    throw err;
  }
};
