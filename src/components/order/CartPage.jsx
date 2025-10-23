"use client";

import Button from "@/components/common/Button";

export default function CartPage({ items, onClear }) {
  if (!items || items.length === 0) {
    return <p className="text-gray-500">장바구니가 비어 있습니다.</p>;
  }

  const total = items.reduce(
    (sum, item) => sum + (item.productPrice ?? item.product.price) * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6"> 장바구니</h1>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between border-b pb-3">
            <div>
              <p className="font-medium">{item.productName ?? item.product?.name}</p>
              <p className="text-sm text-gray-500">x {item.quantity}</p>
            </div>
            <p>{((item.productPrice ?? item.product?.price) * item.quantity).toLocaleString()}원</p>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-between items-center">
        <p className="text-lg font-bold">총 금액: {total.toLocaleString()}원</p>
        <div className="flex gap-3">
          <Button className="bg-gray-600 text-white" onClick={onClear}>전체 비우기</Button>
          <Button className="bg-[#ff0066] text-white">주문하기</Button>
        </div>
      </div>
    </div>
  );
}
