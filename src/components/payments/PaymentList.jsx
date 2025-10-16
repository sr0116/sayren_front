"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "@/store/modalSlice";
import { useQueryClient } from "@tanstack/react-query";
import { useApiQuery } from "@/hooks/useApi";
import { useDeletePaymentMutation } from "@/api/paymentApi";
import PaymentDetail from "@/components/payments/PaymentDetail";
import EmptyState from "@/components/common/EmptyState";
import StatusBadge from "@/components/common/StatusBadge";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import dayjs from "dayjs";
import RefundReasonForm from "@/components/refund/RefundReasonForm";
import { useCreateRefundRequestMutation } from "@/api/refundRequestApi";
import Pagination from "@/components/common/Pagination";
import { useSearchParams } from "next/navigation";

export default function PaymentList() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const itemsPerPage = 10;

  //  실시간 상태 감지
  const { data: allPayments = [], isError } = useApiQuery(
      ["payments"],
      "/api/user/payments",
      { refetchOnWindowFocus: true, refetchInterval: 10000 }
  );

  const handleDeleteConfirm = (paymentId) => {
    dispatch(
        openModal({
          content: (
              <ConfirmDialog
                  title="결제 내역 삭제"
                  message="이 결제 내역을 삭제하시겠습니까? 배송 중이거나 환불 진행 중인 결제는 삭제할 수 없습니다."
                  confirmText="삭제하기"
                  onConfirm={() => deleteMutation.mutate(paymentId)}
              />
          ),
        })
    );
  };

  const totalPages = Math.ceil(allPayments.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const payments = allPayments.slice(startIdx, startIdx + itemsPerPage);

  const deleteMutation = useDeletePaymentMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries(["payments"]);
      dispatch(closeModal());
    },
  });

  const createRefundMutation = useCreateRefundRequestMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      dispatch(
          openModal({
            content: (
                <ConfirmDialog
                    title="환불 요청 완료"
                    message={
                      <>
                        환불 요청이 접수되었습니다.
                        <br />
                        신속히 확인 후 상담사가 고객님께 연락드릴 예정입니다.
                      </>
                    }
                    hideCancel={true}
                />
            ),
          })
      );
    },
  });

  if (isError)
    return (
        <EmptyState
            title="결제 내역을 불러올 수 없습니다"
            message="일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        />
    );

  if (!payments.length)
    return (
        <EmptyState
            title="결제 내역이 없습니다"
            message="아직 결제하신 내역이 없습니다."
        />
    );

  return (
      <div className="w-full h-full space-y-10">
        <header className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">결제 내역</h2>
        </header>

        {payments.map((p) => {
          const thumbnail = p.productThumbnail || "/image/image2.svg";
          const statusLabelMap = {
            PAID: "결제 완료",
            PENDING: "결제 대기",
            FAILED: "결제 실패",
            REFUNDED: "환불 완료",
            PARTIAL_REFUNDED: "부분 환불",
            COMPLETED: "정상 종료",
          };
          const statusText = statusLabelMap[p.paymentStatus] || p.paymentStatus;

          return (
              <section
                  key={p.paymentId}
                  className="space-y-3 border-b border-gray-100 pb-6"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {dayjs(p.regDate).format("YYYY.MM.DD (dd)")}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">{statusText}</p>
                  </div>
                  <button
                      className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer"
                      onClick={() =>
                          dispatch(openModal({ content: <PaymentDetail paymentId={p.paymentId} /> }))
                      }
                  >
                    주문 상세
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg bg-white">
                  <div className="flex items-start gap-4 p-4">
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                      <Image
                          src={thumbnail}
                          alt={p.productName || "상품 이미지"}
                          fill
                          sizes="80px"
                          className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mt-1">
                        {p.orderPlanType === "RENTAL"
                            ? `렌탈 상품 • ${p.roundNo ? `${p.roundNo}회차 결제` : "회차 정보 없음"}`
                            : "일반 상품"}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">{p.productName}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        결제일 : {dayjs(p.regDate).format("HH:mm")}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {p.amount?.toLocaleString()}원
                      </p>
                    </div>

                    <div className="flex items-start justify-end">
                      <StatusBadge type="PaymentStatus" value={p.paymentStatus} />
                    </div>
                  </div>

                  {/* 버튼 3개 */}
                  <div className="grid grid-cols-3 border-t border-gray-100 text-sm text-gray-700">
                    <button
                        className="py-2 hover:bg-gray-50 transition cursor-pointer"
                        onClick={() =>
                            dispatch(openModal({ content: <PaymentDetail paymentId={p.paymentId} /> }))
                        }
                    >
                      주문상세
                    </button>

                    <button
                        className="py-2 border-l border-gray-100 hover:bg-gray-50 transition disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer"
                        onClick={() => handleRefundRequest(p)}
                        disabled={["REFUNDED", "PARTIAL_REFUNDED", "FAILED"].includes(
                            p.paymentStatus
                        )}
                    >
                      {p.refundStatus === "PENDING"
                          ? "환불 요청됨"
                          : p.refundStatus === "APPROVED_WAITING_RETURN"
                              ? "회수 대기"
                              : p.refundStatus === "APPROVED"
                                  ? "승인 완료"
                                  : p.refundStatus === "AUTO_REFUNDED"
                                      ? "자동 환불"
                                      : p.refundStatus === "REJECTED"
                                          ? "거절됨"
                                          : "환불 신청"}
                    </button>

                    <button
                        className="py-2 border-l border-gray-100 hover:bg-gray-50 transition text-gray-700 cursor-pointer"
                        onClick={() => handleDeleteConfirm(p.paymentId)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </section>
          );
        })}

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
