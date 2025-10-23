"use client";

import { useSubscribeByIdQuery } from "@/api/subscribeApi";
import dayjs from "dayjs";
import StatusBadge from "@/components/common/StatusBadge";

/**
 * 관리자 구독 상세 모달
 * - 결제 상세(AdminPaymentDetailModal)와 동일한 레이아웃 유지
 * - 구독 필드 중심으로 표시
 */
export default function AdminSubscribeDetailModal({ subscribeId }) {
  const { data: subscribe, isLoading, isError } = useSubscribeByIdQuery(subscribeId);

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError || !subscribe) return <div>구독 상세 조회 실패</div>;

  return (
      <div className="space-y-8 w-full max-w-[650px]">
        {/* 헤더 */}
        <header className="border-b border-gray-200 pb-3">
          <h2 className="text-lg font-bold text-gray-900">구독 상세 (관리자용)</h2>
          <p className="text-sm text-gray-500 mt-1">
            Subscribe ID: {subscribe.subscribeId}
          </p>
          {subscribe.memberName && (
              <p className="text-sm text-gray-500">
                {subscribe.memberName} ({subscribe.memberEmail || "이메일 없음"})
              </p>
          )}
        </header>

        {/* 상품 정보 */}
        <section className="space-y-3">
          <h3 className="text-base font-semibold text-gray-800">상품 정보</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">상품명</span>
              <span className="font-medium text-gray-900 text-right">
              {subscribe.productName}
            </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">카테고리</span>
              <span className="text-gray-800 text-right">
              {subscribe.productCategory || "-"}
            </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">월 렌탈료</span>
              <span className="font-semibold text-gray-900 text-right">
              {subscribe.monthlyFeeSnapshot?.toLocaleString()}원
            </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">보증금</span>
              <span className="font-semibold text-gray-900 text-right">
              {subscribe.depositSnapshot?.toLocaleString()}원
            </span>
            </div>
          </div>
        </section>

        {/* 구독 기간 */}
        <section className="space-y-3">
          <h3 className="text-base font-semibold text-gray-800">구독 기간</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">총 이용 개월 수</span>
              <span className="text-gray-800">{subscribe.totalMonths}개월</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">시작일</span>
              <span className="text-gray-800">
              {subscribe.startDate
                  ? dayjs(subscribe.startDate).format("YYYY-MM-DD")
                  : "-"}
            </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">종료일</span>
              <span className="text-gray-800">
              {subscribe.endDate
                  ? dayjs(subscribe.endDate).format("YYYY-MM-DD")
                  : "진행 중"}
            </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">신청일</span>
              <span className="text-gray-800">
              {dayjs(subscribe.regDate).format("YYYY-MM-DD HH:mm")}
            </span>
            </div>
          </div>
        </section>

        {/* 상태 정보 */}
        <section className="space-y-3">
          <h3 className="text-base font-semibold text-gray-800">상태 정보</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">구독 상태</span>
            <StatusBadge type="SubscribeStatus" value={subscribe.status} />
          </div>

          {subscribe.reasonCode && (
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">사유 코드</span>
                <StatusBadge type="ReasonCode" value={subscribe.reasonCode} />
              </div>
          )}

          {subscribe.refundRequestStatus && (
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">환불 상태</span>
                <StatusBadge
                    type="RefundRequestStatus"
                    value={subscribe.refundRequestStatus}
                />
              </div>
          )}
        </section>

        {/* 회원 정보 */}
        <section className="space-y-3 border-t border-gray-200 pt-3">
          <h3 className="text-base font-semibold text-gray-800">회원 정보</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">회원명</span>
              <span className="text-gray-800">{subscribe.memberName || "-"}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">이메일</span>
              <span className="text-gray-800">{subscribe.memberEmail || "-"}</span>
            </div>

            {subscribe.memberTel && (
                <div className="flex justify-between">
                  <span className="text-gray-500">전화번호</span>
                  <span className="text-gray-800">{subscribe.memberTel}</span>
                </div>
            )}
          </div>
        </section>
      </div>
  );
}
