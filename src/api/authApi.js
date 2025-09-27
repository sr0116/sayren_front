import { api , noApi } from "@/lib/axios";
import {useApiMutation} from "@/hooks/useApi";
import {useNoApiMutation} from "@/hooks/useNoApi";

const BASE_URL = process.env.NEXT_PUBLIC_SPRING_API_BASE_URL;

// 회원가입
export function useSignupMutation(options) {
  return useApiMutation("POST", "/api/user/member/register", { options });
}


export function useLoginMutation(options) {
  return useNoApiMutation("POST", "/api/auth/login", { options });
}


export function useLogoutMutation(options) {
  return useNoApiMutation("POST", "/api/auth/logout", { options });
}


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
export function useSocialSignupMutation(options) {
  return useNoApiMutation("POST", "api/auth/social-signup", { options });
}


// 소셜 계정 연동
export function useSocialLinkMutation(options) {
  return useNoApiMutation("POST", "api/auth/social-link", { options });
}

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
