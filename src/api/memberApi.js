import {useApiMutation} from "@/hooks/useApi";

export function useFindIdMutation(options) {
  return useApiMutation("POST", "/api/user/member/find-email", { options });
}

export function useFindPwMutation(options) {
  return useApiMutation("POST", "/api/user/member/find-pw", { options });
}

export function useResetPwMutation(options) {
  return useApiMutation("POST", "/api/user/member/reset-pw", { options });
}