"use client";

import { useState } from "react";
import { preparePayment, completePayment } from "@/api/paymentApi";

export default function PaymentButton({ orderItemId }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);

      // 1. 결제 준비 API 호출
      const paymentData = await preparePayment({
        orderItemId,
        paymentType: "CARD",
      });
      console.log("결제 준비 응답:", paymentData);

      // 2. PortOne SDK 실행
      const IMP = window.IMP;
      if (!IMP) {
        alert("PortOne SDK가 로드되지 않았습니다.");
        return;
      }
      // PortOne 초기화 (가맹점 식별코드)
      IMP.init(process.env.NEXT_PUBLIC_IMP_CODE);

      // ✅ 환경에 따라 PG 값 분기
      const isDev = process.env.NODE_ENV !== "production";
      const pgValue = isDev
          ? "nice_v2" // 테스트 모드
          : `nice.${process.env.NEXT_PUBLIC_MERCHANT_CODE}`; // 운영 모드

      const paymentRequest = {
        pg: pgValue,
        pay_method: "card",
        merchant_uid: paymentData.merchant_uid, // 백엔드에서 생성된 merchant_uid 사용
        name: isDev ? "테스트 결제" : "운영 결제",
        amount: paymentData.amount,
        buyer_email: isDev ? "test@example.com" : "real@example.com",
        buyer_name: "홍길동",
        buyer_tel: "010-1234-5678",
      };

      // 3. PortOne 결제창 실행
      IMP.request_pay(paymentRequest, async (rsp) => {
        console.log("PortOne 응답:", rsp);

        if (rsp.imp_uid) {
          try {
            // 4. 결제 완료 검증 API 호출
            const result = await completePayment({
              paymentId: paymentData.payment_id, // preparePayment 응답값
              impUid: rsp.imp_uid,               // PortOne 응답 imp_uid
            });

            alert("결제 성공 🎉\n" + JSON.stringify(result));
          } catch (err) {
            console.error("결제 검증 실패:", err);
            alert("결제 검증 실패\n" + err.message);
          }
        } else {
          alert("결제 실패 ❌\n" + JSON.stringify(rsp));
        }
      });
    } catch (err) {
      console.error("결제 처리 중 오류:", err);
      alert("결제 처리 중 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  return (
      <button
          onClick={handleClick}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {loading ? "결제 진행중..." : "결제하기"}
      </button>
  );
}
