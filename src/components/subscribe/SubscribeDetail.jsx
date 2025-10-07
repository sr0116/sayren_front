"use client";

import { useRouter } from "next/navigation";
import { useApiQuery } from "@/hooks/useApi";
import { useCancelSubscribeMutation } from "@/api/subscribeApi";
import { useQueryClient } from "@tanstack/react-query";
import Button from "@/components/common/Button";
import dayjs from "dayjs";

export default function SubscribeDetail({ subscribeId }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: subscribe, isLoading, isError } = useApiQuery(
      ["subscribeDetail", subscribeId],
      `/api/user/subscribes/${subscribeId}`
  );

  const cancelMutation = useCancelSubscribeMutation(subscribeId, {
    onSuccess: () => {
      alert("구독 취소 요청이 접수되었습니다.");
      // 캐시 즉시 갱신
      queryClient.invalidateQueries(["subscribeDetail", subscribeId]);
      queryClient.invalidateQueries(["mySubscribes"]);
    },
    onError: (error) => {
      const msg =
          error?.response?.data?.message || "구독 취소 요청 중 오류가 발생했습니다.";
      alert(msg);
    },
  });

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>구독 상세 조회 실패</div>;

  const handleCancel = () => {
    if (cancelMutation.isLoading) return;
    if (!confirm("정말로 구독 취소를 요청하시겠습니까?")) return;
    cancelMutation.mutate({});
  };

  // 상태 + 사유 기반 안내문
  const getCancelButtonLabel = () => {
    if (cancelMutation.isLoading) return "요청 중...";

    const { status, reasonCode } = subscribe;

    if (status === "ACTIVE") {
      if (reasonCode === "USER_REQUEST") return "취소 요청 처리 중";
      if (reasonCode === "RETURN_REQUEST") return "회수 요청 처리 중";
      return "구독 취소 요청";
    }

    if (status === "CANCELED") {
      if (reasonCode === "CONTRACT_CANCEL") return "계약이 해지된 구독입니다";
      if (reasonCode === "ADMIN_FORCE_END") return "관리자에 의해 종료된 구독입니다";
      return "구독이 취소되었습니다";
    }

    if (status === "ENDED") {
      if (reasonCode === "EXPIRED") return "구독이 만료되었습니다";
      return "종료된 구독입니다";
    }

    if (status === "FAILED") {
      if (reasonCode === "PAYMENT_FAILURE") return "결제 실패 - 취소 불가";
      if (reasonCode === "PAYMENT_TIMEOUT") return "결제 시간 초과 - 취소 불가";
      return "구독 실패 - 취소 불가";
    }

    if (status === "OVERDUE") {
      if (reasonCode === "PAYMENT_FAILURE") return "연체 중 - 결제 후 복구 가능";
      return "연체 중";
    }

    if (status === "PREPARING") {
      if (reasonCode === "USER_REQUEST") return "배송 전 취소 요청 중";
      return "배송 준비 중 - 취소 요청 가능";
    }

    return "취소 불가 상태";
  };

  const isCancelable =
      subscribe.status === "ACTIVE" &&
      subscribe.reasonCode !== "USER_REQUEST" &&
      !cancelMutation.isLoading;

  return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">구독 상세</h2>
        </div>

        <p>구독 ID: {subscribe.subscribeId}</p>
        <p>주문 아이템 ID: {subscribe.orderItemId}</p>
        <p>상태: {subscribe.status}</p>
        <p>사유 코드: {subscribe.reasonCode}</p>
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
            disabled={subscribe.status === "FAILED"}
        >
          {subscribe.status === "FAILED"
              ? "회차 조회 불가(구독 실패)"
              : "회차 보기"}
        </Button>

        {/* 구독 취소 버튼 */}
        <Button
            variant="secondary"
            onClick={handleCancel}
            disabled={!isCancelable}
        >
          {getCancelButtonLabel()}
        </Button>

        <Button
            variant="outline"
            onClick={() => router.push("/mypage/subscribe")}
            className="w-auto px-4 py-2"
        >
          구독 목록으로
        </Button>
      </div>
  );
}
