"use client";

import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAllSubscribesForAdminQuery } from "@/api/subscribeApi";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/modalSlice";

import Pagination from "@/components/common/Pagination";
import EmptyState from "@/components/common/EmptyState";
import SubscribeFilterBar from "@/components/admin/subscribe/SubscribeFilterBar";
import AdminSubscribeSummaryCards from "@/components/admin/subscribe/AdminSubscribeSummaryCards";
import AdminSubscribeTable from "@/components/admin/subscribe/AdminSubscribeTable";
import AdminSubscribeDetailModal from "@/components/admin/subscribe/AdminSubscribeDetailModal";

export default function SubscribeList() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { data: subscribes = [], isLoading, isError } = useAllSubscribesForAdminQuery();

  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 초기 데이터 세팅
  useEffect(() => {
    if (subscribes.length > 0) setFiltered(subscribes);
  }, [subscribes]);

  // 실시간 상태 갱신 (10초마다)
  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries(["allSubscribes"]);
    }, 10000);
    return () => clearInterval(interval);
  }, [queryClient]);

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>구독 내역을 불러오는 중 오류가 발생했습니다.</div>;
  if (!subscribes.length)
    return <EmptyState title="구독 내역 없음" message="등록된 구독이 없습니다." />;

  // 필터 / 검색 로직
  const handleFilter = ({ keyword, status, startDate, endDate }) => {
    let result = [...subscribes];

    if (keyword) {
      const lower = keyword.toLowerCase();
      result = result.filter(
          (s) =>
              s.productName?.toLowerCase().includes(lower) ||
              s.memberName?.toLowerCase().includes(lower)
      );
    }

    if (status) result = result.filter((s) => s.status === status);

    if (startDate)
      result = result.filter((s) => new Date(s.regDate) >= new Date(startDate));
    if (endDate)
      result = result.filter((s) => new Date(s.regDate) <= new Date(endDate));

    setFiltered(result);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentData = filtered.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  const handleRowClick = (subscribeId) => {
    dispatch(openModal({ content: <AdminSubscribeDetailModal subscribeId={subscribeId} /> }));
  };

  return (
      <div className="flex flex-col gap-6 h-full">
        {/* 필터 바 */}
        <SubscribeFilterBar onFilter={handleFilter} />

        {/* 요약 카드 */}
        <AdminSubscribeSummaryCards subscribes={filtered} />

        {/* 구독 목록 테이블 */}
        <div className="flex-1 border border-gray-100 rounded-xl p-4 bg-white">
          <AdminSubscribeTable subscribes={currentData} onRowClick={handleRowClick} />

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
