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

  // SDK 로드
  useEffect(() => {
    if (!window.IMP) {
      const script = document.createElement("script");
      script.src = "https://cdn.iamport.kr/v1/iamport.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const { data: notification, isLoading, isError } = useNotificationDetailQuery(id);

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError || !notification) return <div>알림 정보를 불러올 수 없습니다.</div>;

  //  타입 분기 로직
  const isPaymentNotice = notification.type === "SUBSCRIBE";
  const isDeliveryNotice = notification.type === "DELIVERY";
  const isRefundNotice = notification.type === "PAYMENT";

  //  원클릭 결제 처리
  const handleQuickPay = async () => {
    try {
      setLoading(true);

      const roundId = parseInt(notification.linkUrl.split("/").pop(), 10);
      if (isNaN(roundId)) throw new Error("linkUrl에서 회차 ID를 찾을 수 없습니다.");

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

  //  이동 (기본 알림용)
  const handleNavigate = () => {
    if (notification.linkUrl) {
      router.push(notification.linkUrl);
    } else {
      router.push("/mypage/notification");
    }
  };

  return (
      <div className="max-w-lg mx-auto space-y-5">
        <h2 className="text-xl font-semibold">{notification.title}</h2>
        <p className="text-gray-700 whitespace-pre-line">{notification.message}</p>

        {/* 기본 버튼 */}
        <div className="flex items-center justify-between">
          <button
              onClick={() => router.back()}
              className="text-sm text-gray-600 underline"
          >
            ← 목록으로 돌아가기
          </button>

          {!isPaymentNotice && (
              <button
                  onClick={handleNavigate}
                  className="text-sm text-gray-600 underline"
              >
                관련 페이지로 이동 →
              </button>
          )}
        </div>

        {/*  구독 결제용 (원클릭 결제 버튼) */}
        {isPaymentNotice && (
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

        {/*  배송 완료 등 단순 알림용 */}
        {isDeliveryNotice && (
            <div className="mt-4 text-sm text-gray-600">
              상품 배송 또는 회수와 관련된 알림입니다.
            </div>
        )}

      </div>
  );
}
