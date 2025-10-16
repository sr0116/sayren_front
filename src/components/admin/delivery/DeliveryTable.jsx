"use client";

import dayjs from "dayjs";
import StatusBadge from "@/components/common/StatusBadge";

export default function DeliveryTable({ deliveries, onStatusChange }) {
  // 상태 전이 규칙
  // 상태 전이 규칙 (서버 연동 기준)
  const nextStatus = (current) => {
    switch (current) {
      case "READY":
        return "SHIPPING";      // 출고 대기 → 배송 중
      case "SHIPPING":
        return "DELIVERED";     // 배송 중 → 배송 완료
      case "DELIVERED":
        return "RETURNED";      // 배송 완료 → 회수 완료
      default:
        return "READY";         // 초기값 (예외 처리)
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
                  <td className="px-4 py-2 border-b">{dayjs(d.regDate).format("YYYY.MM.DD")}</td>
                  <td className="px-4 py-2 border-b">{d.modDate ? dayjs(d.modDate).format("YYYY.MM.DD") : "-"}</td>
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
      </div>
  );
}
