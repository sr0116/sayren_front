"use client";

import StatusBadge from "@/components/common/StatusBadge";
import { formatDate } from "@/components/common/Format";

export default function AdminSubscribeTable({ subscribes, onRowClick }) {
  return (
      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-50 border-b">
        <tr>
          <th className="py-2 text-center">구독 ID</th>
          <th className="py-2 text-center">회원명</th>
          <th className="py-2 text-center">상품명</th>
          <th className="py-2 text-center">보증금</th>
          <th className="py-2 text-center">월 렌탈료</th>
          <th className="py-2 text-center">개월 수</th>
          <th className="py-2 text-center">상태</th>
          <th className="py-2 text-center">시작일</th>
          <th className="py-2 text-center">종료일</th>
          <th className="py-2 text-center">신청일</th>
        </tr>
        </thead>

        <tbody>
        {subscribes.map((s) => (
            <tr
                key={s.subscribeId}
                onClick={() => onRowClick(s.subscribeId)}
                className="hover:bg-gray-50 cursor-pointer border-b transition"
            >
              <td className="py-2 text-center text-gray-600">{s.subscribeId}</td>
              <td className="py-2 text-center">{s.memberName || "-"}</td>
              <td className="py-2 text-center">{s.productName}</td>
              <td className="py-2 text-right text-gray-900">
                {s.depositSnapshot?.toLocaleString()} 원
              </td>
              <td className="py-2 text-right text-gray-900">
                {s.monthlyFeeSnapshot?.toLocaleString()} 원
              </td>
              <td className="py-2 text-center">{s.totalMonths}개월</td>
              <td className="py-2 text-center">
                <StatusBadge type="SubscribeStatus" value={s.status} />
              </td>
              <td className="py-2 text-center text-gray-500">
                {formatDate(s.startDate)}
              </td>
              <td className="py-2 text-center text-gray-500">
                {formatDate(s.endDate)}
              </td>
              <td className="py-2 text-center text-gray-500">
                {formatDate(s.regDate)}
              </td>
            </tr>
        ))}
        </tbody>
      </table>
  );
}
