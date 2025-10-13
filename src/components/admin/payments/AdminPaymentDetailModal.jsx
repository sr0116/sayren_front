"use client";

import { usePaymentByIdQuery } from "@/api/paymentApi";
import dayjs from "dayjs";
import StatusBadge from "@/components/common/StatusBadge";

export default function AdminPaymentDetailModal({ paymentId }) {
  const { data: payment, isLoading, isError } = usePaymentByIdQuery(paymentId);

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>결제 상세 조회 실패</div>;

  const isRental = payment.orderPlanType === "RENTAL";
  const hasRound = Boolean(payment.roundNo);

  return (
      <div className="space-y-8 w-full max-w-[650px]">
        {/* 헤더 */}
        <header className="border-b border-gray-200 pb-3">
          <h2 className="text-lg font-bold text-gray-900">결제 상세 (관리자용)</h2>
          <p className="text-sm text-gray-500 mt-1">
            Payment ID: {payment.paymentId}
          </p>
          {payment.buyerName && (
              <p className="text-sm text-gray-500">
                {payment.buyerName} ({payment.buyerEmail || "이메일 없음"})
              </p>
          )}
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
          </div>
        </section>

        {/* 구독 / 회차 결제 정보 */}
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

                {payment.paidDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">결제 완료일</span>
                      <span className="text-gray-800">
                  {dayjs(payment.paidDate).format("YYYY-MM-DD HH:mm")}
                </span>
                    </div>
                )}

                {payment.dueDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">납부 예정일</span>
                      <span className="text-gray-800">
                  {dayjs(payment.dueDate).format("YYYY-MM-DD")}
                </span>
                    </div>
                )}
              </div>
            </section>
        )}

        {/* 회원 정보 */}
        <section className="space-y-3">
          <h3 className="text-base font-semibold text-gray-800">회원 정보</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">회원명</span>
              <span className="text-gray-800">{payment.buyerName || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">이메일</span>
              <span className="text-gray-800">{payment.buyerEmail || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">전화번호</span>
              <span className="text-gray-800">{payment.buyerTel || "-"}</span>
            </div>
          </div>
        </section>

        {/* 환불 정보 */}
        {payment.refundStatus && (
            <section className="space-y-3">
              <h3 className="text-base font-semibold text-gray-800">환불 정보</h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">환불 상태</span>
                <StatusBadge
                    type="RefundRequestStatus"
                    value={payment.refundStatus}
                />
              </div>
            </section>
        )}

        {/* PG 정보 */}
        <section className="space-y-3 border-t border-gray-200  pt-3">
          <h3 className="text-base font-semibold text-gray-800">PG 결제 정보</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Merchant UID</span>
              <span className="text-gray-800 break-all">
              {payment.merchantUid || "-"}
            </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">IMP UID</span>
              <span className="text-gray-800 break-all">
              {payment.impUid || "-"}
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
      </div>
  );
}
