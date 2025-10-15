"use client";

import { useDispatch } from "react-redux";
import { openModal, closeModal } from "@/store/modalSlice";
import Button from "@/components/common/Button";
import StatusBadge from "@/components/common/StatusBadge";
import { useProcessRefundRequestMutation } from "@/api/refundRequestApi";
import { useState } from "react";
import dayjs from "dayjs";
import ConfirmDialog from "@/components/common/ConfirmDialog";

export default function RefundProcessDialog({ request, onProcessed }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  //  환불 요청 처리 (승인/거절)
  const mutation = useProcessRefundRequestMutation({
    onSuccess: (_, variables) => {
      const action = variables?.params?.status === "APPROVED" ? "승인" : "거절";
      //  처리 성공 시 확인 모달 표시
      dispatch(
          openModal({
            content: (
                <ConfirmDialog
                    title="처리 완료"
                    message={`환불 요청이 성공적으로 ${action}되었습니다.`}
                    hideCancel
                    confirmText="확인"
                />
            ),
          })
      );

      onProcessed?.(); // 목록 새로고침 콜백
      handleClose();
    },
    onError: (err) => {
      console.error("환불 처리 실패:", err);
      //  실패 시 경고 모달 표시
      dispatch(
          openModal({
            content: (
                <ConfirmDialog
                    title="처리 실패"
                    message="환불 처리 중 오류가 발생했습니다.\n잠시 후 다시 시도해주세요."
                    hideCancel
                    confirmText="닫기"
                />
            ),
          })
      );
      setLoading(false);
    },
  });

  if (!request) return null;

  const handleClose = () => dispatch(closeModal());

  //  이미 처리된 요청인지 판별
  const isProcessed =
      request.status === "APPROVED" || request.status === "REJECTED";

  //  승인 / 거절 처리
  const handleProcess = (status) => {
    if (loading || isProcessed) return; // 중복 클릭 방지
    setLoading(true);

    mutation.mutate({
      params: {
        id: request.refundRequestId,
        status,
        reasonCode: request.reasonCode || "USER_REQUEST",
      },
    });
  };

  return (
      <div className="space-y-5">
        <h2 className="text-lg font-semibold">환불 요청 처리</h2>

        <div className="text-sm text-gray-600 space-y-2">
          <p>
            <strong>환불요청ID:</strong> {request.refundRequestId ?? "-"}
          </p>
          <p>
            <strong>결제ID:</strong> {request.paymentId ?? "-"}
          </p>
          <p>
            <strong>상품명:</strong> {request.productName ?? "-"}
          </p>
          <p>
            <strong>구분:</strong> {request.orderPlanType ?? "-"}
          </p>
          <p>
            <strong>사유 코드:</strong> {request.reasonCode || "USER_REQUEST"}
          </p>
          <p>
            <strong>상태:</strong>{" "}
            <StatusBadge type="RefundRequestStatus" value={request.status} />
          </p>
          <p>
            <strong>요청일:</strong>{" "}
            {request.regDate
                ? dayjs(request.regDate).format("YYYY-MM-DD HH:mm")
                : "-"}
          </p>
          <p>
            <strong>취소일:</strong>{" "}
            {request.voidDate
                ? dayjs(request.voidDate).format("YYYY-MM-DD HH:mm")
                : "-"}
          </p>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="flex justify-end gap-3">
          <Button
              variant="primary"
              disabled={loading || isProcessed}
              onClick={() => handleProcess("APPROVED")}
          >
            승인
          </Button>
          <Button
              variant="outline"
              disabled={loading || isProcessed}
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
