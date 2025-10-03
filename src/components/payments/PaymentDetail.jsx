"use client";

import { useApiQuery } from "@/hooks/useApi";
import dayjs from "dayjs";
import RefundRequestButton from "@/components/refund/RefundRequestButton";

export default function PaymentDetail({ paymentId }) {
  const { data: payment, isLoading, isError } = useApiQuery(
      ["paymentDetail", paymentId],
      `/api/user/payments/${paymentId}`
  );

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>결제 상세 조회 실패</div>;

  const isRental = payment.orderPlanType === "RENTAL";

  return (
      <div className="space-y-3">
        <h2 className="text-lg font-bold">결제 상세</h2>
        <p>결제 ID: {payment.paymentId}</p>
        <p>상품명: {payment.productName}</p>
        <p>주문 가격(스냅샷): {payment.priceSnapshot?.toLocaleString()}원</p>
        <p>결제 금액: {payment.amount?.toLocaleString()}원</p>
        <p>결제 수단: {payment.paymentType}</p>
        <p>상태: {payment.paymentStatus}</p>
        <p>결제일: {dayjs(payment.regDate).format("YYYY-MM-DD HH:mm")}</p>
        {payment.voidDate && (
            <p>취소일: {dayjs(payment.voidDate).format("YYYY-MM-DD HH:mm")}</p>
        )}
        {payment.receiptUrl && (
            <p>
              영수증:{" "}
              <a
                  href={payment.receiptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
              >
                확인하기
              </a>
            </p>
        )}

        {/* 환불 요청 버튼 or 안내 */}
        {isRental ? (
            <p className="text-sm text-gray-500">
              구독(렌탈) 결제는 환불 요청이 불가합니다. 구독 내역에서 확인 부탁드립니다.
            </p>
        ) : (
            <RefundRequestButton
                paymentId={payment.paymentId}
                paymentStatus={payment.paymentStatus}
                refundStatus={payment.refundStatus}
            />
        )}
      </div>
  );
}
