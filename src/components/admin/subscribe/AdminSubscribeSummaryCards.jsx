"use client";

import { CreditCard, CheckCircle, RefreshCw, XCircle } from "lucide-react";
import { useMemo } from "react";

export default function AdminSubscribeSummaryCards({ subscribes = [] }) {
  const safeSubs = Array.isArray(subscribes) ? subscribes : [];

  const stats = useMemo(() => {
    if (!safeSubs.length)
      return { total: 0, active: 0, ended: 0, canceled: 0, overdue: 0 };

    return {
      total: safeSubs.length,
      active: safeSubs.filter((s) => s.status === "ACTIVE").length,
      ended: safeSubs.filter((s) => s.status === "ENDED").length,
      canceled: safeSubs.filter((s) => s.status === "CANCELED").length,
      overdue: safeSubs.filter((s) => s.status === "OVERDUE").length,
    };
  }, [safeSubs]);

  const cards = [
    {
      title: "총 구독 수",
      value: `${stats.total}건`,
      icon: <CreditCard className="w-5 h-5 text-gray-700" />,
      color: "bg-gray-50",
    },
    {
      title: "진행 중",
      value: `${stats.active}건`,
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      color: "bg-green-50",
    },
    {
      title: "종료 / 취소",
      value: `${stats.ended + stats.canceled}건`,
      icon: <RefreshCw className="w-5 h-5 text-blue-600" />,
      color: "bg-blue-50",
    },
    {
      title: "연체 중",
      value: `${stats.overdue}건`,
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
