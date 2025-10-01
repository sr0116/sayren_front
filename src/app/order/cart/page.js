"use client";

import { useEffect, useState } from "react";
import { getCartItems, clearCart } from "@/api/cartApi";
import Button from "@/components/common/Button";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 장바구니 목록 조회
  useEffect(() => {
    async function fetchCart() {
      try {
        const data = await getCartItems();
        setItems(data);
      } catch (err) {
        console.error("장바구니 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, []);

  // 전체 비우기
  const handleClear = async () => {
    try {
      await clearCart();
      setItems([]);
      alert("장바구니를 비웠습니다 ");
    } catch (err) {
      console.error("장바구니 비우기 실패:", err);
    }
  };

  if (loading) return <p>불러오는 중...</p>;

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6"> 장바구니</h1>
        <p className="text-gray-500">장바구니가 비어 있습니다.</p>
      </div>
    );
  }

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🛒 장바구니</h1>

      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between border-b pb-3">
            <div>
              <p className="font-medium">{item.product.name}</p>
              <p className="text-sm text-gray-500">x {item.quantity}</p>
            </div>
            <p>{(item.product.price * item.quantity).toLocaleString()}원</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-lg font-bold">총 금액: {total.toLocaleString()}원</p>
        <div className="flex gap-3">
          <Button className="bg-gray-600 text-white" onClick={handleClear}>
            전체 비우기
          </Button>
          <Button className="bg-[#ff0066] text-white">주문하기</Button>
        </div>
      </div>
    </div>
  );
}
