"use client";

import { useState } from "react";
import Button from "@/components/common/Button";

/**
 * 관리자 결제 필터바 (고정값 제거, 유연 반응형 정렬)
 */
export default function PaymentFilterBar({ onFilter }) {
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilter = () => {
    onFilter({ keyword, status, type, startDate, endDate });
  };

  const handleReset = () => {
    setKeyword("");
    setStatus("");
    setType("");
    setStartDate("");
    setEndDate("");
    onFilter({ keyword: "", status: "", type: "", startDate: "", endDate: "" });
  };

  return (
      <div className="flex flex-wrap items-end gap-4 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        {/* 검색 */}
        <div className="flex flex-col flex-1 min-w-[200px]">
          <label className="text-sm font-medium text-gray-600 mb-1">검색</label>
          <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="예: 검색어를 입력해주세요"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        {/* 결제 상태 */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">결제 상태</label>
          <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          >
            <option value="">전체</option>
            <option value="PAID">결제 완료</option>
            <option value="REFUNDED">환불 완료</option>
            <option value="CANCELED">취소됨</option>
            <option value="FAILED">결제 실패</option>
          </select>
        </div>

        {/* 결제 유형 */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">결제 유형</label>
          <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          >
            <option value="">전체</option>
            <option value="PURCHASE">일반 결제</option>
            <option value="RENTAL">구독 결제</option>
          </select>
        </div>

        {/* 날짜 */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">시작일</label>
          <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">종료일</label>
          <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        {/* 버튼 영역 */}
        <div className="flex flex-row justify-end items-center gap-2 ml-auto">
          <Button
              variant="outline"
              onClick={handleReset}
              className="text-sm font-medium px-4 py-2 whitespace-nowrap"
          >
            초기화
          </Button>
          <Button
              variant="primary"
              onClick={handleFilter}
              className="text-sm font-medium px-4 py-2 whitespace-nowrap"
          >
            검색
          </Button>
        </div>
      </div>
  );
}
