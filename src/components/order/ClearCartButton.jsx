"use client";

import Button from "@/components/common/Button";
import {useClearCartMutation} from "@/api/cartApi";
import {useDispatch} from "react-redux";
import {closeModal, openModal} from "@/store/modalSlice";
import React from "react";

export default function ClearCartButton() {

  const dispatch = useDispatch();
  const clearCartMutation = useClearCartMutation({
    onSuccess:() => {
      dispatch(openModal({
        content: (
          <div className="flex flex-col justify-center items-center gap-4">
          <p>장바구니에 상품을 비웠습니다.</p>
            <Button variant={"primary"} onClick={() => {
              dispatch(closeModal());
            }}>
              확인
            </Button>
          </div>
        )
      }))
    },
    onError: () => {
      dispatch(openModal({
        content: (
          <div className="flex flex-col justify-center items-center gap-4">
            <p>장바구니에 상품을 비우는데 실패했습니다.</p>
            <p>잠시후 다시 시도해주세요.</p>
            <Button variant={"primary"} onClick={() => {
              dispatch(closeModal());
            }}>
              확인
            </Button>
          </div>
        )
      }))
    }
  });

  const handleClearCart = (e) => {
    e.preventDefault();
    clearCartMutation.mutate();
  }

  return (
    <Button
      className="bg-red-500 text-white px-4 py-2 rounded"
      onClick={handleClearCart}
      variant="primary"
    >
      장바구니 비우기
    </Button>
  )
}