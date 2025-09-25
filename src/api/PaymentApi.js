import axios from "axios";
import {api} from "@/lib/axios";
import {useApiMutation} from "@/hooks/useApi";

// 결제 준비
export const preparePayment = async ({ orderItemId, paymentType }) => {
  try {
    const res = await api.post(
        "/api/user/payments/prepare",
        { orderItemId, paymentType },
    );
    return res.data; // PaymentResponseDTO
  } catch (err) {
    console.error("결제 준비 실패:", err);
    throw err;
  }
};

// export function usePreparePaymentMutation(options) {
//   return useApiMutation("POST", "/api/user/payments/prepare", { options });
// }



// 결제 완료 검증 (PortOne imp_uid 검증)
export const completePayment = async ({ paymentId, impUid }) => {
  try {
    const res = await api.post(
        `/api/user/payments/${paymentId}/complete`,
        {}, //  null 대신 빈 객체
        {
          params: { imp_uid: impUid }, //  쿼리 파라미터 보장
          withCredentials: true,
        }
    );
    return res.data;
  } catch (err) {
    console.error("결제 완료 검증 실패:", err);
    throw err;
  }
};






// 환불 요청
export const refundPayment = async ({ paymentId }) => {
  try {
    const res = await axios.post(
        `/api/proxy/api/payments/${paymentId}/refund`,
        {},
        { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.error("환불 요청 실패:", err);
    throw err;
  }
};

// 최근 결제 조회
export const getRecentPayments = async () => {
  try {
    const res = await axios.get("/api/proxy/api/payments/recent", {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("최근 결제 조회 실패:", err);
    throw err;
  }
};

// 단일 결제 조회
export const getPaymentById = async (paymentId) => {
  try {
    const res = await axios.get(`/api/proxy/api/payments/${paymentId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("결제 조회 실패:", err);
    throw err;
  }
};
