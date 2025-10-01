"use client";

import { useRouter } from "next/navigation";
import { useApiQuery } from "@/hooks/useApi";
import Button from "@/components/common/Button";
import dayjs from "dayjs";

export default function SubscribeDetail({ subscribeId }) {
  const router = useRouter();

  const { data: subscribe, isLoading, isError } = useApiQuery(
      ["subscribeDetail", subscribeId],
      `/api/user/subscribes/${subscribeId}`
  );

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>구독 상세 조회 실패</div>;

  return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">구독 상세</h2>

        </div>

        <p>구독 ID: {subscribe.subscribeId}</p>
        <p>주문 아이템 ID: {subscribe.orderItemId}</p>
        <p>상태: {subscribe.status}</p>
        <p>월 렌탈료: {subscribe.monthlyFeeSnapshot?.toLocaleString()}원</p>
        <p>보증금: {subscribe.depositSnapshot?.toLocaleString()}원</p>
        <p>총 기간: {subscribe.totalMonths}개월</p>
        <p>신청일: {dayjs(subscribe.regDate).format("YYYY-MM-DD HH:mm")}</p>
        <p>
          기간: {dayjs(subscribe.startDate).format("YYYY-MM-DD")} ~{" "}
          {dayjs(subscribe.endDate).format("YYYY-MM-DD")}
        </p>

        {/* 회차 보기 버튼 */}
        <Button
            variant="primary"
            onClick={() => router.push(`/mypage/subscribe/${subscribeId}/rounds`)}
        >
          회차 보기
        </Button>
        {/* 뒤로가기 버튼 */}
        <Button
            variant="outline"
            onClick={() => router.push("/mypage/subscribe")}
            className="w-auto px-4 py-2 text-sm"
        >
          구독 목록으로
        </Button>
      </div>
  );
}
