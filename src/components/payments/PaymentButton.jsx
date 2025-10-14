"use client";

import { useState } from "react";
import { preparePayment, completePayment } from "@/api/paymentApi";
import { requestPortOnePayment } from "@/lib/portone";

export default function PaymentButton({ orderItemId }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      console.log("결제 시작 - orderItemId:", orderItemId);

      //  결제 준비 요청
      const paymentData = await preparePayment({ orderItemId });
      console.log("결제 준비 응답:", paymentData);

      // 데이터 유효성 검증
      if (!paymentData || !paymentData.merchantUid) {
        throw new Error("결제 준비 데이터가 올바르지 않습니다.");
      }

      //  PortOne SDK 호출
      const rsp = await requestPortOnePayment(paymentData);
      console.log("PortOne 응답:", rsp);

      // PortOne 응답 확인
      if (!rsp || !rsp.imp_uid) {
        throw new Error("PortOne 결제 응답이 올바르지 않습니다.");
      }

      //  백엔드 검증 요청
      const result = await completePayment({
        paymentId: paymentData.paymentId,
        impUid: rsp.imp_uid,
      });
      console.log("백엔드 결제 검증 결과:", result);

      // 결제 상태 확인 및 알림 처리
      if (result.paymentStatus === "PAID") {
        alert("결제가 정상적으로 완료되었습니다.");
      } else if (result.paymentStatus === "FAILED") {
        alert("결제에 실패했습니다. 다시 시도해주세요.");
      } else if (result.paymentStatus === "CANCELED") {
        alert("결제가 취소되었습니다.");
      } else {
        alert(`결제 상태를 확인할 수 없습니다: ${result.paymentStatus}`);
      }
    } catch (err) {
      // 예외 처리 (프론트 로직, PortOne 오류, 백엔드 오류 등)
      console.error("결제 처리 중 오류:", err);
      alert("결제 중 오류가 발생했습니다: " + err.message);
    } finally {
      // 로딩 상태 해제
      setLoading(false);
    }
  };

  return (
      <button
          onClick={handleClick}
          disabled={loading}
          className={`px-4 py-2 rounded text-white transition ${
              loading ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
          }`}
      >
        {loading ? "결제 진행중..." : "결제하기"}
      </button>
  );
}
