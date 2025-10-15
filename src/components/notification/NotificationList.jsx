"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useMyNotificationsQuery } from "@/api/notificationApi";
import { formatDate } from "@/components/common/Format";
import StatusBadge from "@/components/common/StatusBadge";
import EmptyState from "@/components/common/EmptyState";
import Pagination from "@/components/common/Pagination";
import { useQueryClient } from "@tanstack/react-query";

export default function NotificationList() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  // URL에서 현재 page 파라미터 읽기 (기본값 1)
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const itemsPerPage = 10;

  const { data, isLoading, isError } = useMyNotificationsQuery();
  const notifications = Array.isArray(data) ? data : [];

  // 실시간 갱신 (10초마다)
  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries(["myNotifications"]);
    }, 10000);
    return () => clearInterval(interval);
  }, [queryClient]);

  // 로딩/에러 처리
  if (isLoading) return <div>불러오는 중...</div>;
  if (isError)
    return <div>알림을 불러오는 중 오류가 발생했습니다.</div>;
  if (notifications.length === 0)
    return (
        <EmptyState title="알림 없음" message="현재 받은 알림이 없습니다." />
    );

  // 페이지네이션 계산
  const totalPages = Math.ceil(notifications.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = notifications.slice(startIdx, startIdx + itemsPerPage);

  // 테이블 클릭 핸들러
  const handleRowClick = (id) => {
    router.push(`/mypage/notification/${id}`);
  };

  return (
      <div className="flex flex-col gap-6 h-full">
        {/* 헤더 */}
        <header className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">알림 목록</h2>
        </header>

        {/* 알림 테이블 */}
        <div className="flex-1 border border-gray-100 rounded-xl p-4 bg-white shadow-sm overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-2 text-center font-medium text-gray-600">
                알림 ID
              </th>
              <th className="p-2 text-center font-medium text-gray-600">
                제목
              </th>
              <th className="p-2 text-center font-medium text-gray-600">
                유형
              </th>
              <th className="p-2 text-center font-medium text-gray-600">
                등록일
              </th>
            </tr>
            </thead>

            <tbody>
            {currentData.map((n) => (
                <tr
                    key={n.notificationId}
                    onClick={() => handleRowClick(n.notificationId)}
                    className="border-t hover:bg-gray-50 cursor-pointer transition"
                >
                  <td className="p-2 text-center text-gray-700">
                    {n.notificationId}
                  </td>
                  <td className="p-2 text-left text-gray-900 font-medium">
                    {n.title}
                  </td>
                  <td className="p-2 text-center">
                    <StatusBadge type="NotificationType" value={n.type} />
                  </td>
                  <td className="p-2 text-center text-gray-500">
                    {formatDate(n.regDate)}
                  </td>
                </tr>
            ))}
            </tbody>
          </table>

          {/* 페이지네이션 */}
          <div className="mt-6 flex justify-center">
            <Pagination
                data={{
                  page: currentPage,
                  totalPages,
                  hasPrev: currentPage > 1,
                  hasNext: currentPage < totalPages,
                }}
            />
          </div>
        </div>
      </div>
  );
}
