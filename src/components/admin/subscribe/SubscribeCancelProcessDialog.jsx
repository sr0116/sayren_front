"use client";

import { useDispatch } from "react-redux";
import { openModal, closeModal } from "@/store/modalSlice";
import Button from "@/components/common/Button";
import StatusBadge from "@/components/common/StatusBadge";
import { useProcessSubscribeCancelMutation } from "@/api/subscribeApi";
import { useState } from "react";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import dayjs from "dayjs";

export default function SubscribeCancelProcessDialog({ request, onProcessed }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // 구독 취소 요청 처리
  const mutation = useProcessSubscribeCancelMutation({
    onSuccess: (_, variables) => {
      const action = variables?.params?.status === "APPROVED" ? "승인" : "거절";
      dispatch(
          openModal({
            content: (
                <ConfirmDialog
                    title="처리 완료"
                    message={`구독 취소 요청이 성공적으로 ${action}되었습니다.`}
                    hideCancel
                    confirmText="확인"
                />
            ),
          })
      );

      onProcessed?.();
      handleClose();
    },
    onError: (err) => {
      console.error("구독 취소 처리 실패:", err);
      dispatch(
          openModal({
            content: (
                <ConfirmDialog
                    title="처리 실패"
                    message="구독 취소 처리 중 오류가 발생했습니다.\n잠시 후 다시 시도해주세요."
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

  const isProcessed =
      request.status === "APPROVED" || request.status === "REJECTED";

  // 승인 / 거절 처리
  const handleProcess = (status) => {
    if (loading || isProcessed) return;
    setLoading(true);

    mutation.mutate({
      params: {
        id: request.subscribeId,
        status,
        reasonCode:
            status === "APPROVED" ? "CONTRACT_CANCEL" : "CANCEL_REJECTED",
      },
    });
  };

  return (
      <div className="space-y-5">
        <h2 className="text-lg font-semibold">구독 취소 요청 처리</h2>

        <div className="text-sm text-gray-600 space-y-2">
          <p>
            <strong>구독 ID:</strong> {request.subscribeId ?? "-"}
          </p>
          <p>
            <strong>주문 ID:</strong> {request.orderItemId ?? "-"}
          </p>
          <p>
            <strong>상품명:</strong> {request.productName ?? "-"}
          </p>
          <p>
            <strong>상태:</strong>{" "}
            <StatusBadge type="SubscribeStatus" value={request.status} />
          </p>
          <p>
            <strong>요청일:</strong>{" "}
            {request.regDate
                ? dayjs(request.regDate).format("YYYY-MM-DD HH:mm")
                : "-"}
          </p>
        </div>

        {/* 하단 버튼 */}
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
