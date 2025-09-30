"use client";

import { useDispatch } from "react-redux";
import { closeModal } from "@/store/modalSlice";
import Button from "@/components/common/Button";
import StatusBadge from "@/components/common/StatusBadge";
import { useProcessRefundRequestMutation } from "@/api/refundRequestApi";
import { useState } from "react";
import dayjs from "dayjs";

export default function RefundProcessDialog({ request, onProcessed }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const mutation = useProcessRefundRequestMutation({
    onSuccess: () => {
      onProcessed?.(); // 목록 새로고침
      handleClose();
    },
    onError: (err) => {
      console.error("환불 처리 실패:", err);
      alert("환불 처리 중 오류가 발생했습니다.");
    },
  });

  if (!request) return null;

  const handleClose = () => dispatch(closeModal());

  const handleProcess = (status) => {
    setLoading(true);
    mutation.mutate({
      params: {
        id: request.refundRequestId,
        status,
        reasonCode: request.reasonCode,
      },
    });
    setLoading(false);
  };

  return (
      <div className="space-y-5">
        <h2 className="text-lg font-semibold">환불 요청 처리</h2>

        <div className="text-sm text-gray-600 space-y-2">
          <p><strong>환불요청ID:</strong> {request.refundRequestId ?? "-"}</p>
          <p><strong>결제ID:</strong> {request.paymentId ?? "-"}</p>
          <p><strong>상품명:</strong> {request.productName ?? "-"}</p>
          <p><strong>구분:</strong> {request.orderPlanType ?? "-"}</p>
          <p><strong>사유 코드:</strong> {request.reasonCode ?? "-"}</p>
          <p>
            <strong>상태:</strong>{" "}
            <StatusBadge type="RefundRequestStatus" status={request.status} />
          </p>
          <p>
            <strong>요청일:</strong>{" "}
            {request.regDate ? dayjs(request.regDate).format("YYYY-MM-DD HH:mm") : "-"}
          </p>
          <p>
            <strong>취소일:</strong>{" "}
            {request.voidDate ? dayjs(request.voidDate).format("YYYY-MM-DD HH:mm") : "-"}
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <Button
              variant="primary"
              disabled={loading}
              onClick={() => handleProcess("APPROVED")}
          >
            승인
          </Button>
          <Button
              variant="outline"
              disabled={loading}
              onClick={() => handleProcess("REJECTED")}
          >
            거절
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </div>
      </div>
  );
}
