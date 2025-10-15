"use client";

import { useSubscribeByIdQuery } from "@/api/subscribeApi";
import EmptyState from "@/components/common/EmptyState";
import StatusBadge from "@/components/common/StatusBadge";
import dayjs from "dayjs";

export default function AdminSubscribeCancelDetailModal({ subscribeId }) {
  const { data: subscribe, isLoading, isError } =
      useSubscribeByIdQuery(subscribeId);

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError)
    return (
        <EmptyState
            title="상세 조회 실패"
            message="잠시 후 다시 시도해주세요."
        />
    );
  if (!subscribe)
    return (
        <EmptyState title="구독 정보 없음" message="존재하지 않는 구독입니다." />
    );

  return (
      <div className="w-full max-w-[600px] space-y-10">
        {/* 헤더 */}
        <header className="border-b border-gray-200 pb-3">
          <h2 className="text-lg font-bold text-gray-900">구독 상세 (관리자용)</h2>
          <p className="text-sm text-gray-500 mt-1">
            구독 ID: {subscribe.subscribeId}
          </p>
          <p className="text-sm text-gray-500">
            {subscribe.memberName} ({subscribe.memberEmail || "이메일 없음"})
          </p>
        </header>

        {/* 구독 정보 */}
        <section className="space-y-4">
          <h3 className="text-base font-semibold text-gray-800">구독 정보</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">상품명</span>
              <span className="font-medium text-gray-900">
              {subscribe.productName}
            </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">보증금</span>
              <span className="font-medium text-gray-900">
              {subscribe.depositSnapshot?.toLocaleString()}원
            </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">월 렌탈료</span>
              <span className="font-medium text-gray-900">
              {subscribe.monthlyFeeSnapshot?.toLocaleString()}원
            </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">기간</span>
              <span className="text-gray-800">
              {dayjs(subscribe.startDate).format("YYYY-MM-DD")} ~{" "}
                {subscribe.endDate
                    ? dayjs(subscribe.endDate).format("YYYY-MM-DD")
                    : "진행 중"}
            </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">취소 사유</span>
              <span className="text-gray-800">{subscribe.reasonCode}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">상태</span>
              <StatusBadge type="SubscribeStatus" value={subscribe.status} />
            </div>
          </div>
        </section>
      </div>
  );
}
