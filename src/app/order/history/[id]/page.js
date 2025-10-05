"use client";

import { useOrderQuery } from "@/api/orderApi";
import { useParams } from "next/navigation";

export default function OrderDetailPage() {
  const { id } = useParams();
  const { data: order, isLoading } = useOrderQuery(id);

  if (isLoading) return <p>로딩 중...</p>;
  if (!order) return <p>주문을 찾을 수 없습니다.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">주문 상세</h1>
      <p className="mb-1">주문번호: {order.orderId}</p>
      <p className="mb-1">상태: {order.status}</p>
      <p className="mb-1">주문자: {order.memberName} ({order.memberEmail})</p>

      <h2 className="mt-6 font-semibold">배송 정보</h2>
      <div className="mt-2 space-y-1">
        <p>수령인: {order.addressName}</p>
        <p>연락처: {order.addressTel}</p>
        <p>주소: {order.addressDetail}</p>
      </div>

      <h2 className="mt-6 font-semibold">상품 목록</h2>
      <ul className="mt-2 space-y-2">
        {order.orderItems?.map((item) => (
          <li key={item.orderItemId} className="border-b pb-2">
            <p className="font-medium">{item.productName}</p>
            <p className="text-sm text-gray-600">
              요금제: {item.planType} / 가격: {item.priceSnapshot.toLocaleString()}원
            </p>
          </li>
        ))}
      </ul>

      <h2 className="mt-6 font-semibold">주문 시간</h2>
      <p>주문일: {new Date(order.regDate).toLocaleString()}</p>
      <p>수정일: {new Date(order.modDate).toLocaleString()}</p>
    </div>
  );
}
