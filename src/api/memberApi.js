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

export function useDeleteMemberMutation(options) {
  return useApiMutation("DELETE", "api/user/member/delete-member", { options });
}


// ========================================== 관리자 기능 ===============================================

// 이름 변경
export function useAdminNameChangeMutation(options) {
  return useApiMutation("PATCH", "api/admin/member/modify-name", { options });
}

// 전화번호 변경
export function useAdminTelChangeMutation(options) {
  return useApiMutation("PATCH", "api/admin/member/modify-tel", { options });
}

// 권한 변경
export function useAdminRoleChangeMutation(options) {
  return useApiMutation("PATCH", "api/admin/member/modify-role", { options });
}

export function useAdminStatusChangeMutation(options) {
  return useApiMutation("PATCH", "api/admin/member/modify-status", { options });
}



// 소셜 연동 제거
export function useAdminProviderDeleteMutation(options) {
  return useApiMutation("DELETE", "api/admin/member/delete-provider", { options });
}

// 2fa 연동 제거
export function useAdmin2faDeleteMutation(options) {
  return useApiMutation("DELETE", "api/admin/member/delete-2fa", { options });
}

