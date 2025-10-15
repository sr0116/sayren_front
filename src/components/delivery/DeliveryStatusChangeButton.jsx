"use client";

import Button from "@/components/common/Button";
import { useChangedDeliveryStatusMutation } from "@/api/deliveryApi";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "@/store/modalSlice";
import { queryClient } from "@/lib/queryClient";
import React from "react";

//  상태 전환 단계 정의
const nextStatusMap = {
  READY: "SHIPPING",
  SHIPPING: "DELIVERED",
  DELIVERED: "RETURNED",
};

export default function DeliveryStatusChangeButton({ deliveryId, status }) {
  const dispatch = useDispatch();

  // React Query Mutation 훅
  const changeDeliveryStatusMutation = useChangedDeliveryStatusMutation({
    onSuccess: () => {
      dispatch(
          openModal({
            content: (
                <div className="flex flex-col justify-center items-center gap-2">
                  <p>상태 변경에 성공했습니다.</p>
                  <Button
                      variant="primary"
                      onClick={() => {
                        dispatch(closeModal());
                      }}
                  >
                    확인
                  </Button>
                </div>
            ),
          })
      );
      // ✅ 리스트 새로고침
      queryClient.invalidateQueries(["delivery-list"]);
    },
    onError: (error) => {
      console.error("상태 변경 실패:", error);
      dispatch(
          openModal({
            content: (
                <div className="flex flex-col justify-center items-center gap-2">
                  <p>상태 변경에 실패했습니다.</p>
                  <Button
                      variant="secondary"
                      onClick={() => dispatch(closeModal())}
                  >
                    확인
                  </Button>
                </div>
            ),
          })
      );
    },
  });

  // ✅ 클릭 시 다음 상태 계산 후 API 호출
  const handleClick = (e) => {
    e.preventDefault();
    const nextStatus = nextStatusMap[status];
    if (!nextStatus) {
      dispatch(
          openModal({
            content: (
                <div className="flex flex-col justify-center items-center gap-2">
                  <p>더 이상 상태를 변경할 수 없습니다.</p>
                  <Button
                      variant="secondary"
                      onClick={() => dispatch(closeModal())}
                  >
                    확인
                  </Button>
                </div>
            ),
          })
      );
      return;
    }

    changeDeliveryStatusMutation.mutate({
      data: { deliveryId, status: nextStatus },
    });
  };

  return (
      <Button
          onClick={handleClick}
          variant="primary"
          type="button"
          disabled={status === "RETURNED"} // 이미 최종 상태면 비활성화
      >
        상태 변경
      </Button>
  );
}
