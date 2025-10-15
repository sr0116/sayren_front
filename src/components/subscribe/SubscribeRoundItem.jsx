"use client";

import dayjs from "dayjs";
import StatusBadge from "@/components/common/StatusBadge";
import RoundPaymentButton from "@/components/subscribe/RoundPaymentButton";

/**
 * 구독 회차 단일 아이템
 * - 결제 버튼은 납부 예정일 3일 전부터 활성화됨
 */
export default function SubscribeRoundItem({ round, subscribeId, refetch }) {
  // 현재 날짜와 예정일 비교
  const daysDiff = dayjs(round.dueDate).diff(dayjs(), "day");

  // 3일 전부터 결제 가능
  const canPay =
      round.payStatus === "PENDING" && daysDiff <= 3 && daysDiff >= -1;

  return (
      <li className="py-4 px-2 flex justify-between items-center hover:bg-gray-50">
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
                    {daysDiff > 3
                        ? `${daysDiff - 3}일 후 결제 가능`
                        : "결제 가능 기간이 지났습니다"}
                  </p>
              )
          )}
        </div>
      </li>
  );
}
