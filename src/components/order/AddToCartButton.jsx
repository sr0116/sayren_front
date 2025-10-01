"use client";

import { addCartItem } from "@/api/cartApi";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddToCartButton({ product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      await addCartItem({
        productId: product.productId,
        planId: product.planId ?? null,
        quantity: 1,
      });
      alert("장바구니에 담겼습니다 ");
      router.push("/order/cart"); // 장바구니 페이지 이동
    } catch (err) {
      console.error("장바구니 담기 실패:", err);
      alert("에러 발생!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="bg-gray-800 text-white px-6 py-2 rounded"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? "담는 중..." : "장바구니 담기"}
    </Button>
  );
}
