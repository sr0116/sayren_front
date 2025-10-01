"use client";

import { useApiQuery } from "@/hooks/useApi";
import StatusBadge from "@/components/common/StatusBadge";
import EmptyState from "@/components/common/EmptyState";
import { openModal } from "@/store/modalSlice";
import { useDispatch } from "react-redux";
import PaymentDetail from "@/components/payments/PaymentDetail";
import dayjs from "dayjs";

export default function PaymentList() {
  const dispatch = useDispatch();

  const { data: payments = [], isLoading, isError } = useApiQuery(
      ["payments"],
      "/api/user/payments"
  );

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>결제 내역을 불러오는 중 오류가 발생했습니다.</div>;

  if (payments.length === 0) {
    return (
        <EmptyState
            title="결제 내역이 없습니다"
            message="아직 결제하신 내역이 없습니다."
        />
    );
  }

  const handleClick = (paymentId) => {
    dispatch(openModal({ content: <PaymentDetail paymentId={paymentId} /> }));
  };

  return (
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-semibold mb-6">결제 내역</h2>

        {/* 리스트 영역 */}
        <div className="flex-1 space-y-4 overflow-y-auto">
          {payments.map((p) => (
              <div
                  key={p.paymentId}
                  onClick={() => handleClick(p.paymentId)}
                  className="border border-gray-300 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer"
              >
                <div>
                  <p className="font-semibold">상품명: {p.productName}</p>
                  <p className="text-sm text-gray-500">
                    결제일: {dayjs(p.regDate).format("YYYY-MM-DD HH:mm")}
                  </p>
                  <p className="text-sm text-gray-500">
                    금액: {p.amount?.toLocaleString()}원
                  </p>
                </div>

                {/* 상태 뱃지 그룹 */}
                <div className="flex items-center gap-3">
                  <StatusBadge type="PaymentStatus" status={p.paymentStatus} />
                  {/* 환불 요청 상태가 있을 때만 출력 */}
                  {p.refundStatus && (
                      <StatusBadge
                          type="RefundRequestStatus"
                          status={p.refundStatus}
                      />
                  )}
                </div>
              </div>
          ))}
        </div>
      </div>
  );
}
