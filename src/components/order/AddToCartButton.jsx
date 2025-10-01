"use client";

import Button from "@/components/common/Button";
import { useAddCartItemMutation } from "@/api/cartApi";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "@/store/modalSlice";
import { useRouter } from "next/navigation";

export default function AddToCartButton({ productId, planId }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const addCartItemMutation = useAddCartItemMutation({
    onSuccess: () => {
      dispatch(openModal({
        content: (
          <div className="flex flex-col justify-center items-center gap-4">
            <p>장바구니에 상품을 담았습니다.</p>
            <div className="flex gap-2">
              <Button
                variant="primary"
                onClick={() => {
                  dispatch(closeModal());
                  router.push("/order/cart"); //  장바구니 페이지 이동
                }}
              >
                장바구니 확인하기
              </Button>
              <Button
                variant="secondary"
                onClick={() => dispatch(closeModal())}
              >
                쇼핑 계속하기
              </Button>
            </div>
          </div>
        )
      }));
    },
    onError: (err) => {
      console.error("장바구니 담기 실패:", err);
    }
  });

  const handleAdd = () => {
    // 여기서 반드시 data 키 안에 body 넣기
    addCartItemMutation.mutate({
      data: { productId, planId }
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
