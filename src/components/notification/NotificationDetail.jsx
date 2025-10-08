"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useNotificationDetailQuery } from "@/api/notificationApi";
import { prepareRoundPayment, completePayment } from "@/api/paymentApi";
import { queryClient } from "@/lib/queryClient";

export default function NotificationDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //  PortOne SDK 로드 (한 번만 실행)
  useEffect(() => {
    if (!window.IMP) {
      const script = document.createElement("script");
      script.src = "https://cdn.iamport.kr/v1/iamport.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  //  React Query 기반 단일 알림 조회
  const {
    data: notification,
    isLoading,
    isError,
  } = useNotificationDetailQuery(id);

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError || !notification)
    return <div>알림 정보를 불러올 수 없습니다.</div>;

  //  원클릭 결제 로직
  const handleQuickPay = async () => {
    try {
      setLoading(true);

      // 예: linkUrl = "/mypage/subscribe/266"
      const roundId = parseInt(notification.linkUrl.split("/").pop(), 10);
      if (isNaN(roundId)) {
        throw new Error("linkUrl에서 회차 ID를 찾을 수 없습니다.");
      }

      const paymentData = await prepareRoundPayment(roundId);
      const IMP = window.IMP;
      if (!IMP) {
        alert("PortOne SDK가 아직 로드되지 않았습니다.");
        return;
      }

      IMP.init(process.env.NEXT_PUBLIC_IMP_CODE);

      IMP.request_pay(
          {
            pg: "nice_v2",
            pay_method: "card",
            merchant_uid: paymentData.merchantUid,
            name: notification.title,
            amount: paymentData.amount,
          },
          async (rsp) => {
            if (!rsp.imp_uid) {
              alert("결제가 취소되었거나 실패했습니다.");
              setLoading(false);
              return;
            }

            const result = await completePayment({
              paymentId: paymentData.paymentId,
              impUid: rsp.imp_uid,
            });

            if (result.paymentStatus === "PAID") {
              alert("결제가 완료되었습니다!");
              queryClient.invalidateQueries("myNotifications");
              router.push("/mypage/notification");
            } else {
              alert("결제 실패 또는 취소되었습니다.");
            }

            setLoading(false);
          }
      );
    } catch (err) {
      console.error("원클릭 결제 오류:", err);
      alert("결제 처리 중 오류가 발생했습니다: " + err.message);
      setLoading(false);
    }
  };

  return (
      <div className="max-w-lg mx-auto space-y-4">
        <h2 className="text-xl font-semibold">{notification.title}</h2>
        <p className="text-gray-700">{notification.message}</p>

        <button
            onClick={() => router.back()}
            className="text-sm text-gray-600 underline"
        >
          ← 목록으로 돌아가기
        </button>

        {notification.type === "SUBSCRIBE" && (
            <button
                disabled={loading}
                onClick={handleQuickPay}
                className={`block w-full mt-4 py-2 rounded text-white ${
                    loading ? "bg-gray-400" : "bg-gray-800 hover:bg-gray-900"
                }`}
            >
              {loading ? "결제 중..." : "원클릭 결제"}
            </button>
        )}
      </div>
  );
}
