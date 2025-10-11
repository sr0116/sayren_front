"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useApiQuery } from "@/hooks/useApi";
import { useCancelSubscribeMutation } from "@/api/subscribeApi";
import { useQueryClient } from "@tanstack/react-query";
import Button from "@/components/common/Button";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { openModal } from "@/store/modalSlice";
import dayjs from "dayjs";
import SubscribeCancelForm from "@/components/subscribe/SubscribeCancelForm";

export default function SubscribeDetail({ subscribeId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const reasonRef = useRef(null);

  //  구독 상세 조회
  const { data: subscribe, isLoading, isError } = useApiQuery(
      ["subscribeDetail", subscribeId],
      `/api/user/subscribes/${subscribeId}`
  );

  //  구독 취소 요청 Mutation
  const cancelMutation = useCancelSubscribeMutation(subscribeId, {
    onSuccess: () => {
      queryClient.invalidateQueries(["subscribeDetail", subscribeId]);
      queryClient.invalidateQueries(["mySubscribes"]);

      dispatch(
          openModal({
            content: (
                <ConfirmDialog
                    title="취소 요청 완료"
                    message="구독 취소 요청이 정상적으로 접수되었습니다."
                    hideCancel
                />
            ),
          })
      );
    },
    onError: (error) => {
      const msg =
          error?.response?.data?.message ||
          "구독 취소 요청 중 오류가 발생했습니다.";
      alert(msg);
    },
  });

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError || !subscribe) return <div>구독 상세 조회 실패</div>;

  //  취소 가능 조건 (status + reasonCode 기반)
  const isCancelable =
      subscribe.status === "ACTIVE" &&
      ![
        "USER_REQUEST",     // 이미 사용자 취소 요청 중
        "RETURN_REQUEST",   // 회수 요청 중
        "RETURN_DELAY",     // 회수 지연
        "RETURN_FAILED",    // 회수 실패
      ].includes(subscribe.reasonCode) &&
      !cancelMutation.isLoading;

  //  구독 취소 버튼 클릭 시
  const handleCancel = () => {
    // 이미 취소 요청/회수 중인 경우
    if (["USER_REQUEST", "RETURN_REQUEST"].includes(subscribe.reasonCode)) {
      dispatch(
          openModal({
            content: (
                <ConfirmDialog
                    title="취소 요청 불가"
                    message="이미 취소 또는 회수 요청이 진행 중입니다."
                    hideCancel
                />
            ),
          })
      );
      return;
    }

    // 정상 구독 상태 → 취소 사유 모달
    if (isCancelable) {
      dispatch(
          openModal({
            content: (
                <ConfirmDialog
                    title="구독 취소 요청"
                    message={<SubscribeCancelForm ref={reasonRef} />}
                    onConfirm={() => {
                      const reasonCode = reasonRef.current?.getSelectedReason();
                      cancelMutation.mutate({ data: { reasonCode } });
                    }}
                />
            ),
          })
      );
    } else {
      // 그 외 취소 불가 상태
      dispatch(
          openModal({
            content: (
                <ConfirmDialog
                    title="취소 불가 상태"
                    message="현재 구독은 취소가 불가능한 상태입니다. 관리자에게 문의해주세요."
                    hideCancel
                />
            ),
          })
      );
    }
  };

  //  버튼 문구 처리
  const getCancelButtonLabel = () => {
    const { status, reasonCode } = subscribe;

    if (cancelMutation.isLoading) return "요청 중...";
    if (status === "CANCELED") return "구독이 취소되었습니다";
    if (status === "ENDED") return "구독이 종료되었습니다";
    if (status === "OVERDUE") return "연체 중 (결제 후 복구 가능)";
    if (["USER_REQUEST", "RETURN_REQUEST"].includes(reasonCode))
      return "취소 요청 처리 중";
    if (["RETURN_DELAY", "RETURN_FAILED"].includes(reasonCode))
      return "회수 진행 중";
    if (["CANCEL_REJECTED"].includes(reasonCode))
      return "취소 거절됨 (재요청 가능)";
    if (status === "ACTIVE") return "구독 취소 요청";

    return "취소 불가 상태";
  };

  //  화면 렌더링
  return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">구독 상세</h2>
        </div>

        <div className="space-y-1 text-sm text-gray-700">
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
        </div>

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

        {/* 목록으로 */}
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
