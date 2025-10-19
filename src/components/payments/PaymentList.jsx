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

  // 현재 페이지 번호 (URL 파라미터 기준)
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const itemsPerPage = 10;

  // 결제 내역 조회 API 호출
  const { data: allPayments = [], isError } = useApiQuery(
      ["payments"],
      "/api/user/payments",
      { refetchOnWindowFocus: false }
  );

  // 페이지네이션 계산
  const totalPages = Math.ceil(allPayments.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const payments = allPayments.slice(startIdx, startIdx + itemsPerPage);

  // 결제 내역 삭제 Mutation
  const deleteMutation = useDeletePaymentMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries(["payments"]);
      dispatch(closeModal());
    },
    onError: (err) => {
      console.error("결제 삭제 실패:", err);
      alert(err?.response?.data?.message || "결제 삭제 중 오류가 발생했습니다.");
    },
  });

  // 환불 요청 생성 Mutation
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
                        신속히 확인 후 상담사가 고객님께 연락드려 진행 절차를 안내해드리겠습니다.
                      </>
                    }
                    hideCancel={true}
                />
            ),
          })
      );
    },
    onError: (error) => {
      console.error("환불 요청 실패:", error);
      const message =
          error?.response?.data?.message || "환불 요청 중 오류가 발생했습니다.";

      // 이미 환불 요청된 경우 안내 모달 표시
      if (message.includes("이미 환불 요청이 접수되었습니다")) {
        dispatch(
            openModal({
              content: (
                  <ConfirmDialog
                      title="중복 환불 요청"
                      message={
                        <>
                          이미 해당 결제 건에 대한 환불 요청이 접수되었습니다.
                          <br />
                          처리 완료 후 다시 시도해주세요.
                        </>
                      }
                      hideCancel={true}
                  />
              ),
            })
        );
        return;
      }

      // 일반 오류 처리
      alert(message);
    },
  });

  // 결제 상세 보기 모달
  const handleOpenDetail = (paymentId) => {
    dispatch(openModal({ content: <PaymentDetail paymentId={paymentId} /> }));
  };

  // 결제 내역 삭제 확인 모달
  const handleDeleteConfirm = (paymentId) => {
    dispatch(
        openModal({
          content: (
              <ConfirmDialog
                  title="결제 내역 삭제"
                  message="이 결제 내역을 삭제하시겠습니까?"
                  confirmText="삭제하기"
                  onConfirm={() => deleteMutation.mutate(paymentId)}
              />
          ),
        })
    );
  };

  // 환불 요청 처리 로직
  const handleRefundRequest = (p) => {
    // 구독(렌탈) 상품은 직접 환불 불가
    if (p.orderPlanType === "RENTAL") {
      dispatch(
          openModal({
            content: (
                <ConfirmDialog
                    title="환불 불가"
                    message={
                      <>
                        구독(렌탈) 상품은 바로 환불이 불가능합니다.
                        <br />
                        먼저 구독 취소 요청을 진행한 뒤 환불 처리가 가능합니다.
                      </>
                    }
                    hideCancel={true}
                />
            ),
          })
      );
      return;
    }

    // 이미 환불 요청 진행 중인 상태
    if (
        ["PENDING", "APPROVED_WAITING_RETURN", "APPROVED"].includes(
            p.refundStatus
        )
    ) {
      dispatch(
          openModal({
            content: (
                <ConfirmDialog
                    title="환불 요청 중"
                    message={
                      <>
                        이미 환불 요청이 진행 중입니다.
                        <br />
                        처리 완료 후 다시 시도해주세요.
                      </>
                    }
                    hideCancel={true}
                />
            ),
          })
      );
      return;
    }

    // 환불 요청 폼 모달 (사유 선택 포함)
    const reasonRef = { current: null };
    dispatch(
        openModal({
          content: (
              <ConfirmDialog
                  title="환불 요청"
                  message={<RefundReasonForm ref={reasonRef} />}
                  onConfirm={() => {
                    const selectedReason = reasonRef.current?.getSelectedReason();
                    if (!selectedReason) {
                      alert("환불 사유를 선택해주세요.");
                      return;
                    }

                    createRefundMutation.mutate({
                      data: { paymentId: p.paymentId, reasonCode: selectedReason },
                    });
                  }}
              />
          ),
        })
    );
  };

  // 예외 처리 (API 오류)
  if (isError)
    return (
        <EmptyState
            title="결제 내역을 불러올 수 없습니다"
            message="일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        />
    );

  // 결제 내역이 없을 경우
  if (!payments.length)
    return (
        <EmptyState
            title="결제 내역이 없습니다"
            message="아직 결제하신 내역이 없습니다."
        />
    );

  // 화면 렌더링
  return (
      <div className="w-full h-full space-y-10">
        {/* 상단 제목 */}
        <header className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">결제 내역</h2>
        </header>

        {/* 결제 리스트 */}
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
                {/* 상단 결제일/상태 */}
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

                {/* 결제 카드 */}
                <div className="border border-gray-200 rounded-lg bg-white">
                  <div className="flex items-start gap-4 p-4">
                    {/* 상품 이미지 */}
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                      <Image
                          src={thumbnail}
                          alt={p.productName || "상품 이미지"}
                          fill
                          sizes="80px"
                          className="object-cover"
                      />
                    </div>

                    {/* 상품 정보 */}
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mt-1">
                        {p.orderPlanType === "RENTAL"
                            ? "렌탈 상품"
                            : "일반 상품"}
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

                    {/* 결제 상태 배지 */}
                    <div className="flex items-start justify-end">
                      <StatusBadge type="PaymentStatus" value={p.paymentStatus} />
                    </div>
                  </div>

                  {/* 하단 버튼 영역 */}
                  <div className="grid grid-cols-3 border-t border-gray-100 text-sm text-gray-700">
                    {/* 주문 상세 */}
                    <button
                        className="py-2 hover:bg-gray-50 transition"
                        onClick={() => handleOpenDetail(p.paymentId)}
                    >
                      주문상세
                    </button>

                    {/* 환불 신청 */}
                    <button
                        className="py-2 border-l border-gray-100 hover:bg-gray-50 transition disabled:text-gray-400 disabled:cursor-not-allowed"
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


                    {/* 결제 삭제 */}
                    <button
                        className="py-2 border-l border-gray-100 hover:bg-gray-50 transition text-gray-700"
                        onClick={() => handleDeleteConfirm(p.paymentId)}
                    >
                      삭제
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
