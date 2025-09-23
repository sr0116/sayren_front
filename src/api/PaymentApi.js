import axios from "axios";

// 결제 준비
export const preparePayment = async ({ orderItemId, paymentType }) => {
  try {
    const res = await axios.post(
        "/api/proxy/api/user/payments/prepare",
        { orderItemId, paymentType },
        { withCredentials: true }
    );
    return res.data; // PaymentResponseDTO
  } catch (err) {
    console.error("결제 준비 실패:", err);
    throw err;
  }
};

// 결제 완료 검증 (PortOne imp_uid 검증)
export const completePayment = async ({ paymentId, impUid }) => {
  try {
    const res = await axios.post(
        `/api/proxy/api/user/payments/${paymentId}/complete`,
        null, // body 없음
        {
          params: { imp_uid: impUid }, //
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
