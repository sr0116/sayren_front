"use client";

import Button from "@/components/common/Button";
import {useFormInput} from "@/hooks/useFormInput";
import {useChangeDeliveryStatusMutation} from "@/api/deliveryApi";
import {useDispatch} from "react-redux";
import {closeModal, openModal} from "@/store/modalSlice";
import {queryClient} from "@/lib/queryClient";
import React from "react";

export default function DeliveryStatusChangeButton({deliveryId, status}) {
  const dispatch = useDispatch();
  const changeDeliveryStatusMutation = useChangeDeliveryStatusMutation({
    onSuccess: () => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-2">
          <p>상태변경에 성공했습니다.</p>
            <Button variant={"primary"} onClick={() => {
              dispatch(closeModal());
            }}>
              확인
            </Button>
        </div>)}
      ));
      queryClient.invalidateQueries(["delivery-list"]);
    },
    onError: () => {
      dispatch(openModal({
        content: (<div className="flex flex-col justify-center items-center gap-2">
          <p>상태변경에 실패했습니다.</p>
            <Button
              variant="secondary"
              onClick={() => dispatch(closeModal())}
            >
              확인
            </Button>
        </div>)}
      ));
    }
  })
  
  const handleClick = (e) => {
    e.preventDefault();
    changeDeliveryStatusMutation.mutate({
      data: {deliveryId, status}
    })
  }
  
  return (
    <Button onClick={handleClick} variant="primary" type="button" disabled={status === "RETURNED"}>
      상태 변경
    </Button>
  )
}