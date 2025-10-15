"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "@/store/modalSlice";
import { useQueryClient } from "@tanstack/react-query";
import { useApiQuery } from "@/hooks/useApi";
import {
  useDeletePaymentMutation,
} from "@/api/paymentApi";
import PaymentDetail from "@/components/payments/PaymentDetail";
import EmptyState from "@/components/common/EmptyState";
import StatusBadge from "@/components/common/StatusBadge";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import dayjs from "dayjs";

export default function PaymentList() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data: payments = [], isError } = useApiQuery(
      ["payments"],
      "/api/user/payments",
      { refetchOnWindowFocus: false }
  );

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

  const handleOpenDetail = (paymentId) => {
    dispatch(openModal({ content: <PaymentDetail paymentId={paymentId} /> }));
  };

  const handleDeleteConfirm = (paymentId) => {
    console.log("삭제 요청 ID:", paymentId);
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
                        {p.orderPlanType === "RENTAL" ? "렌탈 상품" : "일반 상품"}
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

                  <div className="grid grid-cols-3 border-t border-gray-100 text-sm text-gray-700">
                    <button className="py-2 hover:bg-gray-50 transition">
                      배송 조회
                    </button>
                    <button
                        className="py-2 border-l border-gray-100 hover:bg-gray-50 transition"
                        onClick={() => alert("환불 신청 기능 연결 예정")}
                    >
                      환불 신청
                    </button>
                    <button
                        className="py-2 border-l border-gray-100 text-red-600 hover:bg-gray-50 transition"
                        onClick={() => handleDeleteConfirm(p.paymentId)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </section>
          );
        })}
      </div>
  );
}
