"use client";

import { openModal } from "@/store/modalSlice";
import { useDispatch } from "react-redux";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Button from "@/components/common/Button";
import { useCreateRefundRequestMutation } from "@/api/refundRequestApi";

export default function RefundRequestButton({ paymentId, paymentStatus }) {
  const dispatch = useDispatch();
  const createRefundMutation = useCreateRefundRequestMutation({
    onSuccess: () => alert("환불 요청이 접수되었습니다."),
    onError: () => alert("환불 요청 실패"),
  });

  // 환불 요청 실행
  const handleRefund = () => {
    createRefundMutation.mutate({
      paymentId,
      reasonCode: "USER_REQUEST", // 기본값 (추후 선택 가능)
      description: "사용자 환불 요청",
    });
  };

  // 버튼 클릭 → ConfirmDialog 열기
  const handleClick = () => {
    dispatch(
        openModal({
          content: (
              <ConfirmDialog
                  title="환불 요청"
                  message="이 결제 건에 대해 환불을 요청하시겠습니까?"
                  onConfirm={handleRefund}
              />
          ),
        })
    );
  };

  return (
      <Button
          variant="primary"
          onClick={handleClick}
          disabled={paymentStatus !== "PAID" || createRefundMutation.isLoading}
          className="mt-4"
      >
        {createRefundMutation.isLoading ? "처리 중..." : "환불 요청"}
      </Button>
  );
}
