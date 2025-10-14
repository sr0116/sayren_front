"use client";

import { useOrderQuery } from "@/api/orderApi";
import { useParams } from "next/navigation";
import Button from "@/components/common/Button";

export default function OrderDetailPage() {
  const { id } = useParams();
  const { data: res, isLoading } = useOrderQuery(id);
  const order = res?.data ?? res;

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500 text-lg">
        주문 정보를 불러오는 중입니다...
      </div>
    );

  if (!order)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500 text-lg">
        주문을 찾을 수 없습니다.
      </div>
    );

  const statusColor =
    order.status === "PAID"
      ? "bg-green-100 text-green-700"
      : order.status === "CANCELED"
        ? "bg-red-100 text-red-700"
        : "bg-gray-100 text-gray-600";

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">🧾 주문 상세 내역</h1>

      {/* 주문 요약 */}
      <div className="bg-white shadow-sm rounded-xl border p-6 mb-8">
        <div className="flex flex-wrap justify-between items-center">
          <div>
            <p className="text-gray-600 text-sm mb-1">주문번호</p>
            <p className="text-lg font-semibold text-gray-900">#{order.orderId}</p>
          </div>

          <div
            className={`px-4 py-2 rounded-full text-sm font-medium ${statusColor}`}
          >
            {order.status}
          </div>
        </div>

        <div className="mt-4 border-t pt-4 text-sm text-gray-700">
          <p>
            <span className="font-semibold">주문자:</span>{" "}
            {order.memberName} ({order.memberEmail})
          </p>
          <p>
            <span className="font-semibold">주문일:</span>{" "}
            {new Date(order.regDate).toLocaleString()}
          </p>
        </div>
      </div>

      {/* 배송 정보 */}
      <div className="bg-white shadow-sm rounded-xl border p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">배송 정보</h2>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">수령인:</span>{" "}
            {order.addressName || "-"}
          </p>
          <p>
            <span className="font-semibold">연락처:</span>{" "}
            {order.addressTel || "-"}
          </p>
          <p>
            <span className="font-semibold">주소:</span>{" "}
            {order.addressDetail || "-"}
          </p>
          <p>
            <span className="font-semibold">메모:</span>{" "}
            {order.addressMemo || "-"}
          </p>
        </div>
      </div>

      {/* 상품 목록 */}
      <div className="bg-white shadow-sm rounded-xl border p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">주문 상품</h2>

        {order.orderItems?.length > 0 ? (
          <ul className="divide-y">
            {order.orderItems.map((item) => (
              <li
                key={item.orderItemId}
                className="flex items-center justify-between py-4"
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    {item.productName}
                  </p>
                  <p className="text-sm text-gray-500">
                    가격: ₩{item.priceSnapshot?.toLocaleString()}
                  </p>
                </div>
                <p className="font-semibold text-gray-800">
                  × {item.quantity || 1}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">상품 정보가 없습니다.</p>
        )}
      </div>

      {/* 결제 정보 */}
      <div className="bg-white shadow-sm rounded-xl border p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">결제 정보</h2>
        <div className="text-gray-700 space-y-1">
          <p>
            <span className="font-semibold">총 결제 금액:</span>{" "}
            <span className="text-red-600 font-bold">
              ₩{order.totalPrice?.toLocaleString() || "0"}
            </span>
          </p>
          <p>
            <span className="font-semibold">결제 상태:</span>{" "}
            {order.paymentStatus || "확인 중"}
          </p>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-center gap-4">
        <Button
          variant="secondary"
          className="px-8 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
          onClick={() => history.back()}
        >
          ← 이전으로
        </Button>
        <Button
          variant="primary"
          className="px-8 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
          onClick={() => (window.location.href = "/mypage/orders")}
        >
          주문 내역 전체 보기
        </Button>
      </div>
    </div>
  );
}
