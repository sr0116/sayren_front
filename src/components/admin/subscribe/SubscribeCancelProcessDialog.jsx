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
  const [selectedStatus, setSelectedStatus] = useState("APPROVED");
  const [selectedReason, setSelectedReason] = useState("CONTRACT_CANCEL");

  const mutation = useProcessSubscribeCancelMutation({
    onSuccess: (_, variables) => {
      const actionLabel =
          variables.status === "APPROVED"
              ? "승인"
              : variables.status === "REJECTED"
                  ? "거절"
                  : "강제 종료";

      dispatch(
          openModal({
            content: (
                <ConfirmDialog
                    title="처리 완료"
                    message={`구독 요청이 성공적으로 ${actionLabel}되었습니다.`}
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
      console.error("구독 요청 처리 실패:", err);
      dispatch(
          openModal({
            content: (
                <ConfirmDialog
                    title="처리 실패"
                    message="요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
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

  const handleProcess = () => {
    if (loading || isProcessed) return;
    setLoading(true);

    const reasonMap = {
      APPROVED: selectedReason,
      REJECTED: "CANCEL_REJECTED",
      ADMIN_FORCE_END: "ADMIN_FORCE_END",
    };

    const payload = {
      id: request.subscribeId,
      status: selectedStatus,
      reasonCode: reasonMap[selectedStatus],
    };

    console.log("요청 데이터:", payload);
    mutation.mutate(payload);
  };

  return (
      <div className="space-y-6 w-full max-w-[500px]">
        <h2 className="text-lg font-semibold">구독 요청 처리</h2>

        {/* 기본 정보 */}
        <div className="text-sm text-gray-700 space-y-1">
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

        {/* 처리 옵션 */}
        <div className="space-y-3">
          <label className="block text-sm font-medium">처리 옵션</label>
          <select
              className="border rounded-md px-2 py-1 w-full"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="APPROVED">승인</option>
            <option value="REJECTED">거절</option>
            <option value="ADMIN_FORCE_END">강제 종료</option>
          </select>

          {/* 승인 시에만 사유 선택 */}
          {selectedStatus === "APPROVED" && (
              <>
                <label className="block text-sm font-medium mt-2">사유 선택</label>
                <select
                    className="border rounded-md px-2 py-1 w-full"
                    value={selectedReason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                >
                  <option value="CONTRACT_CANCEL">구독 취소 승인</option>
                  <option value="EXPIRED">계약 만료 승인</option>
                  <option value="PRODUCT_DEFECT">상품 불량</option>
                  <option value="DELIVERY_ISSUE">배송 문제</option>
                  <option value="USER_REQUEST">단순 변심</option>
                </select>
              </>
          )}
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-3">
          <Button
              variant="primary"
              disabled={loading || isProcessed}
              onClick={handleProcess}
          >
            처리하기
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </div>
      </div>
  );
}
