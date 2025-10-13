"use client";

import { useApiQuery } from "@/hooks/useApi";
import StatusBadge from "@/components/common/StatusBadge";
import EmptyState from "@/components/common/EmptyState";
import { openModal } from "@/store/modalSlice";
import { useDispatch } from "react-redux";
import PaymentDetail from "@/components/payments/PaymentDetail";
import dayjs from "dayjs";

/**
 * PaymentList (실무형 결제 내역 테이블 UI)
 * - 테이블 스타일 기반 목록
 * - 핵심 필드: 상품명, 결제유형, 결제일, 금액, 상태
 */
export default function PaymentList() {
  const dispatch = useDispatch();

  const { data: payments = [], isLoading, isError } = useApiQuery(
      ["payments"],
      "/api/user/payments"
  );

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>결제 내역 조회 실패</div>;
  if (payments.length === 0)
    return (
        <EmptyState
            title="결제 내역이 없습니다"
            message="아직 결제 내역이 없습니다."
        />
    );

  const handleClick = (paymentId) => {
    dispatch(openModal({ content: <PaymentDetail paymentId={paymentId} /> }));
  };

  return (
      <div className="w-full h-full">
        <h2 className="text-xl font-semibold mb-6">결제 내역</h2>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-5 py-3 font-medium text-gray-700 w-[40%]">
                상품명
              </th>
              <th className="px-4 py-3 font-medium text-gray-700 text-center">
                결제유형
              </th>
              <th className="px-4 py-3 font-medium text-gray-700 text-center">
                결제일
              </th>
              <th className="px-4 py-3 font-medium text-gray-700 text-right">
                금액
              </th>
              <th className="px-4 py-3 font-medium text-gray-700 text-center">
                상태
              </th>
            </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
            {payments.map((p) => {
              const isRental = p.orderPlanType === "RENTAL";
              return (
                  <tr
                      key={p.paymentId}
                      onClick={() => handleClick(p.paymentId)}
                      className="hover:bg-gray-50 transition cursor-pointer"
                  >
                    {/* 상품명 */}
                    <td className="px-5 py-3">
                      <div className="flex flex-col">
                      <span className="font-medium text-gray-900 truncate">
                        {p.productName}
                      </span>
                        {isRental && p.roundNo && (
                            <span className="text-xs text-gray-400">
                          회차 {p.roundNo}
                        </span>
                        )}
                      </div>
                    </td>

                    {/* 결제유형 */}
                    <td className="px-4 py-3 text-center">
                    <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium  ${
                            isRental
                                ? "bg-blue-100 text-blue-900"
                                : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {isRental ? "구독 결제" : "일반 결제"}
                    </span>
                    </td>

                    {/* 결제일 */}
                    <td className="px-4 py-3 text-center text-gray-600">
                      {dayjs(p.regDate).format("YYYY-MM-DD HH:mm")}
                    </td>

                    {/* 금액 */}
                    <td className="px-4 py-3 text-right font-semibold text-gray-800">
                      {p.amount?.toLocaleString()}원
                    </td>

                    {/* 상태 */}
                    <td className="px-4 py-3 text-center">
                      <StatusBadge type="PaymentStatus" value={p.paymentStatus} />
                    </td>
                  </tr>
              );
            })}
            </tbody>
          </table>
        </div>

      </div>
  );
}
