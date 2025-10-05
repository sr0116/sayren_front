"use client"
import {useState} from "react";
import Pagination from "@/components/common/Pagination";
import {formatDate} from "@/components/common/Format";
import StatusBadge from "@/components/common/StatusBadge";
import EmptyState from "@/components/common/EmptyState";
import {useAllSubscribesForAdminQuery} from "@/api/subscribeApi";

export default function SubscribeList() {
  const {data: subscribes = [], isLoading} = useAllSubscribesForAdminQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (isLoading) return <div>로딩 중...</div>;
  if (!subscribes.length) return <EmptyState message="구독 내역이 없습니다."/>;

  const totalPages = Math.ceil(subscribes.length / itemsPerPage);
  const currentData = subscribes.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  return (
      <div>
        <h2 className="text-xl font-bold mb-4">구독 내역</h2>

        <table className="w-full border border-gray-100 text-sm">
          <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-2">구독 ID</th>
            <th className="p-2">상태</th>
            <th className="p-2">보증금</th>
            <th className="p-2">월 렌탈료</th>
            <th className="p-2">개월 수</th>
            <th className="p-2">시작일</th>
            <th className="p-2">종료일</th>
            <th className="p-2">신청일</th>
          </tr>
          </thead>

          <tbody>
          {currentData.map((s) => (
              <tr key={s.subscribeId} className="border-t hover:bg-gray-50 transition">
                <td className="p-2 text-center">{s.subscribeId}</td>
                <td className="p-2 text-center">
                  <StatusBadge type="SubscribeStatus" value={s.status}/>
                </td>
                <td className="p-2 text-right">
                  {s.depositSnapshot?.toLocaleString()} 원
                </td>
                <td className="p-2 text-right">
                  {s.monthlyFeeSnapshot?.toLocaleString()} 원
                </td>
                <td className="p-2 text-center">{s.totalMonths}개월</td>
                <td className="p-2 text-center">{formatDate(s.startDate)}</td>
                <td className="p-2 text-center">{formatDate(s.endDate)}</td>
                <td className="p-2 text-center">{formatDate(s.regDate)}</td>
              </tr>
          ))}
          </tbody>
        </table>

        {/*  Pagination 처리 일단 임시로 */}
        <Pagination
            data={{
              page: currentPage,
              totalPages: totalPages,
              hasPrev: currentPage > 1,
              hasNext: currentPage < totalPages,
            }}
        />
      </div>
  );
}
