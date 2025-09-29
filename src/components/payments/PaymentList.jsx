"use client";

import { useRecentPaymentsQuery, useRefundPaymentMutation } from "@/api/paymentApi";
import StatusBadge from "@/components/common/StatusBadge";
import EmptyState from "@/components/common/EmptyState";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { openModal } from "@/store/modalSlice";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

export default function PaymentList() {
  const dispatch = useDispatch();

  // 최근 결제 내역 조회
  const { data, isLoading, isError } = useRecentPaymentsQuery({
    staleTime: 1000 * 60,
  });

  // 환불 요청 mutation
  const refundMutation = useRefundPaymentMutation();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>결제 내역을 불러오는 중 오류가 발생했습니다.</div>;

  // PaymentSummaryDTO 리스트 구조 맞춤
  const payments = Array.isArray(data) ? data : data?.list ?? [];

  const handleRefund = (paymentId) => {
    dispatch(
        openModal({
          content: (
              <ConfirmDialog
                  title="환불 요청"
                  message="정말 환불을 요청하시겠습니까?"
                  onConfirm={() => {
                    refundMutation.mutate(
                        { paymentId },
                        {
                          onSuccess: () => {
                            alert("환불 요청이 완료되었습니다.");
                          },
                          onError: () => {
                            alert("환불 요청 중 오류가 발생했습니다.");
                          },
                        }
                    );
                  }}
              />
          ),
        })
    );
  };

  if (payments.length === 0) {
    return (
        <EmptyState
            title="결제 내역이 없습니다"
            message="아직 결제하신 내역이 없습니다."
        />
    );
  }

  return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">결제 내역</h2>
        <div className="space-y-4">
          {payments.map((p) => (
              <div
                  key={p.paymentId}
                  className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">결제번호: {p.paymentId}</p>
                  <p className="text-sm text-gray-500">
                    결제일: {dayjs(p.regDate).format("YYYY-MM-DD HH:mm")}
                  </p>
                  <p className="text-sm text-gray-500">
                    금액: {p.amount?.toLocaleString()}원
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge type="PaymentStatus" status={p.paymentStatus} />
                  {p.paymentStatus === "PAID" && (
                      <button
                          onClick={() => handleRefund(p.paymentId)}
                          className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
                      >
                        환불 요청
                      </button>
                  )}
                </div>
              </div>
          ))}
        </div>
      </div>
  );
}
