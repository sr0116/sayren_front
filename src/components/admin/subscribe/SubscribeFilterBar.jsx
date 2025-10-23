"use client";

import { useState } from "react";
import Button from "@/components/common/Button";

/**
 * 관리자 구독 필터 바 (결제용 구조 동일)
 */
export default function SubscribeFilterBar({ onFilter }) {
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilter = () => {
    onFilter({ keyword, status, startDate, endDate });
  };

  const handleReset = () => {
    setKeyword("");
    setStatus("");
    setStartDate("");
    setEndDate("");
    onFilter({ keyword: "", status: "", startDate: "", endDate: "" });
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
              placeholder="상품명 또는 회원명 검색"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        {/* 상태 필터 */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">구독 상태</label>
          <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          >
            <option value="">전체</option>
            <option value="PREPARING">준비중</option>
            <option value="ACTIVE">진행중</option>
            <option value="ENDED">종료</option>
            <option value="CANCELED">취소됨</option>
            <option value="OVERDUE">연체</option>
          </select>
        </div>

        {/* 날짜 필터 */}
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

        {/* 버튼 */}
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
