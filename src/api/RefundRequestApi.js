import { api } from "@/lib/axios";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";

//
// API Functions
//

// 1. 환불 요청 생성
export const createRefundRequest = async (dto) => {
  try {
    const data = await api.post("/api/user/refunds/requests", dto);
    return data;
  } catch (err) {
    console.error("환불 요청 생성 실패:", err);
    throw err;
  }
};

// 2. 환불 요청 취소
export const cancelRefundRequest = async (id) => {
  try {
    const data = await api.post(`/api/user/refunds/requests/${id}/cancel`, {});
    return data;
  } catch (err) {
    console.error("환불 요청 취소 실패:", err);
    throw err;
  }
};

// 3. 환불 요청 단건 조회
export const getRefundRequestById = async (id) => {
  try {
    const data = await api.get(`/api/user/refunds/requests/${id}`);
    return data;
  } catch (err) {
    console.error("환불 요청 단건 조회 실패:", err);
    throw err;
  }
};

// 4. 내 환불 요청 내역 조회
export const getMyRefundRequests = async () => {
  try {
    const data = await api.get("/api/user/refunds/requests/me");
    return data;
  } catch (err) {
    console.error("내 환불 요청 내역 조회 실패:", err);
    throw err;
  }
};

//
// React Query Hooks
//

// 환불 요청 생성
export function useCreateRefundRequestMutation(options) {
  return useApiMutation("POST", "/api/user/refunds/requests", { options });
}

// 환불 요청 취소
export function useCancelRefundRequestMutation(id, options) {
  return useApiMutation("POST", `/api/user/refunds/requests/${id}/cancel`, {
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

// 내 환불 요청 내역
export function useMyRefundRequestsQuery(options) {
  return useApiQuery(
      "myRefundRequests",
      "/api/user/refunds/requests/me",
      { options }
  );
}
