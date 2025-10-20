"use client";

import dayjs from "dayjs";
import StatusBadge from "@/components/common/StatusBadge";

export default function DeliveryTable({ deliveries, onStatusChange }) {
  // 상태 전이 규칙 그대로 유지
  const nextStatus = (current) => {
    switch (current) {
      case "READY":
        return "SHIPPING";
      case "SHIPPING":
        return "DELIVERED";
      case "DELIVERED":
        return "RETURNED";
      default:
        return "READY";
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border border-gray-200 text-sm text-left">
        <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 border-b text-center">배송 ID</th>
          <th className="px-4 py-2 border-b text-center">회원명</th>
          <th className="px-4 py-2 border-b text-center">회원 ID</th>
          <th className="px-4 py-2 border-b text-center">배송지 ID</th>
          <th className="px-4 py-2 border-b text-center">유형</th>
          <th className="px-4 py-2 border-b text-center">상태</th>
          <th className="px-4 py-2 border-b text-center">등록일</th>
          <th className="px-4 py-2 border-b text-center">수정일</th>
          <th className="px-4 py-2 border-b text-center">상태 변경</th>
        </tr>
        </thead>
        <tbody>
        {deliveries.map((d) => (
          <tr key={d.deliveryId} className="hover:bg-gray-50 transition">
            <td className="px-4 py-2 border-b text-center text-gray-600">
              {d.deliveryId}
            </td>
            <td className="px-4 py-2 border-b text-center font-medium text-gray-800">
              {d.memberName || "-"}
            </td>
            <td className="px-4 py-2 border-b text-center text-gray-600">
              {d.memberId}
            </td>
            <td className="px-4 py-2 border-b text-center text-gray-600">
              {d.addressId}
            </td>
            <td className="px-4 py-2 border-b text-center">
              <StatusBadge type="DeliveryType" value={d.type} />
            </td>
            <td className="px-4 py-2 border-b text-center">
              <StatusBadge type="DeliveryStatus" value={d.status} />
            </td>
            <td className="px-4 py-2 border-b text-center text-gray-600">
              {dayjs(d.regDate).format("YYYY.MM.DD")}
            </td>
            <td className="px-4 py-2 border-b text-center text-gray-500">
              {d.modDate ? dayjs(d.modDate).format("YYYY.MM.DD") : "-"}
            </td>
            <td className="px-4 py-2 border-b text-center">
              <button
                onClick={() => onStatusChange(d.deliveryId, nextStatus(d.status))}
                className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-xs hover:bg-blue-700 transition"
              >
                다음 상태로 변경
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
