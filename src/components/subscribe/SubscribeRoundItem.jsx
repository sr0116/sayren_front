"use client";

import dayjs from "dayjs";
import StatusBadge from "@/components/common/StatusBadge";
import RoundPaymentButton from "@/components/subscribe/RoundPaymentButton";

export default function SubscribeRoundItem({ round, subscribeId, refetch }) {
  return (
      <li
          className="py-4 px-2 flex justify-between items-center hover:bg-gray-50"
      >
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
          {round.payStatus === "PENDING" && (
              <RoundPaymentButton
                  round={round}
                  subscribeId={subscribeId}
                  refetch={refetch}
              />
          )}
        </div>
      </li>
  );
}
