import { useApiQuery, useApiMutation } from "@/hooks/useApi";


// 사용자 API 훅(ㅕㄴㄷㄱ)
//환불 요청 생성
export function useCreateRefundRequestMutation(options) {
  return useApiMutation("POST", "/api/user/refunds/requests", {
    invalidateKeys: ["myRefundRequests"], // 생성 후 내 환불 내역 갱신
    options,
  });
}

// 환불 요청 취소
export function useCancelRefundRequestMutation(options) {
  return useApiMutation("POST", ({ id }) => `/api/user/refunds/requests/${id}/cancel`, {
    invalidateKeys: ["myRefundRequests"],
    options,
  });
}

// 환불 요청 단건 조회
export function useRefundRequestByIdQuery(id, options) {
  return useApiQuery(
      ["refundRequest", id],
      `/api/user/refunds/requests/${id}`,
      { options }
  );
}

// 내 환불 요청 내역 조회
export function useMyRefundRequestsQuery(options) {
  return useApiQuery(
      "myRefundRequests",
      "/api/user/refunds/requests/me",
      { options }
  );
}

//
// 관리자 API 훅
//

// 관리자: 전체 환불 요청 조회
export function useAllRefundRequestsQuery(options) {
  return useApiQuery(
      "allRefundRequests",
      "/api/user/admin/refunds/requests",
      { options }
  );
}

//  관리자: 환불 요청 승인/거절 처리
export function useProcessRefundRequestMutation(options) {
  return useApiMutation(
      "POST",
      (params) =>
          `/api/user/admin/refunds/requests/${params.id}/process?status=${params.status}&reasonCode=${params.reasonCode}`,
      {
        invalidateKeys: ["allRefundRequests"],
        options,
      }
  );
}

