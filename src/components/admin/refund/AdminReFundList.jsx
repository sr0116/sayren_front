"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { openModal } from "@/store/modalSlice";
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
  const { data: requests = [], isLoading, isError } = useAllRefundRequestsQuery();

  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 초기 데이터 세팅
  useEffect(() => {
    if (requests.length > 0) setFiltered(requests);
  }, [requests]);

  // 실시간 갱신
  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries(["allRefundRequests"]);
    }, 10000);
    return () => clearInterval(interval);
  }, [queryClient]);

  // 상태
  if (isLoading) return <div>불러오는 중...</div>;
  if (isError)
    return <div>환불 요청 불러오기 실패</div>;
  if (!requests.length)
    return <EmptyState title="환불 요청 없음" message="등록된 환불 요청이 없습니다." />;

  // 페이지네이션
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentData = filtered.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  // 모달 열기
  const openProcessModal = (req) => {
    dispatch(openModal({ content: <RefundProcessDialog request={req} /> }));
  };
  const openDetailModal = (reqId) => {
    dispatch(openModal({ content: <AdminRefundDetailModal refundRequestId={reqId} /> }));
  };

  return (
      <div className="flex flex-col gap-6 h-full">
        <header className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">환불 요청 관리</h2>
        </header>

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
              const isProcessed =
                  ["APPROVED", "REJECTED"].includes(r.status);

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
                        className="p-2 text-center text-gray-600 hover:underline cursor-pointer "
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
