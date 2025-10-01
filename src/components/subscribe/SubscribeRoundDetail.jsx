"use client";
import { X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import dayjs from "dayjs";
import {useSubscribeRoundDetailQuery} from "@/api/subscribeApi";

export default function SubscribeRoundDetailPage() {
  const { id: subscribeId, roundNo } = useParams(); // subscribeId, roundNo 추출
  const router = useRouter();

  const { data: round, isLoading, isError } = useSubscribeRoundDetailQuery(subscribeId, roundNo);

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>회차 상세 조회 실패</div>;

  return (
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-800">
            구독 {subscribeId} 회차 목록
          </h2>
          <button
              onClick={() => router.push("/mypage/subscribe")}
              className="ml-auto text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <p>구독 ID: {round.subscribeId}</p>
        <p>결제 상태: {round.payStatus}</p>
        <p>금액: {round.amount?.toLocaleString()}원</p>
        <p>납부 예정일: {dayjs(round.dueDate).format("YYYY-MM-DD")}</p>
        <p>
          결제일:{" "}
          {round.paidDate ? dayjs(round.paidDate).format("YYYY-MM-DD HH:mm") : "-"}
        </p>
        <p>등록일: {dayjs(round.regDate).format("YYYY-MM-DD HH:mm")}</p>
      </div>
  );
}
