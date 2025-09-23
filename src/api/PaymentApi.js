import api from "@/lib/axios";
import axios from "axios";

// 결제 준비 (사전등록 → PENDING)
export const preparePayment = async ({ orderItemId, paymentType }) => {
  try {
    const response = await api.post("/payments/prepare", {
      orderItemId,
      paymentType,
    });
    return response.data; // PaymentResponseDTO
  } catch (err) {
    console.error("결제 준비 실패:", err);
    throw err;
  }
};

// 결제 완료 검증 (PortOne imp_uid 검증)
export const completePayment = async ({ paymentId, impUid }) => {
  try {
    const response = await api.post(
        `/payments/${paymentId}/complete?imp_uid=${impUid}`
    );
    return response.data;
  } catch (err) {
    console.error("결제 완료 검증 실패:", err);
    throw err;
  }
};

// 환불 요청
export const refundPayment = async ({ paymentId }) => {
  try {
    const response = await api.post(`/payments/${paymentId}/refund`);
    return response.data;
  } catch (err) {
    console.error("환불 요청 실패:", err);
    throw err;
  }
};

// 최근 결제 조회 (옵션)
export const getRecentPayments = async () => {
  try {
    const response = await api.get("/payments/recent");
    return response.data;
  } catch (err) {
    console.error("최근 결제 조회 실패:", err);
    throw err;
  }
};

// 단일 결제 조회
export const getPaymentById = async (paymentId) => {
  try {
    const response = await api.get(`/payments/${paymentId}`);
    return response.data;
  } catch (err) {
    console.error("결제 조회 실패:", err);
    throw err;
  }
};