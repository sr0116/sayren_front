"use client";

import { statusColorMap } from "@/utils/statusColorMap";
import { statusLabelMap } from "@/utils/statusLabelMap";

export default function StatusBadge({ type, value }) {
  const colorClass =
      statusColorMap[type]?.[value] || "bg-gray-100 text-gray-800";

  const label = statusLabelMap[type]?.[value] || value;

  return (
      <span
          className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium ${colorClass}`}
      >
      {label}
    </span>
  );
}
