"use client";

import SortableHeader from "@/components/common/SortableHeader";
import dayjs from "dayjs";
import DeliveryStatusChangeButton from "@/components/delivery/DeliveryStatusChangeButton";

export default function DeliveryTable({ deliveries }) {
  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-200 text-sm text-left">
          <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b">
              <SortableHeader column="deliveryId" label="배송 ID" />
            </th>
            <th className="px-4 py-2 border-b">
              <SortableHeader column="memberId" label="회원 ID" />
            </th>
            <th className="px-4 py-2 border-b">
              <SortableHeader column="addressId" label="배송지 ID" />
            </th>
            <th className="px-4 py-2 border-b">
              <SortableHeader column="type" label="유형" />
            </th>
            <th className="px-4 py-2 border-b">
              <SortableHeader column="status" label="상태" />
            </th>
            <th className="px-4 py-2 border-b">
              <SortableHeader column="regDate" label="등록일" />
            </th>
            <th className="px-4 py-2 border-b">
              <SortableHeader column="modDate" label="수정일" />
            </th>
            <th className="px-4 py-2 border-b">
              상태변경
            </th>
          </tr>
          </thead>
          <tbody>
          {deliveries && deliveries.map((d) => (
            <tr key={d.deliveryId}>
              <td className="px-4 py-2 border-b">{d.deliveryId}</td>
              <td className="px-4 py-2 border-b">{d.memberId}</td>
              <td className="px-4 py-2 border-b">{d.addressId}</td>
              <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      d.type === "DELIVERY"
                        ? "bg-blue-600 text-white"
                        : "bg-purple-600 text-white"
                    }`}
                  >
                    {d.type}
                  </span>
              </td>
              <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      d.status === "READY"
                        ? "bg-yellow-500 text-white"
                        : d.status === "PREPARING"
                          ? "bg-orange-500 text-white"
                          : d.status === "SHIPPING"
                            ? "bg-blue-500 text-white"
                            : d.status === "DELIVERED"
                              ? "bg-green-600 text-white"
                              : d.status === "PICKUP_READY"
                                ? "bg-indigo-500 text-white"
                                : d.status === "PICKED_UP"
                                  ? "bg-gray-700 text-white"
                                  : "bg-gray-400 text-white"
                    }`}
                  >
                    {d.status}
                  </span>
              </td>
              <td className="px-4 py-2 border-b">
                {dayjs(d.regDate).format("YYYY년 MM월 DD일")}
              </td>
              <td className="px-4 py-2 border-b">
                {d.modDate ? dayjs(d.modDate).format("YYYY년 MM월 DD일") : "-"}
              </td>
              <td className="px-4 py-2 border-b">
                <DeliveryStatusChangeButton deliveryId={d.deliveryId} status={d.status} />
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden space-y-4">
        {deliveries && deliveries.map((d) => (
          <div
            key={d.deliveryId}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <p className="text-sm text-gray-500">배송 ID</p>
            <p className="mb-2">{d.deliveryId}</p>

            <p className="text-sm text-gray-500">회원 ID</p>
            <p className="mb-2">{d.memberId}</p>

            <p className="text-sm text-gray-500">배송지 ID</p>
            <p className="mb-2">{d.addressId}</p>

            <p className="text-sm text-gray-500">유형</p>
            <p
              className={`mb-2 font-medium ${
                d.type === "DELIVERY"
                  ? "text-blue-600"
                  : "text-purple-600"
              }`}
            >
              {d.type}
            </p>

            <p className="text-sm text-gray-500">상태</p>
            <p
              className={`mb-2 font-medium ${
                d.status === "READY"
                  ? "text-yellow-600"
                  : d.status === "PREPARING"
                    ? "text-orange-600"
                    : d.status === "SHIPPING"
                      ? "text-blue-600"
                      : d.status === "DELIVERED"
                        ? "text-green-600"
                        : d.status === "PICKUP_READY"
                          ? "text-indigo-600"
                          : d.status === "PICKED_UP"
                            ? "text-gray-600"
                            : "text-gray-400"
              }`}
            >
              {d.status}
            </p>

            <p className="text-sm text-gray-500">등록일</p>
            <p className="mb-2">
              {new Date(d.regDate).toLocaleString()}
            </p>

            <p className="text-sm text-gray-500">수정일</p>
            <p>{d.modDate ? new Date(d.modDate).toLocaleString() : "-"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
