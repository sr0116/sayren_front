"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/modalSlice";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useNotificationDetailQuery } from "@/api/notificationApi";
import { prepareRoundPayment, completePayment } from "@/api/paymentApi";
import { queryClient } from "@/lib/queryClient";
import { api } from "@/lib/axios";
import dayjs from "dayjs";
import StatusBadge from "@/components/common/StatusBadge";

export default function NotificationDetail() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [roundId, setRoundId] = useState(null);

  // PortOne SDK 로드
  useEffect(() => {
    if (!window.IMP) {
      const script = document.createElement("script");
      script.src = "https://cdn.iamport.kr/v1/iamport.js";
      script.async = true;
      script.onload = () => console.log("PortOne SDK 로드 완료");
      document.body.appendChild(script);
    }
  }, []);

  // 알림 상세 조회
  const { data: notification, isLoading, isError } =
      useNotificationDetailQuery(id);

  // 회차 결제 상태 확인
  useEffect(() => {
    const fetchRoundStatus = async () => {
      if (!notification?.linkUrl) return;

      const match = notification.linkUrl.match(/\/round\/(\d+)/);
      if (!match) return;

      const idFromUrl = parseInt(match[1], 10);
      setRoundId(idFromUrl);

      try {
        const res = await api.get(`/api/user/subscribe/round/${idFromUrl}`);
        if (res?.data?.payStatus === "PAID") {
          setIsPaid(true);
        }
      } catch (e) {
        console.warn("회차 상태 확인 실패:", e);
      }
    };

    fetchRoundStatus();
  }, [notification]);

  if (isLoading)
    return <div className="text-center py-10 text-gray-500">불러오는 중...</div>;
  if (isError || !notification)
    return (
        <div className="text-center py-10 text-gray-500">
          알림 정보를 불러올 수 없습니다.
        </div>
    );

  const isRoundPaymentNotice = notification.type === "SUBSCRIBE_ROUND";

  // PortOne 결제 함수 (Promise wrapper)
  const requestPay = (IMP, paymentData, notificationTitle) => {
    return new Promise((resolve, reject) => {
      IMP.request_pay(
          {
            pg: "nice_v2",
            pay_method: "card",
            merchant_uid: paymentData.merchantUid,
            name: notificationTitle,
            amount: paymentData.amount,
          },
          (rsp) => {
            if (!rsp.imp_uid) reject(new Error("결제가 취소되었거나 실패했습니다."));
            else resolve(rsp);
          }
      );
    });
  };

  // 회차 결제 처리
  const handleQuickPay = async () => {
    if (!roundId) {
      dispatch(
          openModal({
            content: (
                <ConfirmDialog
                    title="오류"
                    message="회차 정보를 찾을 수 없습니다."
                    hideCancel={true}
                />
            ),
          })
      );
      return;
    }

    try {
      setLoading(true);
      const paymentData = await prepareRoundPayment(roundId);
      const IMP = window.IMP;
      if (!IMP) throw new Error("PortOne SDK가 아직 로드되지 않았습니다.");

      IMP.init(process.env.NEXT_PUBLIC_IMP_CODE);
      const rsp = await requestPay(IMP, paymentData, notification.title);

      // 결제 완료 검증
      const result = await completePayment({
        paymentId: paymentData.paymentId,
        impUid: rsp.imp_uid,
      });

      if (result.paymentStatus === "PAID") {
        dispatch(
            openModal({
              content: (
                  <ConfirmDialog
                      title="결제 완료"
                      message="결제가 완료되었습니다."
                      hideCancel={true}
                  />
              ),
            })
        );

        // 상태 재확인
        const roundRes = await api.get(`/api/user/subscribe/round/${roundId}`);
        if (roundRes?.data?.payStatus === "PAID") {
          setIsPaid(true);
          queryClient.invalidateQueries(["myNotifications"]);

          const subscribeId =
              roundRes.data.subscribeId || notification.subscribeId;
          router.push(`/mypage/subscribe/${subscribeId}/rounds`);
        }
      } else {
        dispatch(
            openModal({
              content: (
                  <ConfirmDialog
                      title="결제 실패"
                      message="결제 실패 또는 취소되었습니다."
                      hideCancel={true}
                  />
              ),
            })
        );
      }
    } catch (err) {
      // 이미 결제된 회차 예외
      if (
          err?.response?.status === 409 ||
          err?.response?.data?.code === "ALREADY_PAID_SUBSCRIBE_ROUND" ||
          err?.response?.data?.message?.includes("이미 결제된")
      ) {
        dispatch(
            openModal({
              content: (
                  <ConfirmDialog
                      title="이미 결제된 회차"
                      message="이 회차는 이미 결제 완료된 상태입니다."
                      hideCancel={true}
                  />
              ),
            })
        );
      } else {
        console.error("결제 중 오류:", err);
        dispatch(
            openModal({
              content: (
                  <ConfirmDialog
                      title="결제 오류"
                      message="결제 처리 중 오류가 발생했습니다."
                      hideCancel={true}
                  />
              ),
            })
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // 관련 페이지 이동
  const handleNavigate = () => {
    if (notification.linkUrl) router.push(notification.linkUrl);
    else router.push("/mypage/notification");
  };

  return (
      <div className="max-w-2xl mx-auto p-6 bg-white border border-gray-200 rounded-xl shadow-sm space-y-8">
        <header className="border-b border-gray-200 pb-3">
          <h2 className="text-xl font-semibold text-gray-900">
            {notification.title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            등록일: {dayjs(notification.regDate).format("YYYY-MM-DD HH:mm")}
          </p>
          <div className="mt-2">
            <StatusBadge type="NotificationType" value={notification.type} />
          </div>
        </header>

        <section>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {notification.message}
          </p>
        </section>

        <section className="border-t border-gray-200 pt-5">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 w-full">
            <button
                onClick={() => router.push("/mypage/notification")}
                className="flex-1 py-3 font-semibold text-gray-800 bg-gray-100 border border-gray-300
             rounded-md sm:rounded-l-md sm:rounded-r-none hover:bg-gray-200 transition"
            >
              목록으로 돌아가기
            </button>

            {isRoundPaymentNotice && (
                <button
                    onClick={isPaid ? undefined : handleQuickPay}
                    disabled={loading || isPaid}
                    className={`flex-1 py-3 font-semibold text-white rounded-md sm:rounded-r-md sm:rounded-l-none 
              transition border ${
                        loading
                            ? "bg-gray-400 border-gray-300 cursor-not-allowed"
                            : isPaid
                                ? "bg-green-600 border-green-600 hover:bg-green-700"
                                : "bg-gray-900 border-gray-900 hover:bg-gray-800"
                    }`}
                >
                  {loading
                      ? "결제 중..."
                      : isPaid
                          ? "결제 완료됨"
                          : "회차 결제하기"}
                </button>
            )}

            {!isRoundPaymentNotice && (
                <button
                    onClick={handleNavigate}
                    className="flex-1 py-3 font-semibold text-white bg-gray-700
               border border-gray-700 rounded-md sm:rounded-r-md sm:rounded-l-none
               hover:bg-gray-800 transition"
                >
                  관련 페이지로 이동
                </button>
            )}
          </div>
        </section>
      </div>
  );
}
