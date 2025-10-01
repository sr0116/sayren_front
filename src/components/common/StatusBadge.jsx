"use client";

import { statusColorMap } from "@/utils/statusColorMap";
import { statusLabelMap } from "@/utils/statusLabelMap";

export default function StatusBadge({ type, value }) {
  // Tailwind 컬러 매핑
  const colorClass =
      statusColorMap[type]?.[value] || "bg-gray-100 text-gray-800";

  // 한글 라벨 매핑
  const label = statusLabelMap[type]?.[value] || value;

  return (
      <span
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${colorClass}`}
      >
      {label}
    </span>
  );
}
