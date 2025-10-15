"use client";

import Image from "next/image";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useApiQuery } from "@/hooks/useApi";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "@/store/modalSlice";
import PaymentDetail from "@/components/payments/PaymentDetail";
import EmptyState from "@/components/common/EmptyState";
import dayjs from "dayjs";
import { useQueryClient } from "@tanstack/react-query";
import StatusBadge from "@/components/common/StatusBadge";
import RefundReasonForm from "@/components/refund/RefundReasonForm";
import RefundRequestButton from "@/components/refund/RefundRequestButton";
import Button from "@/components/common/Button";
import ConfirmDialog from "@/components/common/ConfirmDialog";

export default function PaymentList() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const router = useRouter();
  const formRef = useRef(null);

  // 결제 내역 조회
  const {
    data: payments = [],
    isError,
  } = useApiQuery(["payments"], "/api/user/payments", {
    refetchOnWindowFocus: false,
  });

  // 상태 갱신
  const handleRefresh = async () => {
    await queryClient.invalidateQueries(["payments"]);
  };

  // 결제 상세 모달 열기
  const handleOpenDetail = (paymentId) => {
    dispatch(openModal({ content: <PaymentDetail paymentId={paymentId} /> }));
  };

  // 환불 신청 모달 열기
  const handleRefundModal = (payment) => {
    // 구독 상품일 경우 구독 취소 안내 및 이동 처리
    if (payment.orderPlanType === "RENTAL" && payment.subscribeId) {
      dispatch(
          openModal({
            content: (
                <ConfirmDialog
                    title="구독 취소 요청 필요"
                    message={`이 결제는 구독 상품에 포함되어 있습니다.\n환불 전에 구독 취소 요청을 먼저 진행해주세요.`}
                    confirmText="구독 페이지로 이동"
                    onConfirm={() => {
                      router.push(`/mypage/subscribe/${payment.subscribeId}`);
                    }}
                />
            ),
          })
      );
      return;
    }

    // 일반 결제일 경우 환불 요청 폼 표시
    dispatch(
        openModal({
          content: (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">환불 요청</h2>
                <RefundReasonForm ref={formRef} />
                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="outline" onClick={() => dispatch(closeModal())}>
                    취소
                  </Button>
                  <Button
                      variant="primary"
                      onClick={() => {
                        const selectedReason =
                            formRef.current?.getSelectedReason?.() || "USER_REQUEST";
                        handleRefundSubmit(payment, selectedReason);
                      }}
                  >
                    신청하기
                  </Button>
                </div>
              </div>
          ),
        })
    );
  };

  // 실제 환불 요청 처리
  const handleRefundSubmit = async (payment, reasonCode) => {
    dispatch(
        openModal({
          content: (
              <RefundRequestButton
                  paymentId={payment.paymentId}
                  paymentStatus={payment.paymentStatus}
                  refundStatus={payment.refundStatus}
                  reasonCode={reasonCode}
                  onSuccess={async () => {
                    await queryClient.invalidateQueries(["payments"]);
                  }}
              />
          ),
        })
    );
  };

  // 오류 또는 빈 상태 처리
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

  // 렌더링
  return (
      <div className="w-full h-full space-y-10">
        <header className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">결제 내역</h2>
          <button
              onClick={handleRefresh}
              className="text-sm text-gray-500 hover:text-gray-800 transition"
          >
            새로고침
          </button>
        </header>

        {payments.map((p) => {
          const isRental = p.orderPlanType === "RENTAL";
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
                      className="text-xs text-gray-500 hover:text-gray-700"
                      onClick={() => handleOpenDetail(p.paymentId)}
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
                        {isRental ? "렌탈 상품" : "일반 상품"}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {p.productName}
                      </p>
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

                  <div className="grid grid-cols-2 border-t border-gray-100 text-sm text-gray-700">
                    <button
                        className="py-2 hover:bg-gray-50 transition"
                        onClick={() => alert("배송 조회 기능 연결 예정")}
                    >
                      배송 조회
                    </button>
                    <button
                        className="py-2 border-l border-gray-100 hover:bg-gray-50 transition"
                        onClick={() => handleRefundModal(p)}
                        disabled={
                          !["PAID", "COMPLETED", "PARTIAL_REFUNDED"].includes(
                              p.paymentStatus
                          )
                        }
                    >
                      환불 신청
                    </button>
                  </div>
                </div>
              </section>
          );
        })}
      </div>
  );
}
