"use client";

import { useParams, useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useSubscribeRoundsQuery } from "@/api/subscribeApi";
import StatusBadge from "@/components/common/StatusBadge";
import { X } from "lucide-react";
import RoundPaymentButton from "@/components/subscribe/RoundPaymentButton";

export default function SubscribeRoundList() {
  const { id: subscribeId } = useParams();
  const router = useRouter();

  const { data: rounds = [], isLoading, isError } =
      useSubscribeRoundsQuery(subscribeId);

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>회차 목록 조회 실패</div>;

  return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-800">
            구독 {subscribeId} 회차 목록
          </h2>
          <button
              onClick={() => router.push("/mypage/subscribe")}
              className="ml-auto text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <X />
          </button>
        </div>

        {rounds.length === 0 ? (
            <p className="text-gray-500 text-center">회차 정보가 없습니다.</p>
        ) : (
            <ul className="divide-y divide-gray-200">
              {rounds.map((r) => (
                  <li
                      key={r.subscribeRoundId}
                      className="py-4 px-2 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                      onClick={() =>
                          router.push(`/mypage/subscribe/${subscribeId}/rounds/${r.roundNo}`)
                      }
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{r.roundNo}회차</p>
                      <p className="text-sm text-gray-500">
                        월 렌탈 금액: {r.amount?.toLocaleString()}원
                      </p>
                      <p className="text-sm text-gray-500">
                        예정일: {dayjs(r.dueDate).format("YYYY-MM-DD")}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <StatusBadge type="PaymentStatus" value={r.payStatus} />

                      {r.payStatus?.toUpperCase() === "PENDING" && (
                          <RoundPaymentButton round={r} subscribeId={subscribeId} />
                      )}
                    </div>
                  </li>
              ))}
            </ul>
        )}
      </div>
  );
}
