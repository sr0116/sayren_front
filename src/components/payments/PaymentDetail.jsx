"use client";

import { useApiQuery } from "@/hooks/useApi";
import dayjs from "dayjs";
import RefundRequestButton from "@/components/refund/RefundRequestButton";
import StatusBadge from "@/components/common/StatusBadge";
import EmptyState from "@/components/common/EmptyState";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

export default function PaymentDetail({ paymentId }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: payment,
    isLoading,
    isError,
  } = useApiQuery(["payment", paymentId], `/api/user/payments/${paymentId}`, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError)
    return (
        <EmptyState
            title="결제 상세 조회 실패"
            message="일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        />
    );

  const isRental = payment.orderPlanType === "RENTAL";

  const refreshPaymentStatus = async () => {
    await queryClient.invalidateQueries(["payment", paymentId]);
    await queryClient.invalidateQueries(["payments"]);
  };

  return (
      <div className="w-full max-w-[550px] space-y-10">
        {/* 헤더 */}
        <header className="border-b border-gray-200 pb-4">
          <h2 className="text-lg font-bold text-gray-900">결제 상세 정보</h2>
          <p className="text-sm text-gray-500 mt-1">
            주문번호 #{payment.orderItemId ?? "-"}
          </p>
        </header>

        {/* 상품 정보 */}
        <section className="space-y-4">
          <h3 className="text-base font-semibold text-gray-800">주문 상품</h3>

          <div className="flex items-start gap-4">
            <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
              <Image
                  src={payment.productThumbnail || "/image/image2.svg"}
                  alt={payment.productName || "상품 이미지"}
                  fill
                  sizes="96px"
                  className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-medium text-gray-900">{payment.productName}</p>
              <p className="text-sm text-gray-500 mt-1">
                {isRental ? "렌탈 구독 결제" : "일시 결제"}
              </p>
              <p className="font-semibold text-gray-900 mt-2">
                {payment.amount?.toLocaleString()}원
              </p>
            </div>
          </div>
        </section>

        {/* 결제 정보 */}
        <section className="space-y-4">
          <h3 className="text-base font-semibold text-gray-800">결제 정보</h3>


          <div className="space-y-2 text-sm">
            {/* 구독 정보 (렌탈만) */}
            {isRental && (
                <div className="flex justify-between">
                  <span className="text-gray-500">회차 번호</span>
                  <span className="text-gray-900">{payment.roundNo || "-"} 회차</span>
                </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">결제 금액</span>
              <span className="font-semibold text-gray-900">
              {payment.amount?.toLocaleString()}원
            </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">결제 수단</span>
              <span className="text-gray-900">
              {payment.paymentType ?? "카드 결제"}
            </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">결제 상태</span>
              <StatusBadge
                  type="PaymentStatus"
                  value={payment.paymentStatus || "PENDING"}
              />
            </div>

            {payment.refundStatus && (
                <div className="flex justify-between">
                  <span className="text-gray-500">환불 상태</span>
                  <StatusBadge
                      type="RefundRequestStatus"
                      value={payment.refundStatus}
                  />
                </div>
            )}

            <div className="flex justify-between">
              <span className="text-gray-500">결제일</span>
              <span className="text-gray-900">
              {dayjs(payment.paidDate || payment.regDate).format(
                  "YYYY-MM-DD HH:mm"
              )}
            </span>
            </div>

            {payment.receiptUrl && (
                <div className="flex justify-between">
                  <span className="text-gray-500">영수증</span>
                  <a
                      href={payment.receiptUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    영수증 보기
                  </a>
                </div>
            )}
          </div>
        </section>

        {/* 주문자 정보 */}
        <section className="space-y-4">
          <h3 className="text-base font-semibold text-gray-800">주문자 정보</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">주문자명</span>
              <span className="text-gray-900 font-medium">
              {payment.buyerName || payment.member?.name || "-"}
            </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">이메일</span>
              <span className="text-gray-900">
              {payment.buyerEmail || payment.member?.email || "-"}
            </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">전화번호</span>
              <span className="text-gray-900">
              {payment.buyerTel || payment.member?.tel || "-"}
            </span>
            </div>
          </div>
        </section>

        {/* 하단 액션 */}
        <section className="pt-4 border-t border-gray-200">
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
