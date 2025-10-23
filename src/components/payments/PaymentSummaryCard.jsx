"use client";

import { useRecentPaymentsQuery } from "@/api/paymentApi";
import { CreditCard, Clock, CheckCircle, RefreshCw } from "lucide-react";

export default function PaymentSummaryCard() {
  const { data: payments = [], isLoading, isError } = useRecentPaymentsQuery();

  if (isLoading)
    return <div className="text-sm text-gray-500">불러오는 중...</div>;
  if (isError)
    return (
        <div className="text-sm text-red-500">요약 정보를 불러올 수 없습니다.</div>
    );

  const totalAmount = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const completed = payments.filter((p) => p.paymentStatus === "PAID").length;
  const pending = payments.filter((p) =>
      ["READY", "PENDING"].includes(p.paymentStatus)
  ).length;
  const refunding = payments.filter((p) =>
      ["REFUND_REQUESTED", "REFUNDING"].includes(p.paymentStatus)
  ).length;

  const formatNumber = (num) => new Intl.NumberFormat("ko-KR").format(num);

  const cards = [
    { title: "총 결제 금액", value: `${formatNumber(totalAmount)}원`, icon: CreditCard },
    { title: "결제 완료", value: `${completed}건`, icon: CheckCircle },
    { title: "결제 대기중", value: `${pending}건`, icon: Clock },
    { title: "환불 처리중", value: `${refunding}건`, icon: RefreshCw },
  ];

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(({ title, value, icon: Icon }, i) => (
            <div
                key={i}
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-100 transition"
            >
              <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-lg font-semibold text-gray-900">{value}</p>
              </div>
              <div className="p-2 rounded-lg bg-white shadow-sm">
                <Icon className="w-5 h-5 text-gray-600" />
              </div>
            </div>
        ))}
      </div>
  );
}
