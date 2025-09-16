"use client";

import Script from "next/script";
import { useState } from "react";

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [lastPayment, setLastPayment] = useState(null);
  const [status, setStatus] = useState(null);

  const MERCHANT_CODE = "imp52145352"; // PortOne 가맹점 코드
  const API_BASE = "http://localhost:8080/api/payments";

  // 공통 결제 로직
  const handlePayment = async (planId, productName) => {
    setLoading(true);
    setStatus("processing");

    try {
      // 1. 백엔드 결제 준비 요청
      const prepareRes = await fetch(`${API_BASE}/prepare`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: 8,   // 테스트용 주문 ID
          memberId: 1,  // 테스트용 회원 ID
          planId: 2,
          amount: 100,  // 테스트 금액
          payType: "CARD",
        }),
      });
      const prepared = await prepareRes.json();

      if (!prepared.ok || !prepared.data) {
        setLoading(false);
        setStatus("failed");
        console.error("결제 준비 실패:", prepared.message);
        return;
      }

      const { paymentId, merchantUid, amount } = prepared.data;

      // 2. PortOne SDK 실행
      if (!window.IMP) {
        setLoading(false);
        setStatus("failed");
        console.error("PortOne SDK 로드 실패");
        return;
      }

      const { IMP } = window;
      IMP.init(MERCHANT_CODE);

      IMP.request_pay(
          {
            pg: "nice_v2",
            pay_method: "card",
            merchant_uid: merchantUid,
            name: productName,
            amount,
            buyer_email: "test@example.com",
            buyer_name: "사랑",
          },
          async (rsp) => {
            setLoading(false);
            console.log("PortOne 응답:", rsp);

            if (!rsp.imp_uid) {
              setStatus("failed");
              console.error("결제 실패:", rsp.error_msg);
              return;
            }

            // 3. 결제 완료 검증 API 호출
            try {
              const completeRes = await fetch(
                  `${API_BASE}/${paymentId}/complete?imp_uid=${rsp.imp_uid}`,
                  { method: "POST" }
              );
              const result = await completeRes.json();

              if (result.ok) {
                setStatus("success");
                setLastPayment(result.data);
                console.log("결제 성공:", result.data);
              } else {
                setStatus("failed");
                console.error("검증 실패:", result.message);
              }
            } catch (err) {
              setStatus("failed");
              console.error("검증 요청 중 에러:", err);
            }
          }
      );
    } catch (err) {
      setLoading(false);
      setStatus("failed");
      console.error("결제 처리 중 에러:", err);
    }
  };

  return (
      <main className="p-6 space-y-4 bg-gray-100 min-h-screen">
        <Script src="https://cdn.iamport.kr/v1/iamport.js" strategy="afterInteractive" />

        <h1 className="text-xl font-semibold">결제 테스트</h1>

        <div className="space-x-4">
          {/* 일반 결제 버튼 */}
          <button
              disabled={loading}
              onClick={() => handlePayment(1, "일반 구매 상품")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            {loading ? "처리 중..." : "일반 결제 테스트"}
          </button>

          {/* 구독 결제 버튼 */}
          <button
              disabled={loading}
              onClick={() => handlePayment(2, "구독 결제 상품")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            {loading ? "처리 중..." : "구독 결제 테스트"}
          </button>
        </div>

        {/* 결제 결과 표시 */}
        {status && (
            <div className="mt-6">
              <p>상태: {status}</p>
              {lastPayment && (
                  <pre className="bg-white p-4 rounded-lg mt-2 text-sm">
              {JSON.stringify(lastPayment, null, 2)}
            </pre>
              )}
            </div>
        )}
      </main>
  );
}
