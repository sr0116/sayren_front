"use client";

import { useState, useEffect } from "react";
import { prepareRoundPayment, completePayment } from "@/api/paymentApi";
import { queryClient } from "@/lib/queryClient";

export default function RoundPaymentButton({ round, subscribeId }) {
  const [loading, setLoading] = useState(false);

  // PortOne SDK 로드 (초기 1회)
  useEffect(() => {
    if (!window.IMP) {
      const script = document.createElement("script");
      script.src = "https://cdn.iamport.kr/v1/iamport.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handlePay = async () => {
    try {
      setLoading(true);

      //  회차 결제 준비 요청
      const paymentData = await prepareRoundPayment(round.subscribeRoundId);
      if (!paymentData?.merchantUid) {
        throw new Error("merchantUid 없음: " + JSON.stringify(paymentData));
      }

      // PortOne SDK 초기화
      const IMP = window.IMP;
      if (!IMP) throw new Error("PortOne SDK가 아직 로드되지 않았습니다.");
      IMP.init(process.env.NEXT_PUBLIC_IMP_CODE);

      //  결제 요청 데이터 구성
      const paymentRequest = {
        pg: "nice_v2",
        pay_method: "card",
        merchant_uid: paymentData.merchantUid,
        name: `구독 ${subscribeId} - ${round.roundNo}회차`,
        amount: paymentData.amount,
        buyer_email: paymentData.buyerEmail || "t2t@example.com",
        buyer_name: paymentData.buyerName || "정사랑",
        buyer_tel: paymentData.buyerTel || "010-10454-5478",
      };

      //  PortOne 결제창 실행
      IMP.request_pay(paymentRequest, async (rsp) => {
        if (!rsp?.imp_uid) {
          alert("결제 식별자(imp_uid)가 없습니다.");
          return;
        }

        try {
          //  결제 완료 검증
          const result = await completePayment({
            paymentId: paymentData.paymentId,
            impUid: rsp.imp_uid,
          });

          if (result.paymentStatus === "PAID") {
            alert(`${round.roundNo}회차 결제 성공`);
            queryClient.invalidateQueries("subscribeRounds");
          } else {
            alert(`${round.roundNo}회차 결제 실패: ${result.paymentStatus}`);
          }
        } catch (err) {
          console.error("결제 검증 실패:", err);
          alert("결제 검증 실패: " + err.message);
        }
      });
    } catch (err) {
      console.error("결제 처리 중 오류:", err);
      alert("결제 중 오류가 발생했습니다: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <button
          onClick={(e) => {
            e.stopPropagation();
            handlePay();
          }}
          disabled={loading}
          className={`px-3 py-1 rounded text-sm cursor-pointer ${
              loading
                  ? "bg-gray-400 text-white"
                  : "bg-gray-500 text-white hover:bg-gray-700"
          }`}
      >
        {loading
            ? "결제중..."
            : round.roundNo > 1
                ? "원클릭 결제"
                : "결제하기"}
      </button>
  );
}
