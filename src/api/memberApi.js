import {useApiMutation, useApiQuery} from "@/hooks/useApi";
import {useNoApiMutation} from "@/hooks/useNoApi";

export function useEmailSendMutation(options) {
  return useNoApiMutation("POST", "api/user/member/email-verify", { options });
}

export function useChangeNameMutation(options) {
  return useApiMutation("PATCH", "api/user/member/change-name", {options});
}

export function useCheckPasswordMutation(options) {
  return useApiMutation("POST", "api/user/member/check-pw", {options});
}


export function useFindIdMutation(options) {
  return useApiMutation("POST", "/api/user/member/find-email", { options });
}

export function useFindPwMutation(options) {
  return useApiMutation("POST", "/api/user/member/find-pw", { options });
}

export function useResetPwMutation(options) {
  return useApiMutation("PATCH", "/api/user/member/reset-pw", { options });
}

export function useNoResetPwMutation(options) {
  return useNoApiMutation("PATCH", "/api/user/member/reset-pw", { options });
}

export function useSocialListQuery(options) {
  return useApiQuery("social-list", "/api/user/member/social-list", {
    options: {
      staleTime: 10 * 60 * 1000, // 10분
      ...options,
    },
  });
}

export function useSocialDisconnectMutation(options) {
  return useApiMutation("POST", "api/user/member/social-disconnect", { options });
}



