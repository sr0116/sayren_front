"use client";

import { useCreateRefundRequestMutation } from "@/api/refundRequestApi";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Button from "@/components/common/Button";
import { openModal } from "@/store/modalSlice";
import { useRef } from "react";
import RefundReasonForm from "@/components/refund/RefundReasonForm";

export default function RefundRequestButton({
                                              paymentId,
                                              paymentStatus,
                                              refundStatus,
                                            }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const reasonRef = useRef(null);

  const createRefundMutation = useCreateRefundRequestMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentDetail", paymentId] });
      queryClient.invalidateQueries({ queryKey: ["payments"] });

      dispatch(
          openModal({
            content: (
                <ConfirmDialog
                    title="환불 요청 완료"
                    message={
                      <>
                        환불 요청이 접수되었습니다.
                        <br />
                        신속히 확인 후 상담사가 고객님께 연락드려 진행 절차를 안내해드리겠습니다.
                        <br />
                        추가 문의가 필요하시면 고객센터를 통해서도 언제든지 문의 가능합니다.
                      </>
                    }
                    hideCancel={true}
                />
            ),
          })
      );
    },
  });

  // 환불 요청 실행
  const handleRefund = () => {
    const selectedReason = reasonRef.current?.getSelectedReason();
    if (!selectedReason) return alert("환불 사유를 선택해주세요.");

    createRefundMutation.mutate({
      data: { paymentId, reasonCode: selectedReason },
    });
  };

  // 클릭 시 바로 환불 사유 모달 오픈
  const handleClick = () => {
    dispatch(
        openModal({
          content: (
              <ConfirmDialog
                  title="환불 요청"
                  message={<RefundReasonForm ref={reasonRef} />}
                  onConfirm={handleRefund}
              />
          ),
        })
    );
  };

  // 버튼 상태
  let disabled = false;
  let label = "환불 요청";

  if (createRefundMutation.isLoading) {
    disabled = true;
    label = "처리 중...";
  } else if (["FAILED", "REFUNDED", "PARTIAL_REFUNDED"].includes(paymentStatus)) {
    disabled = true;
    label = "환불 불가";
  } else if (["PENDING", "APPROVED", "REJECTED", "CANCELED"].includes(refundStatus)) {
    disabled = true;
    label = "요청 불가";
  }

  return (
      <Button
          variant="primary"
          onClick={handleClick}
          disabled={disabled}
          className="mt-4"
      >
        {label}
      </Button>
  );
}
