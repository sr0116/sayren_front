"use client";

import PaymentFilterBar from "@/components/admin/payments/PaymentFilterBar";
import PaymentSummaryCard from "@/components/admin/payments/PaymentSummaryCard";
import AdminPaymentTable from "@/components/admin/payments/PaymentTable";
import Pagination from "@/components/common/Pagination";
import { useAllPaymentsForAdminQuery } from "@/api/paymentApi";
import { useState } from "react";
import EmptyState from "@/components/common/EmptyState";
import { openModal } from "@/store/modalSlice";
import { useDispatch } from "react-redux";
import AdminPaymentDetail from "@/components/admin/payments/AdminPaymentDetailModal";

export default function AdminPaymentPage() {
  const { data: payments = [], isLoading } = useAllPaymentsForAdminQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const itemsPerPage = 10;
  const totalPages = Math.ceil(payments.length / itemsPerPage);
  const currentData = payments.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  const handleRowClick = (paymentId) => {
    dispatch(openModal({ content: <AdminPaymentDetail paymentId={paymentId} /> }));
  };

  if (isLoading)
    return <div className="text-center py-10 text-gray-500">로딩 중...</div>;

  if (!payments.length)
    return (
        <EmptyState
            title="결제 내역이 없습니다"
            message="아직 결제 기록이 없습니다."
        />
    );

  return (
      <div className="max-w-[1400px] mx-auto px-6 py-8 space-y-8">
        {/* 필터바 */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
          <PaymentFilterBar />
        </section>

        {/* 요약 카드 */}
        <section className="mt-2">
          <PaymentSummaryCard />
        </section>

        {/* 테이블 */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
          <AdminPaymentTable payments={currentData} onRowClick={handleRowClick} />

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
        </section>
      </div>
  );
}
