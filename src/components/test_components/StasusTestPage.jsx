"use client";

import StatusBadge from "@/components/common/StatusBadge";

export default function StatusTestPage() {
  return (
      <div className="p-10 space-y-8">
        <h1 className="text-2xl font-bold">StatusBadge 테스트</h1>

        {/* 결제 상태 테스트 */}
        <section>
          <h2 className="text-lg font-semibold mb-3">PaymentStatus</h2>
          <div className="flex flex-wrap gap-3">
            <StatusBadge type="PaymentStatus" status="PENDING" />
            <StatusBadge type="PaymentStatus" status="PAID" />
            <StatusBadge type="PaymentStatus" status="FAILED" />
            <StatusBadge type="PaymentStatus" status="REFUNDED" />
            <StatusBadge type="PaymentStatus" status="PARTIAL_REFUNDED" />
            <StatusBadge type="PaymentStatus" status="COMPLETED" />
          </div>
        </section>

        {/* 주문 상태 테스트 */}
        <section>
          <h2 className="text-lg font-semibold mb-3">OrderStatus</h2>
          <div className="flex flex-wrap gap-3">
            <StatusBadge type="OrderStatus" status="PENDING" />
            <StatusBadge type="OrderStatus" status="PAID" />
            <StatusBadge type="OrderStatus" status="SHIPPED" />
            <StatusBadge type="OrderStatus" status="DELIVERED" />
            <StatusBadge type="OrderStatus" status="CANCELED" />
          </div>
        </section>

        {/* 구독 상태 테스트 */}
        <section>
          <h2 className="text-lg font-semibold mb-3">SubscribeStatus</h2>
          <div className="flex flex-wrap gap-3">
            <StatusBadge type="SubscribeStatus" status="PENDING_PAYMENT" />
            <StatusBadge type="SubscribeStatus" status="PREPARING" />
            <StatusBadge type="SubscribeStatus" status="ACTIVE" />
            <StatusBadge type="SubscribeStatus" status="ENDED" />
            <StatusBadge type="SubscribeStatus" status="CANCEL_REQUESTED" />
            <StatusBadge type="SubscribeStatus" status="CANCELED" />
            <StatusBadge type="SubscribeStatus" status="FAILED" />
          </div>
        </section>
      </div>
  );
}
