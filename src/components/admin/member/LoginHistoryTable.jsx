"use client";

import dayjs from "dayjs";
import SortableHeader from "@/components/common/SortableHeader";

export default function LoginHistoryTable({ history }) {
  if (!history || history.length === 0) {
    return <p className="text-gray-500 text-sm">로그인 기록이 없습니다.</p>;
  }

  return (
      <div className="w-full">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm text-left">
            <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">
                <SortableHeader column="ip" label="IP" />
              </th>
              <th className="px-4 py-2 border-b">
                <SortableHeader column="device" label="디바이스" />
              </th>
              <th className="px-4 py-2 border-b">
                <SortableHeader column="regDate" label="로그인일시" />
              </th>
            </tr>
            </thead>
            <tbody>
            {history.map((h, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 border-b">{h.ip}</td>
                  <td className="px-4 py-2 border-b">{h.device}</td>
                  <td className="px-4 py-2 border-b">
                    {dayjs(h.regDate).format("YYYY-MM-DD HH:mm:ss")}
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>

        <div className="block md:hidden space-y-4">
          {history.map((h, idx) => (
              <div
                  key={idx}
                  className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <p className="text-sm text-gray-500">IP</p>
                <p className="mb-2 break-all">{h.ip}</p>

                <p className="text-sm text-gray-500">디바이스</p>
                <p className="mb-2">{h.device}</p>

                <p className="text-sm text-gray-500">로그인일시</p>
                <p>{dayjs(h.regDate).format("YYYY-MM-DD HH:mm:ss")}</p>
              </div>
          ))}
        </div>
      </div>
  );
}
