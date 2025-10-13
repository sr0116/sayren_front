"use client";

import { useRecentPaymentsQuery } from "@/api/paymentApi";
import { useMemo } from "react";
import { CreditCard, Clock, CheckCircle, RefreshCw } from "lucide-react";

/**
 * 결제 현황 요약 카드 섹션 (마이페이지 상단)
 * - 실무 기준: 시각적 대시보드 형태
 */
export default function PaymentSummaryCard() {
  const { data: payments = [], isLoading, isError } = useRecentPaymentsQuery();

  // 통계 계산
  const stats = useMemo(() => {
    const totalAmount = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
    const completed = payments.filter((p) => p.paymentStatus === "PAID").length;
    const pending = payments.filter((p) =>
        ["READY", "PENDING"].includes(p.paymentStatus)
    ).length;
    const refunding = payments.filter((p) =>
        ["REFUND_REQUESTED", "REFUNDING"].includes(p.paymentStatus)
    ).length;
    return { totalAmount, completed, pending, refunding };
  }, [payments]);

  if (isLoading) return <div className="text-sm text-gray-500">불러오는 중...</div>;
  if (isError) return <div className="text-sm text-red-500">요약 정보를 불러올 수 없습니다.</div>;

  const cards = [
    {
      title: "총 결제 금액",
      value: `${stats.totalAmount.toLocaleString()}원`,
      icon: <CreditCard className="w-5 h-5 text-gray-600" />,
      color: "bg-gray-100",
    },
    {
      title: "결제 완료",
      value: `${stats.completed}건`,
      icon: <CheckCircle className="w-5 h-5 text-gray-600" />,
      color: "bg-gray-100",
    },
    {
      title: "결제 대기중",
      value: `${stats.pending}건`,
      icon: <Clock className="w-5 h-5 text-gray-600" />,
      color: "bg-gray-100",
    },
    {
      title: "환불 처리중",
      value: `${stats.refunding}건`,
      icon: <RefreshCw className="w-5 h-5 text-gray-600" />,
      color: "bg-gray-100",
    },
  ];

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((c, i) => (
            <div
                key={i}
                className={`${c.color} border border-gray-200 rounded-xl p-4 flex items-center justify-between transition hover:shadow-sm hover:bg-gray-50`}
            >
              <div>
                <p className="text-sm text-gray-500">{c.title}</p>
                <p className="text-lg font-semibold text-gray-900">{c.value}</p>
              </div>
              <div className="p-2 rounded-lg bg-white shadow-sm">{c.icon}</div>
            </div>
        ))}
      </div>
  );
}
