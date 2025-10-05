"use client";

import { useApiQuery } from "@/hooks/useApi";
import dayjs from "dayjs";
import RefundRequestButton from "@/components/refund/RefundRequestButton";
import StatusBadge from "@/components/common/StatusBadge";
import { useRouter } from "next/navigation";

export default function PaymentDetail({ paymentId }) {
  const router = useRouter();

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
        <p>결제 금액: {payment.amount?.toLocaleString()}원</p>
        <p>결제 수단: {payment.paymentType}</p>
        <p>
          상태: <StatusBadge type="PaymentStatus" value={payment.paymentStatus} />
        </p>
        {payment.refundStatus && (
            <p>
              환불 상태:{" "}
              <StatusBadge
                  type="RefundRequestStatus"
                  value={payment.refundStatus}
              />
            </p>
        )}
        <p>결제일: {dayjs(payment.regDate).format("YYYY-MM-DD HH:mm")}</p>

        {payment.receiptUrl && (
            <p>
              <a
                  href={payment.receiptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
              >
                영수증 확인
              </a>
            </p>
        )}

        {isRental ? (
            <div className="text-sm text-gray-600 space-y-2">
              <p>이 결제는 구독(렌탈) 상품입니다.</p>
              <button
                  onClick={() => router.push("/mypage/subscribe")}
                  className="text-blue-600 underline hover:text-blue-800"
              >
                구독 상세 보기
              </button>
            </div>
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
