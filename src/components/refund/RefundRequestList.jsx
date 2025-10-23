"use client";

import Image from "next/image";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "@/store/modalSlice";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import {
  useMyRefundRequestsQuery,
  useCancelRefundRequestMutation,
} from "@/api/refundRequestApi";

import EmptyState from "@/components/common/EmptyState";
import StatusBadge from "@/components/common/StatusBadge";
import RefundRequestDetail from "@/components/refund/RefundRequestDetail";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import RefundPolicyModal from "@/components/refund/RefundPolicyModal";
import RefundPolicyPurchaseModal from "@/components/refund/RefundPolicyPurchaseModal";
import RefundPolicyRentalModal from "@/components/refund/RefundPolicyRentalModal";
import Pagination from "@/components/common/Pagination";

export default function RefundRequestList() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const itemsPerPage = 10;

  // 환불 요청 목록 조회
  const { data: allRequests = [], isLoading, isError } = useMyRefundRequestsQuery({
    refetchOnWindowFocus: true,
    refetchInterval: 10000, // 10초마다 갱신
  });

  const totalPages = Math.ceil(allRequests.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const refundRequests = allRequests.slice(startIdx, startIdx + itemsPerPage);

  // 환불 요청 취소 Mutation
  const cancelMutation = useCancelRefundRequestMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries(["myRefundRequests"]);
      dispatch(
          openModal({
            content: (
                <ConfirmDialog
                    title="취소 완료"
                    message="환불 요청이 정상적으로 취소되었습니다."
                    hideCancel
                    confirmText="확인"
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
                    title="취소 실패"
                    message="환불 요청 취소 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
                    hideCancel
                    confirmText="닫기"
                />
            ),
          })
      );
    },
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
            message="아직 환불 요청을 하신 내역이 없습니다."
        />
    );

  const handleOpenDetail = (refundRequestId) => {
    dispatch(
        openModal({
          content: <RefundRequestDetail refundRequestId={refundRequestId} />,
        })
    );
  };

  const handleCancelRequest = (refundRequestId) => {
    dispatch(
        openModal({
          content: (
              <ConfirmDialog
                  title="환불 요청 취소"
                  message="해당 환불 요청을 취소하시겠습니까?"
                  onConfirm={() =>
                      cancelMutation.mutate({ params: { id: refundRequestId } })
                  }
                  onCancel={() => dispatch(closeModal())}
              />
          ),
        })
    );
  };

  const handleOpenCommonPolicy = () => {
    dispatch(openModal({ content: <RefundPolicyModal /> }));
  };

  const handleOpenSpecificPolicy = (type) => {
    dispatch(
        openModal({
          content:
              type === "RENTAL" ? (
                  <RefundPolicyRentalModal />
              ) : (
                  <RefundPolicyPurchaseModal />
              ),
        })
    );
  };

  const reasonLabelMap = {
    USER_REQUEST: "사용자 요청",
    PRODUCT_DEFECT: "상품 불량",
    DELIVERY_ISSUE: "배송 문제",
    SYSTEM_ERROR: "시스템 오류",
    CHANGE_OF_MIND: "단순 변심",
  };

  return (
      <div className="w-full h-full space-y-10">
        {/* 상단 타이틀 */}
        <header className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">환불 요청 내역</h2>
          <button
              onClick={handleOpenCommonPolicy}
              className="px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-50 transition cursor-pointer"
          >
            공용 환불 규정 안내
          </button>
        </header>

        {/* 리스트 */}
        {refundRequests.map((req) => {
          const thumbnail = req.productThumbnail || "/image/image2.svg";
          const reason = reasonLabelMap[req.reasonCode] || req.reasonCode;
          const formattedDate = dayjs(req.regDate).format("YYYY.MM.DD (dd)");

          const isCancelable = req.status === "PENDING";
          const showRefundAmount =
              req.status === "APPROVED" || req.status === "AUTO_REFUNDED";

          return (
              <section
                  key={req.refundRequestId}
                  className="space-y-3 border-b border-gray-100 pb-6"
              >
                {/* 상단 정보 */}
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
                      className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer"
                      onClick={() => handleOpenDetail(req.refundRequestId)}
                  >
                    상세 보기
                  </button>
                </div>

                {/* 카드 본문 */}
                <div className="border border-gray-200 rounded-lg bg-white">
                  <div className="flex items-start gap-4 p-4">
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                      <Image
                          src={thumbnail}
                          alt={req.productName || "상품 이미지"}
                          fill
                          sizes="80px"
                          className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mt-1">
                        {req.orderPlanType === "RENTAL" ? "렌탈 상품" : "일반 상품"}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {req.productName}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        요청일 : {dayjs(req.regDate).format("HH:mm")}
                      </p>

                      {showRefundAmount && (
                          <p className="text-sm font-semibold text-gray-900 mt-1">
                            {/* 환불 금액 표시 예정 */}
                          </p>
                      )}
                    </div>

                    <div className="flex items-start justify-end">
                      <StatusBadge type="RefundRequestStatus" value={req.status} />
                    </div>
                  </div>

                  {/* 하단 버튼 */}
                  <div className="grid grid-cols-3 border-t border-gray-100 text-sm text-gray-700">
                    <button
                        className="py-2 hover:bg-gray-50 transition cursor-pointer"
                        onClick={() => handleOpenDetail(req.refundRequestId)}
                    >
                      상세 보기
                    </button>

                    <button
                        className="py-2 border-l border-gray-100 hover:bg-gray-50 transition cursor-pointer"
                        onClick={() => handleOpenSpecificPolicy(req.orderPlanType)}
                    >
                      {req.orderPlanType === "RENTAL"
                          ? "렌탈 환불 규정"
                          : "일반 환불 규정"}
                    </button>

                    <button
                        className={`py-2 border-l border-gray-100 transition cursor-pointer ${
                            isCancelable
                                ? "hover:bg-red-50 text-red-600"
                                : "text-gray-400 cursor-not-allowed"
                        }`}
                        onClick={() => handleCancelRequest(req.refundRequestId)}
                        disabled={!isCancelable}
                    >
                      {req.status === "PENDING"
                          ? "요청 취소"
                          : req.status === "APPROVED_WAITING_RETURN"
                              ? "회수 대기 중"
                              : req.status === "APPROVED"
                                  ? "환불 완료"
                                  : req.status === "REJECTED"
                                      ? "거절됨"
                                      : req.status === "CANCELED"
                                          ? "취소됨"
                                          : "처리 완료"}
                    </button>
                  </div>
                </div>
              </section>
          );
        })}

        {/* 페이지네이션 */}
        <div className="mt-8 flex justify-center">
          <Pagination
              data={{
                page: currentPage,
                totalPages,
                hasPrev: currentPage > 1,
                hasNext: currentPage < totalPages,
              }}
          />
        </div>
      </div>
  );
}
