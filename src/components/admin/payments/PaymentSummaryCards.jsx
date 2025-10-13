"use client";

import { CreditCard, CheckCircle, RefreshCw, XCircle } from "lucide-react";
import { useMemo } from "react";

/**
 * 관리자 결제 요약 카드 (상단 대시보드)
 */
export default function PaymentSummaryCards({ payments = [] }) {
  // 안전 방어 로직
  const safePayments = Array.isArray(payments) ? payments : [];

  const stats = useMemo(() => {
    if (!safePayments.length) {
      return { totalAmount: 0, completed: 0, refunded: 0, failed: 0 };
    }

    const totalAmount = safePayments.reduce((sum, p) => sum + (p.amount || 0), 0);
    const completed = safePayments.filter((p) => p.paymentStatus === "PAID").length;
    const refunded = safePayments.filter((p) =>
        ["REFUNDED", "CANCELED"].includes(p.paymentStatus)
    ).length;
    const failed = safePayments.filter((p) => p.paymentStatus === "FAILED").length;

    return { totalAmount, completed, refunded, failed };
  }, [safePayments]);

  const cards = [
    {
      title: "총 결제 금액",
      value: `${stats.totalAmount.toLocaleString()}원`,
      icon: <CreditCard className="w-5 h-5 text-gray-700" />,
      color: "bg-gray-50",
    },
    {
      title: "결제 완료",
      value: `${stats.completed}건`,
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      color: "bg-green-50",
    },
    {
      title: "환불/취소",
      value: `${stats.refunded}건`,
      icon: <RefreshCw className="w-5 h-5 text-blue-600" />,
      color: "bg-blue-50",
    },
    {
      title: "결제 실패",
      value: `${stats.failed}건`,
      icon: <XCircle className="w-5 h-5 text-red-600" />,
      color: "bg-red-50",
    },
  ];

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
            <div
                key={i}
                className={`${c.color} border border-gray-200 rounded-xl p-4 flex items-center justify-between transition hover:shadow-sm hover:bg-gray-100`}
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
