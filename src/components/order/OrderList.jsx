"use client";

import { useDispatch } from "react-redux";
import { openModal } from "@/store/modalSlice";
import { useApiQuery } from "@/hooks/useApi";
import StatusBadge from "@/components/common/StatusBadge";
import EmptyState from "@/components/common/EmptyState";
import Pagination from "@/components/common/Pagination";
import dayjs from "dayjs";
import OrderDetail from "@/components/order/OrderDetail";

export default function OrderList() {
  const dispatch = useDispatch();

  // useApiQuery 내부 axios baseURL이 이미 "/api/proxy" 이므로 중복 방지
  const { data: allOrdersData, isLoading, isError } = useApiQuery(
    ["orders"],
    "/api/user/orders/my"
  );


  // 응답 구조 안전 처리
  const orders = Array.isArray(allOrdersData?.data)
    ? allOrdersData.data
    : Array.isArray(allOrdersData)
      ? allOrdersData
      : [];

  //상태별 처리
  if (isLoading) return <div>로딩 중...</div>;

  if (isError)
    return (
      <EmptyState
        title="주문 내역을 불러올 수 없습니다"
        message="일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      />
    );

  if (!orders.length)
    return (
      <EmptyState
        title="주문 내역이 없습니다"
        message="아직 주문하신 내역이 없습니다."
      />
    );

  //  페이지네이션 (10개씩)
  const itemsPerPage = 10;
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const currentPage = 1; // 단순 예시 (URL query로 개선 가능)
  const pagedOrders = orders.slice(0, itemsPerPage);

  // 렌더링
  return (
    <div className="w-full h-full space-y-10">
      <header className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">주문 내역</h2>
      </header>

      {pagedOrders.map((o) => (
        <section
          key={o.orderId}
          className="space-y-3 border-b border-gray-100 pb-6"
        >
          {/* 주문 헤더 */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                {dayjs(o.regDate).format("YYYY.MM.DD (dd)")}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                상태: {o.status}
              </p>
            </div>
            <button
              className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() =>
                dispatch(openModal({ content: <OrderDetail orderId={o.orderId} /> }))
              }
            >
              주문 상세
            </button>
          </div>

          {/* 주문 카드 */}
          <div className="border border-gray-200 rounded-lg bg-white">
            <div className="flex justify-between items-center p-4">
              <p className="font-semibold text-gray-900">
                주문번호 #{o.orderId}
              </p>
              <StatusBadge type="OrderStatus" value={o.status} />
            </div>
            <div className="border-t text-sm text-gray-700 text-right py-2 pr-4">
              총 금액: {o.totalPrice?.toLocaleString()}원
            </div>
          </div>
        </section>
      ))}

      {/* 페이지네이션 */}
      <div className="mt-8 flex justify-center">
        <Pagination
          data={{
            page: currentPage,
            totalPages,
            hasPrev: currentPage > 1,
            hasNext: currentPage < totalPages,
          }}
        />
      </div>
    </div>
  );
}
