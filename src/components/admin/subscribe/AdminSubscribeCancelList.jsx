"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { openModal } from "@/store/modalSlice";
import {
  useAllSubscribesForAdminQuery,
  useProcessSubscribeCancelMutation,
} from "@/api/subscribeApi";
import SubscribeCancelProcessDialog from "@/components/admin/subscribe/SubscribeCancelProcessDialog";
import AdminSubscribeCancelDetailModal from "@/components/admin/subscribe/AdminSubscribeCancelDetailModal";
import EmptyState from "@/components/common/EmptyState";
import Pagination from "@/components/common/Pagination";
import StatusBadge from "@/components/common/StatusBadge";
import Button from "@/components/common/Button";
import { formatDate } from "@/components/common/Format";
import { statusLabelMap } from "@/utils/statusLabelMap";

export default function AdminSubscribeCancelList() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { data: subscribes = [], isLoading, isError } =
      useAllSubscribesForAdminQuery();

  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 초기 데이터 세팅
  useEffect(() => {
    if (subscribes.length > 0) {
      // reasonCode가 USER_REQUEST인 항목만 취소 요청으로 필터링
      const cancelRequests = subscribes.filter(
          (s) => s.reasonCode === "USER_REQUEST"
      );
      setFiltered(cancelRequests);
    }
  }, [subscribes]);

  // 실시간 데이터 갱신
  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries(["allSubscribes"]);
    }, 10000);
    return () => clearInterval(interval);
  }, [queryClient]);

  // 상태 처리
  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>구독 요청 불러오기 실패</div>;
  if (!filtered.length)
    return (
        <EmptyState
            title="구독 취소 요청 없음"
            message="현재 취소 요청 중인 구독이 없습니다."
        />
    );

  // 페이지네이션 처리
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentData = filtered.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  // 상세 모달 열기
  const openDetailModal = (subscribeId) => {
    dispatch(
        openModal({
          content: <AdminSubscribeCancelDetailModal subscribeId={subscribeId} />,
        })
    );
  };

  // 처리 모달 열기
  const openProcessModal = (req) => {
    dispatch(
        openModal({
          content: (
              <SubscribeCancelProcessDialog
                  request={req}
                  onProcessed={() => queryClient.invalidateQueries(["allSubscribes"])}
              />
          ),
        })
    );
  };

  return (
      <div className="flex flex-col gap-6 h-full">
        {/* 헤더 */}
        <header className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            구독 취소 요청 관리
          </h2>
        </header>

        {/* 구독 취소 요청 테이블 */}
        <div className="flex-1 border border-gray-100 rounded-xl p-4 bg-white shadow-sm">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-2 text-center font-medium text-gray-600">
                구독 ID
              </th>
              <th className="p-2 text-center font-medium text-gray-600">
                주문 ID
              </th>
              <th className="p-2 text-center font-medium text-gray-600">
                상품명
              </th>
              <th className="p-2 text-center font-medium text-gray-600">
                사유
              </th>
              <th className="p-2 text-center font-medium text-gray-600">
                상태
              </th>
              <th className="p-2 text-center font-medium text-gray-600">
                시작일
              </th>
              <th className="p-2 text-center font-medium text-gray-600">
                종료일
              </th>
              <th className="p-2 text-center font-medium text-gray-600">
                신청일
              </th>
              <th className="p-2 text-center font-medium text-gray-600">
                관리
              </th>
            </tr>
            </thead>

            <tbody>
            {currentData.map((s) => {
              const reasonLabel =
                  statusLabelMap.ReasonCode[s.reasonCode] || s.reasonCode;
              const isProcessed = ["APPROVED", "REJECTED"].includes(s.status);

              return (
                  <tr
                      key={s.subscribeId}
                      className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-2 text-center text-gray-700">
                      {s.subscribeId}
                    </td>
                    <td className="p-2 text-center text-gray-700">
                      {s.orderItemId}
                    </td>
                    <td
                        className="p-2 text-center text-gray-600 hover:underline cursor-pointer"
                        onClick={() => openDetailModal(s.subscribeId)}
                    >
                      {s.productName}
                    </td>
                    <td className="p-2 text-center text-gray-600">
                      {reasonLabel}
                    </td>
                    <td className="p-2 text-center">
                      <StatusBadge type="SubscribeStatus" value={s.status} />
                    </td>
                    <td className="p-2 text-center text-gray-500">
                      {formatDate(s.startDate)}
                    </td>
                    <td className="p-2 text-center text-gray-500">
                      {formatDate(s.endDate)}
                    </td>
                    <td className="p-2 text-center text-gray-500">
                      {formatDate(s.regDate)}
                    </td>
                    <td className="p-2 text-center">
                      <Button
                          variant={isProcessed ? "secondary" : "primary"}
                          disabled={isProcessed}
                          onClick={() => openProcessModal(s)}
                          className="px-3 py-1 text-sm"
                      >
                        {isProcessed ? "처리 완료" : "처리하기"}
                      </Button>
                    </td>
                  </tr>
              );
            })}
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
                onChangePage={setCurrentPage}
            />
          </div>
        </div>
      </div>
  );
}
