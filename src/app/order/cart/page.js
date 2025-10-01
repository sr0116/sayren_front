"use client";

import { useCartItemsQuery } from "@/api/cartApi";
import ClearCartButton from "@/components/order/ClearCartButton";

export default function CartPage() {
  // 장바구니 데이터 불러오기
  const { data: items = [], isLoading, isError } = useCartItemsQuery();

  if (isLoading) {
    return <p className="text-gray-500">장바구니 불러오는 중...</p>;
  }

  if (isError) {
    return <p className="text-red-500">장바구니 조회 실패. 다시 시도해주세요.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">내 장바구니</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">장바구니가 비어 있습니다.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.cartItemId}
              className="flex justify-between border-b pb-2"
            >
              <span>{item.productName ?? "상품명 없음"}</span>
              <span>{item.price ? `${item.price.toLocaleString()}원` : "가격 없음"}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex gap-3">
        <ClearCartButton />
      </div>
    </div>
  );
}
