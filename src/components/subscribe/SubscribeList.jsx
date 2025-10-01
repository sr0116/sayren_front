"use client";

import { useMySubscribesQuery } from "@/api/subscribeApi";
import StatusBadge from "@/components/common/StatusBadge";
import EmptyState from "@/components/common/EmptyState";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

export default function SubscribeList() {
  const router = useRouter();

  // 내 구독 목록 API 호출
  const { data, isLoading, isError } = useMySubscribesQuery();
  const subscribes = Array.isArray(data) ? data : data?.list ?? [];

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>구독 내역을 불러오는 중 오류가 발생했습니다.</div>;

  // 빈 상태
  if (subscribes.length === 0) {
    return (
        <EmptyState
            title="구독 내역이 없습니다"
            message="아직 구독하신 상품이 없습니다."
        />
    );
  }

  const handleClick = (subscribeId) => {
    router.push(`/mypage/subscribe/${subscribeId}`);
  };

  return (
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-semibold mb-6">구독 내역</h2>

        <div className="flex flex-col flex-1">
          <div className="flex-1 space-y-4 overflow-y-auto">
            {subscribes.map((s) => (
                <div
                    key={s.subscribeId}
                    onClick={() => handleClick(s.subscribeId)}
                    className="border border-gray-300 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer"
                >
                  <div>
                    <p className="font-semibold">구독 ID: {s.subscribeId}</p>
                    <p className="text-sm text-gray-500">
                      기간:{" "}
                      {s.startDate
                          ? dayjs(s.startDate).format("YYYY-MM-DD")
                          : "-"}{" "}
                      ~{" "}
                      {s.endDate ? dayjs(s.endDate).format("YYYY-MM-DD") : "-"}
                    </p>
                    <p className="text-sm text-gray-500">
                      월 렌탈료:{" "}
                      {s.monthlyFeeSnapshot
                          ? s.monthlyFeeSnapshot.toLocaleString()
                          : 0}
                      원
                    </p>
                  </div>

                  {/* 상태 뱃지 */}
                  <StatusBadge type="SubscribeStatus" value={s.status} />
                </div>
            ))}
          </div>
        </div>
      </div>
  );
}
