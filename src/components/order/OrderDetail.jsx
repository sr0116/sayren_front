"use client";

import { useApiQuery } from "@/hooks/useApi";
import dayjs from "dayjs";
import EmptyState from "@/components/common/EmptyState";
import StatusBadge from "@/components/common/StatusBadge";

export default function OrderDetail({ orderId }) {
  // 주문 상세 조회
  const { data: order, isLoading, isError } = useApiQuery(
    ["order", orderId],
    `/api/user/orders/${orderId}`
  );

  // 주문 이력 조회
  const { data: historiesResponse, isLoading: isHistoryLoading } = useApiQuery(
    ["orderHistory", orderId],
    `/api/user/orders/${orderId}/histories`
  );


  const histories = Array.isArray(historiesResponse)
    ? historiesResponse
    : historiesResponse?.data ?? [];

  // 로딩 & 에러 처리
  if (isLoading || isHistoryLoading)
    return (
      <div className="flex justify-center items-center min-h-[200px] text-gray-500">
        불러오는 중...
      </div>
    );

  if (isError)
    return (
      <EmptyState
        title="주문 상세 조회 실패"
        message="일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      />
    );

  if (!order)
    return (
      <EmptyState
        title="주문 정보가 없습니다"
        message="존재하지 않는 주문이거나 삭제된 주문입니다."
      />
    );

  // ===== UI =====
  return (
    <div className="w-full max-w-[550px] space-y-10">
      {/* 헤더 */}
      <header className="border-b border-gray-200 pb-4">
        <h2 className="text-lg font-bold text-gray-900">주문 상세 정보</h2>
        <p className="text-sm text-gray-500 mt-1">주문번호 #{order.orderId}</p>
      </header>

      {/* 주문 내역 */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-gray-800">주문 내역</h3>

        {order.orderItems?.length > 0 ? (
          order.orderItems.map((item) => (
            <div
              key={item.orderItemId}
              className="flex items-center gap-3 border-b border-gray-100 pb-3"
            >
              {/*  썸네일 이미지 추가 */}
              {item.productThumbnail && (
                <img
                  src={item.productThumbnail}
                  alt={item.productName}
                  className="w-16 h-16 rounded-md border border-gray-200 object-cover"
                />
              )}

              {/* 상품 정보 */}
              <div className="flex flex-col">
                <p className="font-medium text-gray-900">{item.productName}</p>
                <p className="text-xs text-gray-500 mb-1">
                  {item.planType} 요금제
                </p>
                <p className="font-semibold text-gray-900">
                  {item.priceSnapshot?.toLocaleString()}원
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">상품 정보가 없습니다.</p>
        )}
      </section>

      {/* 주문 이력 */}
      <section className="space-y-4 border-t pt-4">
        <h3 className="text-base font-semibold text-gray-800">주문 이력</h3>

        {histories.length === 0 ? (
          <p className="text-sm text-gray-500">아직 변경 이력이 없습니다.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {histories.map((h) => (
              <li
                key={h.historyId}
                className="flex justify-between items-center"
              >
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
