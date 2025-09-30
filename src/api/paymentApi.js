import { api } from "@/lib/axios";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";


// 결제 준비 (결제창 열기 전 호출)
export const preparePayment = async ({ orderItemId}) => {
  try {
    const data = await api.post("/api/user/payments/prepare", {
      orderItemId,
    });
    return data;
  } catch (err) {
    console.error("결제 준비 실패:", err);
    throw err;
  }
};

// 결제 완료 검증 (PortOne imp_uid → 백엔드 검증)
export const completePayment = async ({ paymentId, impUid }) => {
  try {
    const data = await api.post(
        `/api/user/payments/${paymentId}/complete`,
        {},
        { params: { imp_uid: impUid }, withCredentials: true }
    );
    return data;
  } catch (err) {
    console.error("결제 완료 검증 실패:", err);
    throw err;
  }
};

// 환불 요청
// export const refundPayment = async ({ paymentId }) => {
//   try {
//     const data = await api.post(`/api/payments/${paymentId}/refund`, {});
//     return data;
//   } catch (err) {
//     console.error("환불 요청 실패:", err);
//     throw err;
//   }
// };

// 최근 결제 요약 조회
export const getRecentPayments = async () => {
  try {
    const data = await api.get("/api/user/payments/summaries");
    return data;
  } catch (err) {
    console.error("최근 결제 조회 실패:", err);
    throw err;
  }
};

// 단일 결제 조회 (백엔드 엔드포인트 추가 필요)
export const getPaymentById = async (paymentId) => {
  try {
    const data = await api.get(`/api/user/payments/${paymentId}`);
    return data;
  } catch (err) {
    console.error("결제 조회 실패:", err);
    throw err;
  }
};

// React Query Hooks
export function usePreparePaymentMutation(options) {
  return useApiMutation("POST", "/api/user/payments/prepare", { options });
}

export function useCompletePaymentMutation(paymentId, options) {
  return useApiMutation("POST", `/api/user/payments/${paymentId}/complete`, {
    options,
  });
}

// export function useRefundPaymentMutation(paymentId, options) {
//   return useApiMutation("POST", `/api/user/payments/${paymentId}/refund`, {
//     options,
//   });
// }

// 최근 결제 요약 조회
export function useRecentPaymentsQuery(options) {
  return useApiQuery(
      "recentPayments",
      "/api/user/payments/summaries",
      { options }
  );
}

export function usePaymentByIdQuery(paymentId, options) {
  return useApiQuery(["payment", paymentId], `/api/user/payments/${paymentId}`, {
    options,
  });
}