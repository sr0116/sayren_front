"use client";

import { useApiQuery } from "@/hooks/useApi";
import dayjs from "dayjs";
import EmptyState from "@/components/common/EmptyState";
import StatusBadge from "@/components/common/StatusBadge";

export default function OrderDetail({ orderId }) {
  const { data: order, isLoading, isError } = useApiQuery(
    ["order", orderId],
    `/api/user/orders/${orderId}`
  );

  const { data: histories = [] } = useApiQuery(
    ["orderHistory", orderId],
    `/api/user/orders/${orderId}/histories`
  );

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError)
    return (
      <EmptyState
        title="주문 상세 조회 실패"
        message="일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      />
    );

  return (
    <div className="w-full max-w-[550px] space-y-10">
      <header className="border-b border-gray-200 pb-4">
        <h2 className="text-lg font-bold text-gray-900">주문 상세 정보</h2>
        <p className="text-sm text-gray-500 mt-1">
          주문번호 #{order.orderId}
        </p>
      </header>

      <section className="space-y-4">
        <h3 className="text-base font-semibold text-gray-800">주문 내역</h3>
        {order.orderItems.map((item) => (
          <div key={item.orderItemId} className="text-sm">
            <p className="font-medium text-gray-900">{item.productName}</p>
            <p className="text-gray-500">{item.planType} 요금제</p>
            <p className="font-semibold text-gray-900">
              {item.priceSnapshot?.toLocaleString()}원
            </p>
          </div>
        ))}
      </section>

      <section className="space-y-4 border-t pt-4">
        <h3 className="text-base font-semibold text-gray-800">주문 이력</h3>
        {histories.length === 0 ? (
          <p className="text-sm text-gray-500">아직 변경 이력이 없습니다.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {histories.map((h) => (
              <li key={h.historyId} className="flex justify-between">
                <span>{dayjs(h.changedAt).format("YYYY-MM-DD HH:mm")}</span>
                <StatusBadge type="OrderStatus" value={h.status} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
