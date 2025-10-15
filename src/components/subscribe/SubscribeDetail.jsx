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
import StatusBadge from "@/components/common/StatusBadge";
import Image from "next/image";

/**
 * 구독 상세 페이지 (SubscribeResponseDTO 기반)
 * - 페이지 전환형 상세 보기
 * - 필수 DTO 필드만 반영
 */
export default function SubscribeDetail({ subscribeId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const reasonRef = useRef(null);

  // 구독 상세 조회
  const { data: subscribe, isLoading, isError } = useApiQuery(
      ["subscribeDetail", subscribeId],
      `/api/user/subscribes/${subscribeId}`
  );

  // 구독 취소 Mutation
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

  // 구독 취소 가능 조건
  const isCancelable =
      subscribe.status === "ACTIVE" &&
      ![
        "USER_REQUEST",
        "RETURN_REQUEST",
        "RETURN_DELAY",
        "RETURN_FAILED",
      ].includes(subscribe.reasonCode) &&
      !cancelMutation.isLoading;

  // 취소 버튼 문구 처리
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

  // 취소 버튼 클릭 처리
  const handleCancel = () => {
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
      dispatch(
          openModal({
            content: (
                <ConfirmDialog
                    title="취소 불가 상태"
                    message="현재 구독은 취소가 불가능한 상태입니다."
                    hideCancel
                />
            ),
          })
      );
    }
  };

  return (
      <div className="max-w-[700px] mx-auto space-y-8">
        {/* 헤더 */}
        <header className="border-b border-gray-200 pb-3">
          <h2 className="text-lg font-bold text-gray-900">구독 상세 정보</h2>
          <p className="text-sm text-gray-500 mt-1">
            Subscribe ID: {subscribe.subscribeId}
          </p>
        </header>

        {/*상품 정보*/}
        <section className="space-y-3">
          <h3 className="text-base font-semibold text-gray-800">상품 정보</h3>

          {/* 이미지 + 상품명 묶음 */}
          <div className="flex items-start gap-4">
            <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
              <Image
                  src={"/image/image2.svg"} // 임시 썸네일
                  alt={subscribe.productName || "상품 이미지"}
                  fill
                  sizes="96px"
                  className="object-cover"
              />
            </div>

            <div className="flex-1 space-y-1 text-sm">
              <p className="font-medium text-gray-900 text-base">
                {subscribe.productName}
              </p>
              <p className="text-gray-500 text-sm">
                {subscribe.productCategory || "카테고리 미지정"}
              </p>
              <p className="font-semibold text-gray-900 mt-1">
                {subscribe.monthlyFeeSnapshot?.toLocaleString()}원
              </p>
            </div>
          </div>
        </section>



        {/* 금액 정보 */}
        <section className="space-y-3">
          <h3 className="text-base font-semibold text-gray-800">요금 정보</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">월 렌탈료</span>
              <span className="font-semibold text-gray-900 text-right">
              {subscribe.monthlyFeeSnapshot?.toLocaleString()}원
            </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">보증금</span>
              <span className="font-semibold text-gray-900 text-right">
              {subscribe.depositSnapshot?.toLocaleString()}원
            </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">총 이용 개월 수</span>
              <span className="text-gray-800">{subscribe.totalMonths}개월</span>
            </div>
          </div>
        </section>

        {/* 기간 정보 */}
        <section className="space-y-3">
          <h3 className="text-base font-semibold text-gray-800">이용 기간</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">신청일</span>
              <span className="text-gray-800">
              {dayjs(subscribe.regDate).format("YYYY-MM-DD HH:mm")}
            </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">기간</span>
              <span className="text-gray-800">
              {subscribe.startDate
                  ? `${dayjs(subscribe.startDate).format("YYYY-MM-DD")} ~ ${
                      subscribe.endDate
                          ? dayjs(subscribe.endDate).format("YYYY-MM-DD")
                          : "진행 중"
                  }`
                  : "-"}
            </span>
            </div>
          </div>
        </section>


        {/* 회원 정보 */}
        <section className="space-y-3">
          <h3 className="text-base font-semibold text-gray-800">회원 정보</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">회원명</span>
              <span className="text-gray-800">{subscribe.memberName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">이메일</span>
              <span className="text-gray-800">{subscribe.memberEmail}</span>
            </div>
          </div>
        </section>

        {/* 상태 정보 */}
        <section className="space-y-3">
          <h3 className="text-base font-semibold text-gray-800">상태 정보</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">구독 상태</span>
            <StatusBadge type="SubscribeStatus" value={subscribe.status} />
          </div>
          {subscribe.refundRequestStatus && (
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">환불 상태</span>
                <StatusBadge
                    type="RefundRequestStatus"
                    value={subscribe.refundRequestStatus}
                />
              </div>
          )}
          {subscribe.reasonCode && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">사유 코드</span>
                <span className="text-gray-800">{subscribe.reasonCode}</span>
              </div>
          )}
        </section>

        {/* 하단 버튼 */}
        <section className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
          <Button
              variant="primary"
              className="sm:w-1/3 py-2.5 text-sm"
              onClick={() =>
                  router.push(`/mypage/subscribe/${subscribeId}/rounds`)
              }
              disabled={subscribe.status === "FAILED"}
          >
            회차 보기
          </Button>

          <Button
              variant="outline"
              className="sm:w-1/3 py-2.5 text-sm"
              onClick={() => router.push("/mypage/subscribe")}
          >
            목록으로
          </Button>

          <Button
              variant="secondary"
              className="sm:w-1/3 py-2.5 text-sm"
              onClick={handleCancel}
              disabled={!isCancelable}
          >
            구독 취소
          </Button>
        </section>
      </div>
  );
}
