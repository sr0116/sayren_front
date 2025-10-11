import {useCreateRefundRequestMutation} from "@/api/refundRequestApi";
import {useDispatch} from "react-redux";
import {useQueryClient} from "@tanstack/react-query";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Button from "@/components/common/Button";
import {openModal} from "@/store/modalSlice";
import {useRef, useState} from "react";
import {getEnumOptions} from "@/utils/enumOptions";
import RefundReasonForm from "@/components/refund/RefundReasonForm";

export default function RefundRequestButton({paymentId, paymentStatus, refundStatus,}) {

  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [selectedReason, setSelectedReason] = useState("USER_REQUEST");
  const reasonOptions = getEnumOptions("ReasonCode");

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
  // 환불 요청
  const handleRefund = () => {
    createRefundMutation.mutate({
      data: { paymentId, reasonCode: selectedReason },
    });
  };

  // 모달
  const reasonRef = useRef(null);

  const handleClick = () => {
    dispatch(
        openModal({
          content: (
              <ConfirmDialog
                  title="환불 요청"
                  message={<RefundReasonForm ref={reasonRef} />}
                  onConfirm={() => {
                    const selected = reasonRef.current?.getSelectedReason();
                    setSelectedReason(selected);
                    handleRefund();
                  }}
              />
          ),
        })
    );
  };


  // 버튼 상태 분기
  let disabled = false;
  let label = "환불 요청";
  let tooltip = "";

  if (createRefundMutation.isLoading) {
    disabled = true;
    label = "처리 중...";
  } else if (paymentStatus === "FAILED") {
    disabled = true;
    label = "결제 실패";
    tooltip = "결제 실패 건은 환불 요청이 불가능합니다";
  } else if (paymentStatus === "REFUNDED") {
    disabled = true;
    label = "환불 완료";
    tooltip = "이미 환불 처리된 건입니다";
  } else if (paymentStatus === "PARTIAL_REFUNDED") {
    disabled = true;
    label = "부분 환불됨";
    tooltip = "이미 부분 환불 처리된 건입니다";
  } else if (refundStatus === "PENDING") {
    disabled = true;
    label = "환불 요청됨";
    tooltip = "이미 환불 요청된 건입니다";
  } else if (refundStatus === "APPROVED") {
    disabled = true;
    label = "환불 승인됨";
  } else if (refundStatus === "REJECTED") {
    disabled = true;
    label = "환불 거절됨";
  } else if (refundStatus === "CANCELED") {
    disabled = true;
    label = "환불 취소됨";
  } else if (paymentStatus !== "PAID") {
    disabled = true;
    label = "환불 불가";
    tooltip = "결제 완료된 건만 환불 요청이 가능합니다";
  }

  return (
      <Button
          variant="primary"
          onClick={handleClick}
          disabled={disabled}
          className="mt-4"
          title={tooltip}
      >
        {label}
      </Button>
  );
}
