"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { openModal } from "@/store/modalSlice";
import { useSearchParams } from "next/navigation";
import { useAllRefundRequestsQuery } from "@/api/refundRequestApi";

import RefundProcessDialog from "@/components/admin/refund/RefundProcessDialog";
import AdminRefundDetailModal from "@/components/admin/refund/AdminRefundDetailModal";
import EmptyState from "@/components/common/EmptyState";
import Pagination from "@/components/common/Pagination";
import StatusBadge from "@/components/common/StatusBadge";
import Button from "@/components/common/Button";
import { formatDate } from "@/components/common/Format";
import { statusLabelMap } from "@/utils/statusLabelMap";

export default function AdminRefundList() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  // URL 쿼리 기반 페이지 번호
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const itemsPerPage = 10;

  // 환불 요청 전체 조회
  const { data: requests = [], isLoading, isError } = useAllRefundRequestsQuery();

  const [filtered, setFiltered] = useState([]);

  // 데이터 세팅
  useEffect(() => {
    if (requests.length > 0) setFiltered(requests);
  }, [requests]);

  // 실시간 갱신 (10초마다)
  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries(["allRefundRequests"]);
    }, 10000);
    return () => clearInterval(interval);
  }, [queryClient]);

  // 로딩 및 오류 처리
  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>환불 요청 불러오기 실패</div>;
  if (!requests.length)
    return <EmptyState title="환불 요청 없음" message="등록된 환불 요청이 없습니다." />;

  // 페이지네이션 계산
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = filtered.slice(startIdx, startIdx + itemsPerPage);

  // 모달 열기 (상세)
  const openDetailModal = (reqId) => {
    dispatch(openModal({ content: <AdminRefundDetailModal refundRequestId={reqId} /> }));
  };

  // 모달 열기 (처리)
  const openProcessModal = (req) => {
    dispatch(openModal({ content: <RefundProcessDialog request={req} /> }));
  };

  return (
      <div className="flex flex-col gap-6 h-full">
        {/* 헤더 */}
        <header className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">환불 요청 관리</h2>
        </header>

        {/* 테이블 */}
        <div className="flex-1 border border-gray-100 rounded-xl p-4 bg-white shadow-sm">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-2 text-center font-medium text-gray-600">요청 ID</th>
              <th className="p-2 text-center font-medium text-gray-600">결제 ID</th>
              <th className="p-2 text-center font-medium text-gray-600">상품명</th>
              <th className="p-2 text-center font-medium text-gray-600">유형</th>
              <th className="p-2 text-center font-medium text-gray-600">사유</th>
              <th className="p-2 text-center font-medium text-gray-600">상태</th>
              <th className="p-2 text-center font-medium text-gray-600">요청일</th>
              <th className="p-2 text-center font-medium text-gray-600">처리일</th>
              <th className="p-2 text-center font-medium text-gray-600">관리</th>
            </tr>
            </thead>

            <tbody>
            {currentData.map((r) => {
              const reasonLabel =
                  statusLabelMap.ReasonCode[r.reasonCode] || r.reasonCode;
              const isProcessed = ["APPROVED", "REJECTED"].includes(r.status);

              return (
                  <tr
                      key={r.refundRequestId}
                      className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-2 text-center text-gray-700">
                      {r.refundRequestId}
                    </td>
                    <td className="p-2 text-center text-gray-700">{r.paymentId}</td>
                    <td
                        className="p-2 text-center text-gray-600 hover:underline cursor-pointer"
                        onClick={() => openDetailModal(r.refundRequestId)}
                    >
                      {r.productName}
                    </td>
                    <td className="p-2 text-center text-gray-600">
                      {statusLabelMap.OrderPlanType[r.orderPlanType] || "-"}
                    </td>
                    <td className="p-2 text-center text-gray-600">{reasonLabel}</td>
                    <td className="p-2 text-center">
                      <StatusBadge type="RefundRequestStatus" value={r.status} />
                    </td>
                    <td className="p-2 text-center text-gray-500">
                      {formatDate(r.regDate)}
                    </td>
                    <td className="p-2 text-center text-gray-500">
                      {r.voidDate ? formatDate(r.voidDate) : "-"}
                    </td>
                    <td className="p-2 text-center">
                      <Button
                          variant={isProcessed ? "secondary" : "primary"}
                          disabled={isProcessed}
                          onClick={() => openProcessModal(r)}
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
