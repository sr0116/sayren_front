"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  useMySubscribesQuery,
  useDeleteSubscribeMutation,
} from "@/api/subscribeApi";
import EmptyState from "@/components/common/EmptyState";
import StatusBadge from "@/components/common/StatusBadge";
import Button from "@/components/common/Button";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "@/store/modalSlice";
import dayjs from "dayjs";

/**
 * 구독 내역 리스트 (SubscribeSummaryDTO 기반)
 * - 결제 리스트와 동일한 레이아웃 구성
 * - 반응형 대응 (모바일 ~ 데스크탑)
 */
export default function SubscribeList() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { data, isError, isLoading } = useMySubscribesQuery({
    refetchOnWindowFocus: false,
  });

  const deleteMutation = useDeleteSubscribeMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries(["mySubscribes"]);
      dispatch(closeModal());
    },
    onError: (err) => {
      console.error("구독 삭제 실패:", err);
      alert(err?.response?.data?.message || "삭제 중 오류가 발생했습니다.");
    },
  });

  const subscribes = Array.isArray(data) ? data : data?.list ?? [];

  // 새로고침
  const handleRefresh = async () => {
    await queryClient.invalidateQueries(["mySubscribes"]);
  };

  // 삭제 확인 모달
  const handleDeleteConfirm = (id) => {
    dispatch(
        openModal({
          content: (
              <ConfirmDialog
                  title="구독 내역 삭제"
                  message="해당 구독 내역을 삭제하시겠습니까?\n진행 중이거나 환불 중인 구독은 삭제할 수 없습니다."
                  confirmText="삭제하기"
                  onConfirm={() => deleteMutation.mutate(id)}
              />
          ),
        })
    );
  };

  if (isLoading)
    return <div className="text-sm text-gray-500">불러오는 중...</div>;

  if (isError)
    return (
        <EmptyState
            title="구독 내역을 불러올 수 없습니다"
            message="일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        />
    );

  if (!subscribes.length)
    return (
        <EmptyState
            title="구독 내역이 없습니다"
            message="아직 구독하신 상품이 없습니다."
        />
    );

  return (
      <div className="w-full h-full space-y-10">
        <header className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">구독 내역</h2>
          <button
              onClick={handleRefresh}
              className="text-sm text-gray-500 hover:text-gray-800 transition"
          >
            새로고침
          </button>
        </header>

        {subscribes.map((s) => {
          const thumbnail = "/image/image2.svg";
          const startDate = s.startDate
              ? dayjs(s.startDate).format("YYYY.MM.DD")
              : "-";
          const endDate = s.endDate
              ? dayjs(s.endDate).format("YYYY.MM.DD")
              : "진행 중";

          return (
              <section
                  key={s.subscribeId}
                  className="space-y-3 border-b border-gray-100 pb-6"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {dayjs(s.startDate || new Date()).format("YYYY.MM.DD (dd)")}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {s.status === "ACTIVE"
                          ? "이용 중"
                          : s.status === "ENDED"
                              ? "종료"
                              : s.status === "CANCELED"
                                  ? "취소됨"
                                  : "대기 중"}
                    </p>
                  </div>
                  <button
                      className="text-xs text-gray-500 hover:text-gray-700"
                      onClick={() =>
                          router.push(`/mypage/subscribe/${s.subscribeId}`)
                      }
                  >
                    구독 상세
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg bg-white">
                  <div className="flex items-start gap-4 p-4">
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                      <Image
                          src={thumbnail}
                          alt={s.productName || "상품 이미지"}
                          fill
                          sizes="80px"
                          className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mt-1">렌탈 상품</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {s.productName}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        구독 기간: {startDate} ~ {endDate}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {s.monthlyFeeSnapshot
                            ? `${s.monthlyFeeSnapshot.toLocaleString()}원`
                            : "0원"}
                      </p>
                    </div>

                    <div className="flex items-start justify-end">
                      <StatusBadge type="SubscribeStatus" value={s.status} />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 border-t border-gray-100 text-sm text-gray-700">
                    <button
                        className="py-2 hover:bg-gray-50 transition"
                        onClick={() =>
                            router.push(`/mypage/subscribe/${s.subscribeId}/rounds`)
                        }
                    >
                      회차 보기
                    </button>
                    <button
                        className="py-2 border-l border-gray-100 hover:bg-gray-50 transition"
                        onClick={() =>
                            router.push(`/mypage/subscribe/${s.subscribeId}`)
                        }
                    >
                      구독 취소
                    </button>
                    <button
                        className="py-2 border-l border-gray-100 text-red-600 hover:bg-gray-50 transition"
                        onClick={() => handleDeleteConfirm(s.subscribeId)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </section>
          );
        })}
      </div>
  );
}
