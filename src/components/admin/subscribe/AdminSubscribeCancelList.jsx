"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { openModal } from "@/store/modalSlice";
import {
  useAllSubscribesForAdminQuery,
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

  // 관리자 전체 구독 데이터 조회
  const {
    data: subscribes = [],
    isLoading,
    isError,
  } = useAllSubscribesForAdminQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 10초마다 자동 갱신
  useState(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries(["allSubscribes"]);
    }, 10000);
    return () => clearInterval(interval);
  }, [queryClient]);

  // 로딩 및 에러 처리
  if (isLoading) return <div>불러오는 중...</div>;
  if (isError)
    return <div>요청 목록을 불러오는 중 오류가 발생했습니다.</div>;
  if (!subscribes.length)
    return (
        <EmptyState
            title="데이터 없음"
            message="현재 등록된 구독 내역이 없습니다."
        />
    );

  console.debug("[DEBUG] 관리자 구독 목록:", subscribes);

  // 페이지네이션 처리
  const totalPages = Math.ceil(subscribes.length / itemsPerPage);
  const currentData = subscribes.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  // 상세 모달
  const openDetailModal = (subscribeId) => {
    dispatch(
        openModal({
          content: <AdminSubscribeCancelDetailModal subscribeId={subscribeId} />,
        })
    );
  };

  // 처리 모달
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
        <header className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            전체 구독 내역 관리
          </h2>
        </header>

        <div className="flex-1 border border-gray-100 rounded-xl p-4 bg-white shadow-sm">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-2 text-center font-medium text-gray-600">ID</th>
              <th className="p-2 text-center font-medium text-gray-600">
                상품명
              </th>
              <th className="p-2 text-center font-medium text-gray-600">
                회원명
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
              const isProcessed =
                  ["APPROVED", "REJECTED", "ENDED", "CANCELED"].includes(
                      s.status
                  ) ||
                  ["APPROVED_WAITING_RETURN", "APPROVED_COMPLETED"].includes(
                      s.refundRequestStatus
                  );

              return (
                  <tr
                      key={s.subscribeId}
                      className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-2 text-center text-gray-700">
                      {s.subscribeId}
                    </td>

                    {/* 상품명 클릭 시 상세보기 */}
                    <td
                        className="p-2 text-center text-gray-700 hover:underline cursor-pointer"
                        onClick={() => openDetailModal(s.subscribeId)}
                    >
                      {s.productName || "-"}
                    </td>

                    <td className="p-2 text-center text-gray-700">
                      {s.memberName || "-"}
                    </td>

                    <td className="p-2 text-center">
                      <StatusBadge type="ReasonCode" value={s.reasonCode} />
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

          {/* Pagination */}
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
