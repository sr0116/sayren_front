"use client";

import dayjs from "dayjs";
import Button from "@/components/common/Button";
import StatusBadge from "@/components/common/StatusBadge";
import { statusLabelMap } from "@/utils/statusLabelMap";

export default function SubscribeCancelTable({ requests, onProcess }) {
  if (!requests || requests.length === 0) {
    return (
        <div className="text-center text-gray-500 py-10">
          구독 취소 요청 내역이 없습니다.
        </div>
    );
  }

  return (
      <div className="w-full">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm text-left">
            <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">구독 ID</th>
              <th className="px-4 py-2 border-b">주문 ID</th>
              <th className="px-4 py-2 border-b">상태</th>
              <th className="px-4 py-2 border-b">사유</th>
              <th className="px-4 py-2 border-b text-right">보증금</th>
              <th className="px-4 py-2 border-b text-right">월 렌탈료</th>
              <th className="px-4 py-2 border-b text-center">개월 수</th>
              <th className="px-4 py-2 border-b text-center">시작일</th>
              <th className="px-4 py-2 border-b text-center">종료일</th>
              <th className="px-4 py-2 border-b text-center">신청일</th>
              <th className="px-4 py-2 border-b text-center">관리</th>
            </tr>
            </thead>
            <tbody>
            {requests.map((r) => (
                <tr key={r.subscribeId} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 border-b text-center">
                    {r.subscribeId}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {r.orderItemId}
                  </td>

                  {/* 상태 컬럼 */}
                  <td className="px-4 py-2 border-b text-center">
                    <StatusBadge type="SubscribeStatus" value={r.status} />
                  </td>

                  {/* 사유 컬럼 */}
                  <td className="px-4 py-2 border-b text-center">
                    <StatusBadge type="ReasonCode" value={r.reasonCode} />
                  </td>

                  <td className="px-4 py-2 border-b text-right">
                    {r.depositSnapshot
                        ? `${r.depositSnapshot.toLocaleString()} 원`
                        : "-"}
                  </td>
                  <td className="px-4 py-2 border-b text-right">
                    {r.monthlyFeeSnapshot
                        ? `${r.monthlyFeeSnapshot.toLocaleString()} 원`
                        : "-"}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {r.totalMonths ? `${r.totalMonths}개월` : "-"}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {dayjs(r.startDate).format("YYYY.MM.DD")}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {dayjs(r.endDate).format("YYYY.MM.DD")}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {dayjs(r.regDate).format("YYYY.MM.DD")}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <Button
                        size="sm"
                        variant="primary"
                        onClick={() => onProcess(r)}
                    >
                      처리하기
                    </Button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="block md:hidden space-y-4">
          {requests.map((r) => (
              <div
                  key={r.subscribeId}
                  className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <p className="text-sm text-gray-500">구독 ID</p>
                <p className="mb-2">{r.subscribeId}</p>

                <p className="text-sm text-gray-500">주문 ID</p>
                <p className="mb-2">{r.orderItemId}</p>

                <p className="text-sm text-gray-500">상태</p>
                <div className="mb-2">
                  <StatusBadge type="SubscribeStatus" value={r.status} />
                </div>

                <p className="text-sm text-gray-500">사유</p>
                <div className="mb-2">
                  <StatusBadge type="ReasonCode" value={r.reasonCode} />
                </div>

                <p className="text-sm text-gray-500">보증금</p>
                <p className="mb-2">
                  {r.depositSnapshot?.toLocaleString()} 원
                </p>

                <p className="text-sm text-gray-500">월 렌탈료</p>
                <p className="mb-2">
                  {r.monthlyFeeSnapshot?.toLocaleString()} 원
                </p>

                <Button
                    size="sm"
                    variant="primary"
                    onClick={() => onProcess(r)}
                    className="w-full mt-2"
                >
                  처리하기
                </Button>
              </div>
          ))}
        </div>
      </div>
  );
}
