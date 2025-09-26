import {useApiMutation} from "@/hooks/useApi";

export function useFindIdMutation(options) {
  return useApiMutation("POST", "/api/user/member/find-email", { options });
}
