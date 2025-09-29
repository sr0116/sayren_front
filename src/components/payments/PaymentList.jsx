"use client";

import { useRecentPaymentsQuery } from "@/api/paymentApi";
import StatusBadge from "@/components/common/StatusBadge";
import EmptyState from "@/components/common/EmptyState";
import dayjs from "dayjs";

export default function PaymentList() {
  const { data, isLoading, isError } = useRecentPaymentsQuery({
    staleTime: 1000 * 60,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>결제 내역을 불러오는 중 오류가 발생했습니다.</div>;

  // data 자체가 배열이므로 그대로 사용
  const payments = Array.isArray(data) ? data : [];

  if (payments.length === 0) {
    return (
        <EmptyState
            title="결제 내역이 없습니다"
            message="아직 결제하신 내역이 없습니다."
        />
    );
  }

  return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">결제 내역</h2>
        <div className="space-y-4">
          {payments.map((p) => (
              <div
                  key={p.paymentId}
                  className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">결제번호: {p.paymentId}</p>
                  <p className="text-sm text-gray-500">
                    결제일: {dayjs(p.regDate).format("YYYY-MM-DD HH:mm")}
                  </p>
                  <p className="text-sm text-gray-500">
                    금액: {p.amount?.toLocaleString()}원
                  </p>
                </div>
                <div>
                  <StatusBadge type="PaymentStatus" status={p.paymentStatus} />
                </div>
              </div>
          ))}
        </div>
      </div>
  );
}
