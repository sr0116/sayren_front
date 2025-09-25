import axios from "axios";
import { api , noApi } from "@/lib/axios";
import {useApiMutation} from "@/hooks/useApi";

const BASE_URL = process.env.NEXT_PUBLIC_SPRING_API_BASE_URL;

// 회원가입
export function useSignupMutation(options) {
  return useApiMutation("POST", "/api/user/member/register", { options });
}

// 로그인
export function useLoginMutation(options) {
  return useApiMutation("POST", "/api/auth/login", { options });
}


// 로그아웃
export const logout = async () => {
  try {
    await api.post("/auth/logout", {});
    return true;
  } catch (err) {
    console.error("로그아웃 실패:", err.response?.data?.message || err.message);
    return false;
  }
};


// 소셜 로그인 핸들러 (window.open)
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

export function useSocialSignupMutation(options) {
  return useApiMutation("POST", "/auth/social-signup", { options });
}


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
