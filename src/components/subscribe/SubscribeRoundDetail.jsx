"use client";

import dayjs from "dayjs";
import StatusBadge from "@/components/common/StatusBadge";

export default function SubscribeRoundDetail({ round }) {
  return (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">회차 상세 정보</h3>
        <div className="text-sm text-gray-700 space-y-1">
          <p>회차 번호: {round.roundNo}</p>
          <p>결제 상태: <StatusBadge type="PaymentStatus" value={round.payStatus} /></p>
          <p>금액: {round.amount?.toLocaleString()}원</p>
          <p>납부 예정일: {dayjs(round.dueDate).format("YYYY-MM-DD")}</p>
          <p>결제일: {round.paidDate ? dayjs(round.paidDate).format("YYYY-MM-DD HH:mm") : "-"}</p>
        </div>
      </div>
  );
}
