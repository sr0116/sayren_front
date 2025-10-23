"use client";

import { useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/modalSlice";
import {
  useSubscribeRoundsQuery,
  useSubscribeByIdQuery,
  useCancelSubscribeMutation,
} from "@/api/subscribeApi";
import { useMyRefundRequestsQuery } from "@/api/refundRequestApi";
import { useQueryClient } from "@tanstack/react-query";
import SubscribeRoundItem from "@/components/subscribe/SubscribeRoundItem";
import Pagination from "@/components/common/Pagination";
import ConfirmDialog from "@/components/common/ConfirmDialog";


export default function SubscribeRoundList() {
  const { id: subscribeId } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // 페이지네이션
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const itemsPerPage = 10;

  // 구독 회차 목록 (10초마다 자동 갱신)
  const {
    data: rounds = [],
    isLoading,
    isError,
    refetch,
  } = useSubscribeRoundsQuery(subscribeId, {
    refetchOnWindowFocus: true,
    refetchInterval: 10000,
  });

  // 구독 기본 정보
  const { data: subscribeDetail } = useSubscribeByIdQuery(subscribeId, {
    refetchOnWindowFocus: false,
  });

  // 환불 요청 내역
  const { data: refundRequests = [] } = useMyRefundRequestsQuery({
    refetchOnWindowFocus: false,
  });

  // 모든 회차 납부 완료 여부
  const allPaid = rounds.length > 0 && rounds.every((r) => r.payStatus === "PAID");

  // 첫 번째 미납 회차 찾기 (id / subscribeRoundId 대응)
  const firstPendingRound = rounds.find((r) => r.payStatus === "PENDING");
  const firstPendingId =
      firstPendingRound?.id ?? firstPendingRound?.subscribeRoundId ?? null;

  // 해당 구독에 대한 환불 요청 존재 여부
  const hasRefundRequest = refundRequests.some(
      (req) => req.subscribeId === Number(subscribeId)
  );

  // 구독 취소 Mutation (사유: EXPIRED 고정)
  const cancelMutation = useCancelSubscribeMutation(subscribeId, {
    onSuccess: () => {
      queryClient.invalidateQueries(["subscribeDetail", subscribeId]);
      queryClient.invalidateQueries(["mySubscribes"]);
      dispatch(
          openModal({
            content: (
                <ConfirmDialog
                    title="취소 요청 완료"
                    message="구독 만료로 인한 보증금 환급 요청이 정상적으로 접수되었습니다."
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

  // 조건 충족 시 자동 모달 (ReasonCode.EXPIRED 고정)
  useEffect(() => {
    if (!rounds.length) return;

    if (allPaid && !hasRefundRequest) {
      dispatch(
          openModal({
            content: (
                <ConfirmDialog
                    title="구독 기간 만료"
                    message={
                      <>
                        모든 회차 납부가 완료되어 구독이 만료되었습니다.
                        <br />
                        보증금 환급 및 구독 취소 요청을 진행하시겠습니까?
                      </>
                    }
                    confirmText="요청하기"
                    cancelText="나중에"
                    onConfirm={() =>
                        cancelMutation.mutate({
                          params: { reasonCode: "EXPIRED" }, // 계약 만료(환급) 사유 고정
                        })
                    }
                />
            ),
          })
      );
    }
  }, [rounds, allPaid, hasRefundRequest, dispatch, subscribeId, currentPage]);

  // 예외 처리
  if (isLoading)
    return <p className="text-gray-500 text-center py-10">불러오는 중...</p>;
  if (isError)
    return (
        <p className="text-gray-500 text-center py-10">
          회차 정보를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.
        </p>
    );
  if (!rounds.length)
    return (
        <p className="text-gray-500 text-center py-10">
          등록된 회차 정보가 없습니다.
        </p>
    );

  // 페이지네이션 계산
  const totalPages = Math.ceil(rounds.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedRounds = rounds.slice(startIdx, startIdx + itemsPerPage);

  return (
      <div className="w-full h-full space-y-10">
        {/* 상단 영역 */}
        <header className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {subscribeDetail?.productName || "구독 상품"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              총 {rounds.length}회차 •{" "}
              {dayjs(subscribeDetail?.startDate).format("YYYY.MM.DD")} 시작
            </p>
          </div>

          <button
              onClick={() => router.push("/mypage/subscribe")}
              className="text-sm text-gray-500 hover:text-gray-800 transition cursor-pointer"
          >
            ← 구독 목록으로
          </button>
        </header>

        {/* 회차 리스트 */}
        <ul className="divide-y divide-gray-100">
          {paginatedRounds.map((round) => (
              <SubscribeRoundItem
                  key={round.subscribeRoundId || round.id}
                  round={round}
                  subscribeId={subscribeId}
                  refetch={refetch}
                  isFirstPending={
                      round.id === firstPendingId ||
                      round.subscribeRoundId === firstPendingId
                  }
              />
          ))}
        </ul>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                  data={{
                    page: currentPage,
                    totalPages,
                    hasPrev: currentPage > 1,
                    hasNext: currentPage < totalPages,
                  }}
              />
            </div>
        )}
      </div>
  );
}
