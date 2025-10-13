"use client";

import { useApiQuery } from "@/hooks/useApi";
import dayjs from "dayjs";
import RefundRequestButton from "@/components/refund/RefundRequestButton";
import StatusBadge from "@/components/common/StatusBadge";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function PaymentDetail({ paymentId }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: payment,
    isLoading,
    isError,
  } = useApiQuery(["payment", paymentId], `/api/user/payments/${paymentId}`, {
    refetchOnWindowFocus: true, // 창 포커스 시 자동 갱신
  });

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>결제 상세 조회 실패</div>;

  const isRental = payment.orderPlanType === "RENTAL";
  const hasRound = Boolean(payment.roundNo);

  const refreshPaymentStatus = async () => {
    await queryClient.invalidateQueries(["payment", paymentId]); // 결제 상세 새로고침
    await queryClient.invalidateQueries(["payments"]); // 전체 목록 갱신
    if (isRental) {
      await queryClient.invalidateQueries(["subscribeRounds"]); // 회차 결제 목록 갱신
    }
  };

  return (
      <div className="space-y-8 w-full max-w-[550px]">
        {/* 헤더 */}
        <header className="border-b border-gray-200 pb-3">
          <h2 className="text-lg font-bold text-gray-900">결제 상세 정보</h2>
          <p className="text-sm text-gray-500 mt-1">
            Payment ID: {payment.paymentId}
          </p>
        </header>

        {/* 결제 정보 */}
        <section className="space-y-3">
          <h3 className="text-base font-semibold text-gray-800">결제 정보</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">상품명</span>
              <span className="font-medium text-gray-900 text-right">
              {payment.productName}
            </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500">결제 유형</span>
              <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      isRental
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                  }`}
              >
              {isRental ? "구독 결제" : "일반 결제"}
            </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">결제 수단</span>
              <span className="text-gray-800 font-medium text-right">
              {payment.paymentType || "-"}
            </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">결제 금액</span>
              <span className="font-semibold text-gray-900 text-right">
              {payment.amount?.toLocaleString()}원
            </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">결제일</span>
              <span className="text-gray-800 text-right">
              {dayjs(payment.regDate).format("YYYY-MM-DD HH:mm")}
            </span>
            </div>

            {payment.receiptUrl && (
                <div className="flex justify-between">
                  <span className="text-gray-500">영수증</span>
                  <a
                      href={payment.receiptUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    영수증 보기
                  </a>
                </div>
            )}
          </div>
        </section>

        {/* 회차 결제 정보 */}
        {isRental && hasRound && (
            <section className="space-y-3">
              <h3 className="text-base font-semibold text-gray-800">
                회차 결제 정보
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">회차 번호</span>
                  <span className="text-gray-800">{payment.roundNo}회차</span>
                </div>
              </div>
            </section>
        )}

        {/* 결제 상태 */}
        <section className="space-y-3">
          <h3 className="text-base font-semibold text-gray-800">결제 상태</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">결제 상태</span>
            <StatusBadge type="PaymentStatus" value={payment.paymentStatus} />
          </div>

          {payment.refundStatus && (
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">환불 상태</span>
                <StatusBadge
                    type="RefundRequestStatus"
                    value={payment.refundStatus}
                />
              </div>
          )}
        </section>

        {/* 하단 액션 */}
        <section className="pt-3 border-t border-gray-200">
          {isRental ? (
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  이 결제는 구독(렌탈) 상품의 회차 결제입니다.
                </p>
                <button
                    onClick={() => router.push("/mypage/subscribe")}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
                >
                  구독 상세 보기
                </button>
              </div>
          ) : (
              <RefundRequestButton
                  paymentId={payment.paymentId}
                  paymentStatus={payment.paymentStatus}
                  refundStatus={payment.refundStatus}
                  onSuccess={refreshPaymentStatus}
              />
          )}
        </section>
      </div>
  );
}
