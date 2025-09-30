"use client";

import { openModal } from "@/store/modalSlice";
import { useDispatch } from "react-redux";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Button from "@/components/common/Button";
import { useCreateRefundRequestMutation } from "@/api/refundRequestApi";
import { useQueryClient } from "@tanstack/react-query";

export default function RefundRequestButton({
                                              paymentId,
                                              paymentStatus,
                                              refundRequested,
                                            }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const createRefundMutation = useCreateRefundRequestMutation({
    onSuccess: () => {
      //  쿼리 키 정확히 일치
      queryClient.invalidateQueries({ queryKey: ["paymentDetail", paymentId] });
      queryClient.invalidateQueries({ queryKey: ["payments"] });

      dispatch(
          openModal({
            content: (
                <ConfirmDialog
                    title="환불 요청 완료"
                    message={
                      <>
                        환불 요청이 접수되었습니다.<br />
                        신속히 확인 후 상담사가 고객님께 연락드려 진행 절차를 안내해드리겠습니다.<br />
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

  // 실제 환불 요청 실행
  const handleRefund = () => {
    createRefundMutation.mutate({
      paymentId,
      reasonCode: "USER_REQUEST",
    });
  };

  // 버튼 클릭 시 → 확인 모달 먼저 띄우기
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
          disabled={
              refundRequested || paymentStatus !== "PAID" || createRefundMutation.isLoading
          }
          className="mt-4"
          title={
            refundRequested
                ? "이미 환불 요청된 건입니다"
                : paymentStatus !== "PAID"
                    ? "결제 완료된 건만 환불 요청이 가능합니다"
                    : ""
          }
      >
        {refundRequested
            ? "환불 요청됨"
            : createRefundMutation.isLoading
                ? "처리 중..."
                : "환불 요청"}
      </Button>
  );
}
