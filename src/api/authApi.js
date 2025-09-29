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

export function useUserSocialLinkMutation(options) {
  return useApiMutation("POST", "api/auth/social-link", { options });
}

// 소셜 계정 연동
export function useSocialLinkMutation(options) {
  return useNoApiMutation("POST", "api/auth/social-link", { options });
}

export function useSocialConnectMutation(options, provider) {
  return useApiMutation("POST", `api/auth/link/${provider}/start`, { options });
}

