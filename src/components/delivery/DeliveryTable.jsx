"use client";

import dayjs from "dayjs";
import StatusBadge from "@/components/common/StatusBadge";

export default function DeliveryTable({ deliveries, onStatusChange }) {
  // 상태 전이 규칙
  const nextStatus = (current) => {
    switch (current) {
      case "READY":
        return "PREPARING";
      case "PREPARING":
        return "SHIPPING";
      case "SHIPPING":
        return "DELIVERED";
      case "DELIVERED":
        return "PICKUP_READY";
      case "PICKUP_READY":
        return "PICKED_UP";
      default:
        return "READY";
    }
  };

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-200 text-sm text-left">
          <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b">배송 ID</th>
            <th className="px-4 py-2 border-b">회원 ID</th>
            <th className="px-4 py-2 border-b">배송지 ID</th>
            <th className="px-4 py-2 border-b">유형</th>
            <th className="px-4 py-2 border-b">상태</th>
            <th className="px-4 py-2 border-b">등록일</th>
            <th className="px-4 py-2 border-b">수정일</th>
            <th className="px-4 py-2 border-b">상태 변경</th>
          </tr>
          </thead>
          <tbody>
          {deliveries.map((d) => (
            <tr key={d.deliveryId}>
              <td className="px-4 py-2 border-b">{d.deliveryId}</td>
              <td className="px-4 py-2 border-b">{d.memberId}</td>
              <td className="px-4 py-2 border-b">{d.addressId}</td>
              <td className="px-4 py-2 border-b">
                <StatusBadge type="DeliveryType" value={d.type} />
              </td>
              <td className="px-4 py-2 border-b">
                <StatusBadge type="DeliveryStatus" value={d.status} />
              </td>
              <td className="px-4 py-2 border-b">
                {dayjs(d.regDate).format("YYYY.MM.DD")}
              </td>
              <td className="px-4 py-2 border-b">
                {d.modDate ? dayjs(d.modDate).format("YYYY.MM.DD") : "-"}
              </td>
              <td className="px-4 py-2 border-b">
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

      {/* Mobile Card */}
      <div className="block md:hidden space-y-4">
        {deliveries.map((d) => (
          <div key={d.deliveryId} className="border rounded-lg p-4 bg-white shadow-sm">
            <p className="text-sm text-gray-500">배송 ID</p>
            <p className="mb-2">{d.deliveryId}</p>

            <p className="text-sm text-gray-500">회원 ID</p>
            <p className="mb-2">{d.memberId}</p>

            <p className="text-sm text-gray-500">유형</p>
            <StatusBadge type="DeliveryType" value={d.type} />

            <p className="text-sm text-gray-500 mt-2">상태</p>
            <StatusBadge type="DeliveryStatus" value={d.status} />

            <p className="text-sm text-gray-500 mt-2">등록일</p>
            <p>{dayjs(d.regDate).format("YYYY.MM.DD")}</p>

            <p className="text-sm text-gray-500 mt-2">수정일</p>
            <p>{d.modDate ? dayjs(d.modDate).format("YYYY.MM.DD") : "-"}</p>

            <button
              onClick={() => onStatusChange(d.deliveryId, nextStatus(d.status))}
              className="mt-3 w-full px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
            >
              상태 변경
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
