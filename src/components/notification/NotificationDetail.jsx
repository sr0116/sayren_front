"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useNotificationDetailQuery } from "@/api/notificationApi";
import { prepareRoundPayment, completePayment } from "@/api/paymentApi";
import { queryClient } from "@/lib/queryClient";
import dayjs from "dayjs";
import StatusBadge from "@/components/common/StatusBadge";

export default function NotificationDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //  PortOne SDK 로드
  useEffect(() => {
    if (!window.IMP) {
      const script = document.createElement("script");
      script.src = "https://cdn.iamport.kr/v1/iamport.js";
      script.async = true;
      script.onload = () => console.log(" PortOne SDK 로드 완료 (NotificationDetail)");
      document.body.appendChild(script);
    }
  }, []);

  //  알림 상세 조회
  const { data: notification, isLoading, isError } =
      useNotificationDetailQuery(id);

  if (isLoading)
    return <div className="text-center py-10 text-gray-500">불러오는 중...</div>;
  if (isError || !notification)
    return <div className="text-center py-10 text-gray-500">알림 정보를 불러올 수 없습니다.</div>;

  //  알림 타입 분기
  const isRoundPaymentNotice =
      notification.type === "SUBSCRIBE_ROUND" || notification.type === "SUBSCRIBE";
  const isDeliveryNotice = notification.type === "DELIVERY";
  const isRefundNotice = notification.type === "PAYMENT";
  const hasLink = !!notification.linkUrl;

  //  회차 결제 처리
  const handleQuickPay = async () => {
    try {
      setLoading(true);
      const roundId = parseInt(notification.linkUrl.split("/").pop(), 10);
      if (isNaN(roundId)) throw new Error("회차 ID를 찾을 수 없습니다.");

      const paymentData = await prepareRoundPayment(roundId);
      const IMP = window.IMP;
      if (!IMP) throw new Error("PortOne SDK가 아직 로드되지 않았습니다.");

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
              queryClient.invalidateQueries(["myNotifications"]);
              const roundId = paymentData.roundId || parseInt(notification.linkUrl.split("/").pop(), 10);
              router.push(roundId ? `/mypage/subscribe/round/${roundId}` : "/mypage/notification");
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

  //  관련 페이지 이동
  const handleNavigate = () => {
    if (notification.linkUrl) router.push(notification.linkUrl);
    else router.push("/mypage/notification");
  };

  return (
      <div className="max-w-2xl mx-auto p-6 bg-white border border-gray-200 rounded-xl shadow-sm space-y-8">
        {/* 헤더 */}
        <header className="border-b border-gray-200 pb-3">
          <h2 className="text-xl font-semibold text-gray-900">{notification.title}</h2>
          <p className="text-sm text-gray-500 mt-1">
            등록일: {dayjs(notification.regDate).format("YYYY-MM-DD HH:mm")}
          </p>
          <div className="mt-2">
            <StatusBadge type="NotificationType" value={notification.type} />
          </div>
        </header>

        {/* 본문 */}
        <section>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">{notification.message}</p>
        </section>

        {/* 버튼 영역 */}
        <section className="border-t border-gray-200 pt-5">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 w-full">
            {/* 🔹 목록으로 돌아가기 (공통) */}
            <button
                onClick={() => router.push("/mypage/notification")}
                className="flex-1 py-3 font-semibold text-gray-800 bg-gray-100 border border-gray-300
                       rounded-md sm:rounded-l-md sm:rounded-r-none hover:bg-gray-200 transition"
            >
              목록으로 돌아가기
            </button>

            {/* 🔹 일반 알림: 관련 페이지 이동 */}
            {!isRoundPaymentNotice && hasLink && (
                <button
                    onClick={handleNavigate}
                    className="flex-1 py-3 font-semibold text-white bg-gray-700
                         border border-gray-700 rounded-md sm:rounded-r-md sm:rounded-l-none
                         hover:bg-gray-800 transition"
                >
                  관련 페이지로 이동
                </button>
            )}

            {/* 🔹 회차 결제 알림 */}
            {isRoundPaymentNotice && (
                <button
                    onClick={handleQuickPay}
                    disabled={loading}
                    className={`flex-1 py-3 font-semibold text-white rounded-md sm:rounded-r-md sm:rounded-l-none 
                          transition border border-gray-900 ${
                        loading
                            ? "bg-gray-400 border-gray-300 cursor-not-allowed"
                            : "bg-gray-900 hover:bg-gray-800"
                    }`}
                >
                  {loading ? "결제 중..." : "회차 결제하기"}
                </button>
            )}
          </div>

          {/* 🔹 하단 안내문 */}
          {isDeliveryNotice && (
              <p className="text-sm text-gray-500 mt-3">
                배송 관련 안내입니다. 배송 상세 페이지에서 확인해주세요.
              </p>
          )}
          {isRefundNotice && (
              <p className="text-sm text-gray-500 mt-3">
                환불 관련 안내입니다. 결제 내역 페이지에서 환불 내역을 확인하세요.
              </p>
          )}
        </section>
      </div>
  );
}
