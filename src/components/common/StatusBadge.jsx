"use client";

import {statusColorMap} from "@/utils/StatusColorMap";

export default function StatusBadge({ type, status }) {
  // enum 상태에 따라 뱃지
  // type: "PaymentStatus" | "OrderStatus" | "SubscribeStatus"
  const colorClass = statusColorMap[type]?.[status] || "bg-gray-100 text-gray-800";
  return (
      <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}
      >
      {status}
    </span>
  );
}