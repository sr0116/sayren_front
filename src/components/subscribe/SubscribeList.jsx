"use client";

import { useRouter } from "next/navigation";
import { useMySubscribesQuery } from "@/api/subscribeApi";
import StatusBadge from "@/components/common/StatusBadge";
import EmptyState from "@/components/common/EmptyState";
import dayjs from "dayjs";

/**
 * 구독 내역 리스트 (SubscribeSummaryDTO 기반)
 */
export default function SubscribeList() {
  const router = useRouter();

  // 구독 목록 조회 (SubscribeSummaryDTO 반환)
  const { data, isLoading, isError } = useMySubscribesQuery();
  const subscribes = Array.isArray(data) ? data : data?.list ?? [];

  // 로딩 / 에러 / 빈 상태 처리
  if (isLoading) return <div className="text-sm text-gray-500">불러오는 중...</div>;
  if (isError)
    return (
        <div className="text-sm text-red-500">
          구독 내역을 불러오는 중 오류가 발생했습니다.
        </div>
    );
  if (subscribes.length === 0)
    return (
        <EmptyState
            title="구독 내역이 없습니다"
            message="아직 구독하신 상품이 없습니다."
        />
    );

  // 상세 페이지 이동
  const handleClick = (subscribeId) => {
    router.push(`/mypage/subscribe/${subscribeId}`);
  };

  return (
      <div className="flex flex-col h-full">
        {/* 헤더 */}
        <h2 className="text-xl font-semibold mb-6">구독 내역</h2>

        {/* 구독 리스트 테이블 */}
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-5 py-3 font-medium text-gray-700 w-[35%]">
                상품명
              </th>
              <th className="px-4 py-3 font-medium text-gray-700 text-center">
                구독 기간
              </th>
              <th className="px-4 py-3 font-medium text-gray-700 text-center">
                월 렌탈료
              </th>
              <th className="px-4 py-3 font-medium text-gray-700 text-center">
                상태
              </th>
            </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
            {subscribes.map((s) => (
                <tr
                    key={s.subscribeId}
                    onClick={() => handleClick(s.subscribeId)}
                    className="hover:bg-gray-50 transition cursor-pointer"
                >
                  {/* 상품명 */}
                  <td className="px-5 py-3">
                    <div className="flex flex-col">
                    <span className="font-medium text-gray-900 truncate">
                      {s.productName || `구독 ID ${s.subscribeId}`}
                    </span>
                      <span className="text-xs text-gray-400">
                      ID: {s.subscribeId}
                    </span>
                    </div>
                  </td>

                  {/* 구독 기간 */}
                  <td className="px-4 py-3 text-center text-gray-600">
                    {s.startDate
                        ? `${dayjs(s.startDate).format("YYYY.MM.DD")} ~ ${
                            s.endDate
                                ? dayjs(s.endDate).format("YYYY.MM.DD")
                                : "진행 중"
                        }`
                        : "-"}
                  </td>

                  {/* 월 렌탈료 */}
                  <td className="px-4 py-3 text-center font-semibold text-gray-800">
                    {s.monthlyFeeSnapshot
                        ? `${s.monthlyFeeSnapshot.toLocaleString()}원`
                        : "0원"}
                  </td>

                  {/* 상태 */}
                  <td className="px-4 py-3 text-center">
                    <StatusBadge type="SubscribeStatus" value={s.status} />
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}
