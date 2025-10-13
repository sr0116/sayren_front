"use client";

import { useParams, useRouter } from "next/navigation";
import { useSubscribeRoundsQuery } from "@/api/subscribeApi";
import SubscribeRoundItem from "@/components/subscribe/SubscribeRoundItem";
import EmptyState from "@/components/common/EmptyState";
import { X } from "lucide-react";

export default function SubscribeRoundList() {
  const { id: subscribeId } = useParams();
  const router = useRouter();

  // 회차 목록 쿼리
  const { data: rounds = [], isLoading, isError, refetch } =
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
            <EmptyState title="회차 정보가 없습니다" />
        ) : (
            <ul className="divide-y divide-gray-200">
              {rounds.map((round) => (
                  <SubscribeRoundItem
                      key={round.subscribeRoundId}
                      round={round}
                      subscribeId={subscribeId}
                      refetch={refetch}
                  />
              ))}
            </ul>
        )}
      </div>
  );
}
