"use client";

import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { openModal } from "@/store/modalSlice";
import { useAllDeliveriesQuery, useChangedDeliveryStatusMutation } from "@/api/deliveryApi";

import EmptyState from "@/components/common/EmptyState";
import Pagination from "@/components/common/Pagination";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useState, useEffect, useMemo } from "react";
import DeliveryTable from "@/components/admin/delivery/DeliveryTable";
import { useSearchParams, useRouter } from "next/navigation";

export default function AdminDeliveryListPage() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL 기반 페이지 관리
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const itemsPerPage = 10;

  //  API 호출 시 page, size 전달
  const { data, isLoading, isError } = useAllDeliveriesQuery(
    { page: currentPage, size: itemsPerPage },
  );

  //  최신순 정렬 추가 (regDate 기준 내림차순)
  const deliveries = useMemo(() => {
    const list = data?.list ?? [];
    return [...list].sort((a, b) => new Date(b.regDate) - new Date(a.regDate));
  }, [data]);

  const totalPages = data?.totalPages ?? 1;

  //  상태 변경 mutation
  const changeStatusMutation = useChangedDeliveryStatusMutation({
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries(["allDeliveries"]);
      dispatch(
        openModal({
          content: (
            <ConfirmDialog
              title="상태 변경 완료"
              message={`배송 ID ${variables.data.deliveryId} 상태가 [${variables.data.status}]로 변경되었습니다.`}
              hideCancel
            />
          ),
        })
      );
    },
    onError: () => {
      dispatch(
        openModal({
          content: (
            <ConfirmDialog
              title="오류 발생"
              message="상태 변경 중 오류가 발생했습니다."
              hideCancel
            />
          ),
        })
      );
    },
  });

  const handleStatusChange = (deliveryId, nextStatus) => {
    changeStatusMutation.mutate({
      data: { deliveryId, status: nextStatus },
    });
  };

  // 10초마다 자동 새로고침
  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries(["allDeliveries"]);
    }, 10000);
    return () => clearInterval(interval);
  }, [queryClient]);

  // 로딩/에러/빈값 처리
  if (isLoading)
    return <div className="p-4 text-gray-600">불러오는 중...</div>;
  if (isError)
    return <div className="p-4 text-red-600">배송 데이터를 불러올 수 없습니다.</div>;
  if (!deliveries.length)
    return (
      <EmptyState
        title="배송 내역 없음"
        message="등록된 배송 데이터가 없습니다."
      />
    );

  // Pagination 클릭 시 이동
  const handlePageChange = (page) => {
    router.push(`?page=${page}`);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <header className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">배송 관리</h2>
      </header>

      <div className="flex-1 border border-gray-100 rounded-xl bg-white shadow-sm p-4">
        {/* 최신순 + 회원명 추가된 테이블 */}
        <DeliveryTable
          deliveries={deliveries}
          onStatusChange={handleStatusChange}
        />

        {/*  페이지네이션 */}
        <div className="mt-6 flex justify-center">
          <Pagination
            data={{
              page: currentPage,
              totalPages,
              hasPrev: currentPage > 1,
              hasNext: currentPage < totalPages,
            }}
            onChangePage={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
