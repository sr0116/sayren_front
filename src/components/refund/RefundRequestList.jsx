"use client";

import Image from "next/image";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/modalSlice";
import { useMyRefundRequestsQuery } from "@/api/refundRequestApi";
import EmptyState from "@/components/common/EmptyState";
import StatusBadge from "@/components/common/StatusBadge";
import RefundRequestDetail from "@/components/refund/RefundRequestDetail";
import Button from "@/components/common/Button";

export default function RefundRequestList() {
  const dispatch = useDispatch();
  const {
    data: refundRequests = [],
    isLoading,
    isError,
  } = useMyRefundRequestsQuery({
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError)
    return (
        <EmptyState
            title="환불 요청 조회 실패"
            message="잠시 후 다시 시도해주세요."
        />
    );
  if (!refundRequests.length)
    return (
        <EmptyState
            title="환불 요청 내역이 없습니다"
            message="환불 요청 기록이 표시됩니다."
        />
    );

  const handleOpenDetail = (refundRequestId) => {
    dispatch(
        openModal({
          content: <RefundRequestDetail refundRequestId={refundRequestId} />,
        })
    );
  };

  const reasonLabelMap = {
    USER_REQUEST: "사용자 요청",
    PRODUCT_DEFECT: "상품 불량",
    DELIVERY_DELAY: "배송 지연",
    SYSTEM_ERROR: "시스템 오류",
    CHANGE_OF_MIND: "단순 변심",
  };

  return (
      <div className="w-full h-full space-y-10">
        {/* 상단 타이틀 */}
        <header className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">환불 요청 내역</h2>
        </header>

        {/* 카드 리스트 */}
        {refundRequests.map((req) => {
          const thumbnail = req.productThumbnail || "/image/image2.svg";
          const reason = reasonLabelMap[req.reasonCode] || req.reasonCode;
          const formattedDate = dayjs(req.regDate).format("YYYY.MM.DD (dd)");

          return (
              <section
                  key={req.refundRequestId}
                  className="space-y-3 border-b border-gray-100 pb-6"
              >
                {/* 상단 날짜, 요청번호 */}
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {formattedDate}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {reason} • 요청번호 #{req.refundRequestId}
                    </p>
                  </div>
                  <button
                      className="text-xs text-gray-500 hover:text-gray-700"
                      onClick={() => handleOpenDetail(req.refundRequestId)}
                  >
                    상세 보기
                  </button>
                </div>

                {/* 본문 카드 */}
                <div className="border border-gray-200 rounded-lg bg-white">
                  <div className="flex items-start gap-4 p-4">
                    {/* 썸네일 */}
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                      <Image
                          src={thumbnail}
                          alt={req.productName || "상품 이미지"}
                          fill
                          sizes="80px"
                          className="object-cover"
                      />
                    </div>

                    {/* 상품 정보 */}
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mt-1">
                        {req.orderPlanType === "RENTAL"
                            ? "렌탈 상품"
                            : "일반 상품"}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {req.productName}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        요청일 : {dayjs(req.regDate).format("HH:mm")}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {req.amount?.toLocaleString()}원
                      </p>
                    </div>

                    {/* 상태 뱃지 */}
                    <div className="flex items-start justify-end">
                      <StatusBadge type="RefundRequestStatus" value={req.status} />
                    </div>
                  </div>

                  {/* 하단 버튼 */}
                  <div className="grid grid-cols-2 border-t border-gray-100 text-sm text-gray-700">
                    <button
                        className="py-2 hover:bg-gray-50 transition"
                        onClick={() => handleOpenDetail(req.refundRequestId)}
                    >
                      상세 보기
                    </button>

                    <button
                        className="py-2 border-l border-gray-100 hover:bg-gray-50 transition disabled:text-gray-400 disabled:cursor-not-allowed"
                        onClick={() => alert("요청 취소 기능 예정")}
                        disabled={["APPROVED", "REJECTED", "CANCELED"].includes(req.status)}
                    >
                      {req.status === "PENDING" ? "요청 취소" : "처리 완료"}
                    </button>
                  </div>
                </div>
              </section>
          );
        })}
      </div>
  );
}
