"use client";

import { useDispatch } from "react-redux";
import { openModal } from "@/store/modalSlice";
import { useApiQuery } from "@/hooks/useApi";
import StatusBadge from "@/components/common/StatusBadge";
import EmptyState from "@/components/common/EmptyState";
import Pagination from "@/components/common/Pagination";
import dayjs from "dayjs";
import OrderDetail from "@/components/order/OrderDetail";
import {calcRentalPrice} from "@/utils/CalcRentalPrice";

export default function OrderList() {
  const dispatch = useDispatch();

  // useApiQuery 내부 axios baseURL이 이미 "/api/proxy" 이므로 중복 방지
  const { data: allOrdersData, isLoading, isError } = useApiQuery(
    ["orders"],
    "/api/user/orders/my"
  );

  const plans = [
    { planId: 1 },
    { planId: 2, month: 12 },
    { planId: 3, month: 24 },
    { planId: 4, month: 36 },
  ];


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

  // 렌더링
  return (
    <div className="w-full h-full space-y-10">
      <header className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">주문 내역</h2>
      </header>

      {orders.map((o) => {
        let allPrice = 0;
        return (
        <section
          key={o.orderId}
          className="space-y-3 border-b border-gray-100 pb-6"
        >
          {/* 주문 카드 */}
          <div className="border border-gray-200 rounded-lg bg-white">
            <div className="flex justify-between items-center p-4">
              <p className="font-semibold text-gray-900">
                주문번호 #{o.orderId}
                <span className="text-base font-semibold text-gray-900">
                   - {dayjs(o.regDate).format("YYYY.MM.DD (dd)")}
                </span>
              </p>
              <StatusBadge type="OrderStatus" value={o.status} />
            </div>
            <div className="border-t text-sm text-gray-700 text-right py-2 pr-4">
              {o.orderItems.map(oi =>  {
                const plan = plans.find((p) => p.planId === oi.planId);
                const { monthlyFee, deposit: itemDeposit, totalPrice } = calcRentalPrice(
                +oi.priceSnapshot,
                plan?.month || 0
                );
                const total = (monthlyFee && itemDeposit) ? monthlyFee + itemDeposit : totalPrice;
                allPrice += total;
                return (
                <div className="flex items-center m-4 gap-4 justify-between me-0">
                  <img src={oi.productThumbnail} className="w-20 h-20"/>
                  <div className="flex items-start flex-col gap-1 flex-1">
                    <p className="font-semibold">{oi.productName}</p>
                    { monthlyFee && itemDeposit && <p className="text-gray-500">렌탈료 : {monthlyFee.toLocaleString()}원 / 보증금 : {itemDeposit.toLocaleString()}원</p>}
                  </div>
                  <p className="text-primary text-lg font-bold">{total.toLocaleString()}원</p>
                </div>

              )})}
              총 금액: {allPrice.toLocaleString()}원
            </div>
          </div>
        </section>
      )})}
    </div>
      );
}
