"use client";

import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAllPaymentsForAdminQuery } from "@/api/paymentApi";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/modalSlice";

import PaymentSummaryCards from "@/components/admin/payments/PaymentSummaryCards";
import PaymentFilterBar from "@/components/admin/payments/PaymentFilterBar";
import PaymentTable from "@/components/admin/payments/PaymentTable";
import PaymentDetailModal from "@/components/admin/payments/AdminPaymentDetailModal";
import Pagination from "@/components/common/Pagination";
import EmptyState from "@/components/common/EmptyState";


export default function AdminPaymentList() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { data: payments = [], isLoading, isError } = useAllPaymentsForAdminQuery();

  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 초기 데이터 세팅
  useEffect(() => {
    if (payments.length > 0) setFiltered(payments);
  }, [payments]);

  // 실시간 상태 갱신 (10초마다)
  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries(["allPayments"]);
    }, 10000);
    return () => clearInterval(interval);
  }, [queryClient]);

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError)
    return <div>결제 내역을 불러오는 중 오류가 발생했습니다.</div>;
  if (!payments.length)
    return <EmptyState title="결제 내역 없음" message="등록된 결제가 없습니다." />;

  // 필터/검색 적용 로직
  const handleFilter = ({ keyword, status, type, startDate, endDate }) => {
    let result = [...payments];

    // 검색어 (상품명, 회원명)
    if (keyword) {
      const lower = keyword.toLowerCase();
      result = result.filter(
          (p) =>
              p.productName?.toLowerCase().includes(lower) ||
              p.buyerName?.toLowerCase().includes(lower)
      );
    }

    // 상태 필터
    if (status) result = result.filter((p) => p.paymentStatus === status);

    // 유형 필터
    if (type) result = result.filter((p) => p.orderPlanType === type);

    // 날짜 필터
    if (startDate)
      result = result.filter((p) => new Date(p.regDate) >= new Date(startDate));
    if (endDate)
      result = result.filter((p) => new Date(p.regDate) <= new Date(endDate));

    setFiltered(result);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentData = filtered.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  const handleRowClick = (paymentId) => {
    dispatch(openModal({ content: <PaymentDetailModal paymentId={paymentId} /> }));
  };

  return (
      <div className="flex flex-col gap-6 h-full">
        {/* 필터 바 */}
        <PaymentFilterBar onFilter={handleFilter} />

        {/* 요약 카드 */}
        <PaymentSummaryCards payments={filtered} />

        {/* 결제 목록 */}
        <div className="flex-1 border border-gray-100 rounded-xl p-4 bg-white">
          <PaymentTable payments={currentData} onRowClick={handleRowClick} />

          <Pagination
              data={{
                page: currentPage,
                totalPages: totalPages,
                hasPrev: currentPage > 1,
                hasNext: currentPage < totalPages,
              }}
          />
        </div>
      </div>
  );
}
