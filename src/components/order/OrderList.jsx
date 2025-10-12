"use client";

import { useApiQuery } from "@/hooks/useApi";
import StatusBadge from "@/components/common/StatusBadge";
import EmptyState from "@/components/common/EmptyState";
import dayjs from "dayjs";

export default function OrderList() {
    const { data: ordersData, isLoading, isError } = useApiQuery(
        ["orders"],
        "/api/user/orders"
    );

    const orders = Array.isArray(ordersData)
        ? ordersData
        : ordersData?.data || [];

    if (isLoading) return <div>로딩 중...</div>;
    if (isError) return <div>주문 내역 조회 실패</div>;
    if (orders.length === 0)
        return <EmptyState title="주문 내역이 없습니다" message="아직 주문 내역이 없습니다." />;

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-xl font-semibold mb-6">주문 내역</h2>

            <div className="flex-1 space-y-4 overflow-y-auto">
                {orders.map((o) => (
                    <div
                        key={o.orderId}
                        className="border border-gray-300 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition"
                    >
                        <div>
                            <p className="font-semibold">주문번호: {o.orderId}</p>
                            <p className="text-sm text-gray-500">
                                주문일자: {dayjs(o.regDate).format("YYYY-MM-DD HH:mm")}
                            </p>
                            <p className="text-sm text-gray-500">
                                총 금액: {o.totalPrice?.toLocaleString()}원
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <StatusBadge type="OrderStatus" value={o.status} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
