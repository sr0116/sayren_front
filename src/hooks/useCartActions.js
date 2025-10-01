"use client";

import { useRouter } from "next/navigation";
import { addCartItem } from "@/api/cartApi";

export function useCartActions() {
  const router = useRouter();

  // 장바구니 담기
  const add = async (product) => {
    try {
      await addCartItem({
        productId: product.productId,
        planId: product.planId ?? null, // 필요하면 요금제
        quantity: 1,
      });
      alert("장바구니에 담겼습니다 ");
      router.push("/order/cart"); // 장바구니 페이지로 이동
    } catch (err) {
      console.error("장바구니 담기 실패:", err);
      alert("장바구니 담기 실패 ");
    }
  };

  return { add };
}
