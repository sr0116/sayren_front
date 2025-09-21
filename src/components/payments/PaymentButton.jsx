"use client";

import { useState } from "react";

export default function PaymentButton({ orderItemId = 3 }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);

      // === [1] 결제 준비 API ===
      const prepareRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/payments/prepare`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({
              orderItemId,
              paymentType: "CARD",
            }),
          }
      );

      if (!prepareRes.ok) throw new Error("결제 준비 실패");
      const paymentData = await prepareRes.json();
      console.log("✅ 결제 준비 응답:", paymentData);

      // === [2] PortOne SDK ===
      const IMP = window.IMP;
      if (!IMP) {
        alert("PortOne SDK가 로드되지 않았습니다.");
        return;
      }
      IMP.init(process.env.NEXT_PUBLIC_MERCHANT_CODE);

      IMP.request_pay(paymentRequest, async (rsp) => {
        console.log("PortOne 응답:", rsp);

        if (rsp.imp_uid) {
          // === 백엔드에 결제 검증 요청 ===
          const completeRes = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE}/api/payments/${paymentData.paymentId}/complete?imp_uid=${rsp.imp_uid}`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
              }
          );

          const result = await completeRes.json();

          if (completeRes.ok) {
            alert("✅ 결제 성공: " + JSON.stringify(result));
          } else {
            alert("❌ 결제 검증 실패: " + JSON.stringify(result));
          }
        } else {
          alert("❌ 결제 실패: " + JSON.stringify(rsp));
        }
      });

    } catch (err) {
      console.error(err);
      alert("❌ 결제 처리 중 오류 발생");
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
