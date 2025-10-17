"use client";

import Button from "@/components/common/Button";
import { useAddCartItemMutation } from "@/api/cartApi";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "@/store/modalSlice";
import { useRouter } from "next/navigation";
import React from "react";
import { queryClient } from "@/lib/queryClient";

export default function AddToCartButton({ productId, planId, check}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const addCartItemMutation = useAddCartItemMutation({
    onSuccess: (data) => {
      console.log(data);
      dispatch(openModal({
        content: (
          <div className="flex flex-col justify-center items-center gap-2">
            <p>장바구니에 상품을 담았습니다.</p>
            <div className="flex gap-2 w-full">
              <Button variant={"primary"} onClick={() => {
                router.push("/order/cart");
                dispatch(closeModal());
              }}>
                장바구니 이동
              </Button>
              <Button variant="secondary" onClick={() => dispatch(closeModal())}>
                쇼핑 계속하기
              </Button>
            </div>
          </div>
        )
      }));
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (err) => {
      console.error("장바구니 담기 실패:", err);
    }
  });

  const handleAdd = () => {
    if (!check) {
      alert("요금제를 선택해주세요!");
      return false;
    }
    addCartItemMutation.mutate({
      data: { productId, orderPlanId: planId },
    });
  };

  return (
    <Button
      className="bg-gray-800 text-white px-6 py-2 rounded"
      onClick={handleAdd}
    >
      장바구니 담기
    </Button>
  );
}
