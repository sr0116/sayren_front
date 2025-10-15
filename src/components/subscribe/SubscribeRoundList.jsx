"use client";

import { useParams } from "next/navigation";
import dayjs from "dayjs";
import { useSubscribeRoundsQuery } from "@/api/subscribeApi";
import SubscribeRoundItem from "@/components/subscribe/SubscribeRoundItem";


/**
 * 구독 회차 리스트
 * - 가장 앞의 미납 회차만 결제 가능
 */
export default function SubscribeRoundList() {
  const { id: subscribeId } = useParams();

  // 회차 목록 조회
  const {
    data: rounds,
    isLoading,
    refetch,
  } = useSubscribeRoundsQuery(subscribeId);



  if (!rounds || rounds.length === 0)
    return <p className="text-gray-500 text-center py-10">등록된 회차 정보가 없습니다.</p>;

  // 첫 번째 미납 회차 인덱스
  const firstPendingIndex = rounds.findIndex((r) => r.payStatus === "PENDING");

  return (
      <ul className="divide-y divide-gray-100">
        {rounds.map((round, idx) => (
            <SubscribeRoundItem
                key={round.id}
                round={round}
                subscribeId={subscribeId}
                refetch={refetch}
                isFirstPending={idx === firstPendingIndex} // 첫 미납 회차만 결제 가능
            />
        ))}
      </ul>
  );
}
