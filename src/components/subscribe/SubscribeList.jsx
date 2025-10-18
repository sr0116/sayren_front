"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  useMySubscribesQuery,
  useDeleteSubscribeMutation,
} from "@/api/subscribeApi";
import EmptyState from "@/components/common/EmptyState";
import StatusBadge from "@/components/common/StatusBadge";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "@/store/modalSlice";
import dayjs from "dayjs";
import Pagination from "@/components/common/Pagination";

export default function SubscribeList() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  // 페이지네이션 설정
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const itemsPerPage = 10;

  //  구독 리스트 쿼리 (자동 감시)
  const { data, isError, isLoading } = useMySubscribesQuery({
    refetchOnWindowFocus: true, // 탭 전환 시 자동 최신화
    refetchInterval: 10000, // 10초마다 상태 변경 감지
  });

  //  구독 삭제 Mutation
  const deleteMutation = useDeleteSubscribeMutation({
    onSuccess: async () => {
      // 삭제 후 캐시 무효화 → 자동 refetch로 최신 상태 반영
      await queryClient.invalidateQueries(["mySubscribes"]);
      dispatch(closeModal());
    },
    onError: (err) => {
      console.error("구독 삭제 실패:", err);
      alert(err?.response?.data?.message || "삭제 중 오류가 발생했습니다.");
    },
  });

  const subscribes = Array.isArray(data) ? data : data?.list ?? [];

  // 페이지 단위로 데이터 슬라이싱
  const totalPages = Math.ceil(subscribes.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedSubscribes = subscribes.slice(startIdx, startIdx + itemsPerPage);

  //  삭제 확인 모달
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

  if (!paginatedSubscribes.length)
    return (
        <EmptyState
            title="구독 내역이 없습니다"
            message="아직 구독하신 상품이 없습니다."
        />
    );

  return (
      <div className="w-full h-full space-y-10">
        {/* 상단 타이틀 */}
        <header className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">구독 내역</h2>
          {/* 새로고침 버튼 제거 */}
        </header>

        {/*  구독 리스트 */}
        {paginatedSubscribes.map((s) => {
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
                {/* 상단 영역 */}
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

                {/* 카드 본문 */}
                <div className="border border-gray-200 rounded-lg bg-white">
                  <div className="flex items-start gap-4 p-4">
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                      <Image
                          src={s.productThumbnail || "/image/image2.svg"}
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
                        월 렌탈료{" "}
                        {s.monthlyFeeSnapshot
                            ? `${s.monthlyFeeSnapshot.toLocaleString()}원`
                            : "0원"}
                      </p>
                    </div>

                    <div className="flex items-start justify-end">
                      <StatusBadge type="SubscribeStatus" value={s.status} />
                    </div>
                  </div>

                  {/* 하단 버튼 */}
                  <div className="grid grid-cols-3 border-t border-gray-100 text-sm text-gray-700">
                    <button
                        className="py-2 hover:bg-gray-50 transition cursor-pointer"
                        onClick={() =>
                            router.push(`/mypage/subscribe/${s.subscribeId}/rounds`)
                        }
                    >
                      회차 보기
                    </button>
                    <button
                        className="py-2 border-l border-gray-100 hover:bg-gray-50 transition cursor-pointer"
                        onClick={() =>
                            router.push(`/mypage/subscribe/${s.subscribeId}`)
                        }
                    >
                      상세 정보
                    </button>
                    <button
                        className=" py-2 border-l border-gray-100 hover:bg-gray-50 transition cursor-pointer"
                        onClick={() => handleDeleteConfirm(s.subscribeId)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </section>
          );
        })}

        {/* 페이지네이션 */}
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
      </div>
  );
}
