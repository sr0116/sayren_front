"use client";

import dayjs from "dayjs";
import StatusBadge from "@/components/common/StatusBadge";
import RoundPaymentButton from "@/components/subscribe/RoundPaymentButton";

/**
 * 구독 회차 단일 아이템
 * - 가장 먼저 미납된 회차만 결제 가능
 */
export default function SubscribeRoundItem({
                                             round,
                                             subscribeId,
                                             refetch,
                                             isFirstPending,
                                           }) {
  // 결제 가능 조건: 가장 앞의 미납 회차만 가능
  const canPay = round.payStatus === "PENDING" && isFirstPending;

  return (
      <li className="py-4 px-2 flex justify-between items-center hover:bg-gray-50 transition">
        <div>
          <p className="font-semibold text-gray-800">{round.roundNo}회차</p>
          <p className="text-sm text-gray-500">
            월 렌탈 금액: {round.amount?.toLocaleString()}원
          </p>
          <p className="text-sm text-gray-500">
            예정일: {dayjs(round.dueDate).format("YYYY-MM-DD")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <StatusBadge type="PaymentStatus" value={round.payStatus} />

          {canPay ? (
              <RoundPaymentButton
                  round={round}
                  subscribeId={subscribeId}
                  refetch={refetch}
              />
          ) : (
              round.payStatus === "PENDING" && (
                  <p className="text-xs text-gray-400">
                    이전 회차 결제 완료 후 가능
                  </p>
              )
          )}
        </div>
      </li>
  );
}
