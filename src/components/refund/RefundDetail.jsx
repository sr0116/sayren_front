"use client";

import { useRefundRequestByIdQuery } from "@/api/refundRequestApi";
import StatusBadge from "@/components/common/StatusBadge";
import EmptyState from "@/components/common/EmptyState";
import dayjs from "dayjs";
import Image from "next/image";

export default function RefundDetail({ refundRequestId }) {
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
            message="일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        />
    );

  if (!refund)
    return (
        <EmptyState
            title="환불 내역이 없습니다"
            message="존재하지 않는 환불 요청입니다."
        />
    );

  const reasonLabelMap = {
    USER_REQUEST: "사용자 요청",
    SYSTEM_ERROR: "시스템 오류",
    PRODUCT_DEFECT: "상품 불량",
    DELIVERY_DELAY: "배송 지연",
    CHANGE_OF_MIND: "단순 변심",
  };

  return (
      <div className="w-full max-w-[550px] space-y-10">
        {/* 헤더 */}
        <header className="border-b border-gray-200 pb-4">
          <h2 className="text-lg font-bold text-gray-900">환불 상세 정보</h2>
          <p className="text-sm text-gray-500 mt-1">
            요청번호 #{refund.refundRequestId ?? "-"}
          </p>
        </header>

        {/* 상품 정보 */}
        <section className="space-y-4">
          <h3 className="text-base font-semibold text-gray-800">상품 정보</h3>
          <div className="flex items-start gap-4">
            <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
              <Image
                  src={"/image/image2.svg"}
                  alt={refund.productName || "상품 이미지"}
                  fill
                  sizes="96px"
                  className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-medium text-gray-900">{refund.productName}</p>
              <p className="text-sm text-gray-500 mt-1">{refund.orderPlanType}</p>
              <p className="font-semibold text-gray-900 mt-2">
                {refund.amount?.toLocaleString()}원
              </p>
            </div>
          </div>
        </section>

        {/* 환불 요청 정보 */}
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
              {reasonLabelMap[refund.reasonCode] || refund.reasonCode}
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

            {refund.voidDate && (
                <div className="flex justify-between">
                  <span className="text-gray-500">처리일</span>
                  <span className="text-gray-900">
                {dayjs(refund.voidDate).format("YYYY-MM-DD HH:mm")}
              </span>
                </div>
            )}
          </div>
        </section>

        {/* 처리 결과 */}
        {refund.status === "APPROVED" && (
            <section className="border-t border-gray-200 pt-4">
              <p className="text-sm text-green-700 font-medium">
                환불이 승인되어 처리 중입니다.
              </p>
            </section>
        )}
        {refund.status === "REJECTED" && (
            <section className="border-t border-gray-200 pt-4">
              <p className="text-sm text-red-600 font-medium">
                환불 요청이 거절되었습니다.
              </p>
            </section>
        )}
      </div>
  );
}
