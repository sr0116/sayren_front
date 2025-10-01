"use client";

import { useState, useEffect } from "react";
import { preparePayment, completePayment } from "@/api/paymentApi";

export default function PaymentButton({ orderItemId }) {
  const [loading, setLoading] = useState(false);

  //  SDK 로드 보장
  useEffect(() => {
    if (!window.IMP) {
      const script = document.createElement("script");
      script.src = "https://cdn.iamport.kr/v1/iamport.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleClick = async () => {
    try {
      setLoading(true);

      const paymentData = await preparePayment({ orderItemId });
      console.log("결제 준비 응답:", paymentData);

      if (!paymentData?.merchantUid) {
        throw new Error("merchantUid 없음: " + JSON.stringify(paymentData));
      }

      const IMP = window.IMP;
      if (!IMP) {
        alert("PortOne SDK가 아직 로드되지 않았습니다.");
        return;
      }

      IMP.init(process.env.NEXT_PUBLIC_IMP_CODE);

      const paymentRequest = {
        pg: "nice_v2",
        pay_method: "card",
        merchant_uid: paymentData.merchantUid,
        name: "테스트 결제",
        amount: paymentData.amount,
        buyer_email: "test@example.com",
        buyer_name: "홍길동",
        buyer_tel: "010-1234-5678",
      };

      IMP.request_pay(paymentRequest, async (rsp) => {
        console.log("PortOne 응답:", rsp);

        try {
          const result = await completePayment({
            paymentId: paymentData.paymentId,
            impUid: rsp.imp_uid,
          });

          if (result.paymentStatus === "PAID") {
            alert("결제 성공: " + JSON.stringify(result));
          } else {
            alert("결제 실패 또는 취소: " + JSON.stringify(result));
          }
        } catch (err) {
          console.error("결제 검증 실패:", err);
          alert("결제 검증 실패: " + err.message);
        }
      });
    } catch (err) {
      console.error("결제 처리 중 오류:", err);
      alert("결제 처리 중 오류 발생: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <button
          onClick={handleClick}
          disabled={loading}
          className="px-4 py-2 bg-gray-500 text-white rounded"
      >
        {loading ? "결제 진행중..." : "결제하기"}
      </button>
  );
}
