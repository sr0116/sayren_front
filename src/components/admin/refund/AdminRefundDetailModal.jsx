"use client";

import { useRefundRequestByIdQuery } from "@/api/refundRequestApi";
import EmptyState from "@/components/common/EmptyState";
import StatusBadge from "@/components/common/StatusBadge";
import Button from "@/components/common/Button";
import dayjs from "dayjs";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/modalSlice";
import RefundProcessDialog from "@/components/admin/refund/RefundProcessDialog";
import { statusLabelMap } from "@/utils/statusLabelMap";

export default function AdminRefundDetailModal({ refundRequestId }) {
  const dispatch = useDispatch();
  const {
    data: refund,
    isLoading,
    isError,
  } = useRefundRequestByIdQuery(refundRequestId, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError)
    return (
        <EmptyState
            title="환불 상세 조회 실패"
            message="잠시 후 다시 시도해주세요."
        />
    );
  if (!refund)
    return (
        <EmptyState
            title="환불 정보 없음"
            message="존재하지 않는 환불 요청입니다."
        />
    );

  const isProcessed =
      ["APPROVED", "REJECTED"].includes(refund.status);

  const openProcessDialog = () => {
    if (!isProcessed) {
      dispatch(openModal({ content: <RefundProcessDialog request={refund} /> }));
    }
  };

  return (
      <div className="w-full max-w-[600px] space-y-10">
        {/* 헤더 */}
        <header className="border-b border-gray-200 pb-3">
          <h2 className="text-lg font-bold text-gray-900">환불 상세 (관리자용)</h2>
          <p className="text-sm text-gray-500 mt-1">
            요청번호 #{refund.refundRequestId}
          </p>
          {refund.buyerName && (
              <p className="text-sm text-gray-500">
                {refund.buyerName} ({refund.buyerEmail || "이메일 없음"})
              </p>
          )}
        </header>

        {/* 상품 정보 */}
        <section className="space-y-4">
          <h3 className="text-base font-semibold text-gray-800">상품 정보</h3>
          <div className="flex items-start gap-4">
            <div className="relative w-24 h-24 overflow-hidden rounded-md bg-gray-100 border">
              <Image
                  src={refund.productThumbnail || "/image/image2.svg"}
                  alt={refund.productName}
                  fill
                  sizes="96px"
                  className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-gray-900">{refund.productName}</p>
              <p className="text-sm text-gray-500 mt-1">
                {statusLabelMap.OrderPlanType[refund.orderPlanType] || "-"}
              </p>
              <p className="font-semibold text-gray-900 mt-2">
                {refund.amount?.toLocaleString()}원
              </p>
            </div>
          </div>
        </section>

        {/* 환불 정보 */}
        <section className="space-y-4">
          <h3 className="text-base font-semibold text-gray-800">환불 요청 정보</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">결제 ID</span>
              <span className="text-gray-900">{refund.paymentId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">환불 사유</span>
              <span className="text-gray-900">
              {statusLabelMap.ReasonCode[refund.reasonCode] || refund.reasonCode}
            </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">상태</span>
              <StatusBadge type="RefundRequestStatus" value={refund.status} />
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">요청일</span>
              <span className="text-gray-900">
              {dayjs(refund.regDate).format("YYYY-MM-DD HH:mm")}
            </span>
            </div>
            {refund.approvedAt && (
                <div className="flex justify-between">
                  <span className="text-gray-500">승인일</span>
                  <span className="text-gray-900">
                {dayjs(refund.approvedAt).format("YYYY-MM-DD HH:mm")}
              </span>
                </div>
            )}
            {refund.approvedBy && (
                <div className="flex justify-between">
                  <span className="text-gray-500">승인자</span>
                  <span className="text-gray-900">{refund.approvedBy}</span>
                </div>
            )}
          </div>
        </section>

        {/* 환불 금액 정보 */}
        <section className="space-y-4">
          <h3 className="text-base font-semibold text-gray-800">환불 금액 정보</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">결제 금액</span>
              <span className="font-medium text-gray-900">
              {refund.amount?.toLocaleString()}원
            </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">환불 예정 금액</span>
              <span className="font-medium text-gray-900">
              {refund.refundAmount?.toLocaleString() || "-"}원
            </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">환불 수단</span>
              <span className="text-gray-900">
              {refund.refundMethod || "카드 결제"}
            </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">처리 주체</span>
              <span className="text-gray-900">
              {statusLabelMap.ActorType[refund.actorType] || refund.actorType}
            </span>
            </div>
          </div>
        </section>

        {/* 하단 액션 */}
        <section className="pt-4 border-t border-gray-200">
          <div className="flex justify-end gap-3">
            <Button
                variant="primary"
                disabled={isProcessed}
                onClick={openProcessDialog}
            >
              {isProcessed ? "처리 완료" : "처리하기"}
            </Button>
          </div>
        </section>
      </div>
  );
}
