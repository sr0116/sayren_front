"use client";

import dayjs from "dayjs";
import { useRefundRequestByIdQuery } from "@/api/RefundRequestApi";

export default function RefundRequestDetail({ refundRequestId }) {
  const {
    data: refundRequest,
    isLoading,
    isError,
  } = useRefundRequestByIdQuery(refundRequestId);

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>환불 요청 상세 조회 실패</div>;

  return (
      <div className="space-y-3">
        <h2 className="text-lg font-bold">환불 요청 상세</h2>
        <p>요청 ID: {refundRequest.refundRequestId}</p>
        <p>주문 아이템 ID: {refundRequest.orderItemId}</p>
        <p>상태: {refundRequest.status}</p>
        <p>사유 코드: {refundRequest.reasonCode}</p>
        <p>요청일: {dayjs(refundRequest.regDate).format("YYYY-MM-DD HH:mm")}</p>
        {refundRequest.voidDate && (
            <p>
              취소일: {dayjs(refundRequest.voidDate).format("YYYY-MM-DD HH:mm")}
            </p>
        )}
      </div>
  );
}
