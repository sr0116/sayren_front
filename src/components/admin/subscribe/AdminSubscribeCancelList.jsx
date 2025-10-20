"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { openModal } from "@/store/modalSlice";
import { useAllSubscribesForAdminQuery } from "@/api/subscribeApi";

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
  const searchParams = useSearchParams();

  // URL 쿼리 기반 페이지 번호
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const itemsPerPage = 10;

  // 관리자 전체 구독 데이터 조회
  const {
    data: subscribes = [],
    isLoading,
    isError,
  } = useAllSubscribesForAdminQuery();

  // 10초마다 자동 갱신
  useEffect(() => {
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

  // reasonCode 기준 필터링
  const visibleReasonCodes = [
    "CONTRACT_CANCEL", // 승인 - 구독 취소
    "EXPIRED", // 승인 - 계약 만료
    "PRODUCT_DEFECT", // 승인 - 상품 불량 환불
    "DELIVERY_ISSUE", // 승인 - 배송 문제 환불
    "USER_REQUEST", // 승인 - 단순 변심
    "CANCEL_REJECTED", // 거절
    "ADMIN_FORCE_END", // 강제 종료
  ];

  // reasonCode가 포함된 항목만 필터링
  const filteredSubscribes = subscribes.filter((s) =>
      visibleReasonCodes.includes(s.reasonCode)
  );

  // 페이지네이션 처리
  const totalPages = Math.ceil(filteredSubscribes.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = filteredSubscribes.slice(startIdx, startIdx + itemsPerPage);

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
            구독 취소 / 만료 내역 관리
          </h2>
        </header>

        {/* 테이블 */}
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
