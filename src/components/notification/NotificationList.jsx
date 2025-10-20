"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useMyNotificationsQuery } from "@/api/notificationApi";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import EmptyState from "@/components/common/EmptyState";
import StatusBadge from "@/components/common/StatusBadge";
import Pagination from "@/components/common/Pagination";

export default function NotificationList() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const itemsPerPage = 5;

  const { data, isLoading, isError } = useMyNotificationsQuery();
  const notifications = Array.isArray(data) ? data : [];

  // 실시간 새로고침 (10초마다)
  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries(["myNotifications"]);
    }, 10000);
    return () => clearInterval(interval);
  }, [queryClient]);

  if (isLoading) return <div>불러오는 중...</div>;

  if (isError)
    return (
        <EmptyState
            title="알림 조회 실패"
            message="알림 정보를 불러오는 중 오류가 발생했습니다."
        />
    );

  if (notifications.length === 0)
    return <EmptyState title="알림 없음" message="현재 받은 알림이 없습니다." />;

  const totalPages = Math.ceil(notifications.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = notifications.slice(startIdx, startIdx + itemsPerPage);

  // 타입별 경로 이동 처리
  const handleAction = (n) => {
    const navigateTo = (url) => {
      const cleanUrl = url.startsWith("/mypage") ? url : `/mypage${url}`;
      router.push(cleanUrl);
    };

    switch (n.type) {
      case "SUBSCRIBE":
        router.push(`/mypage/subscribe/${n.targetId}`);
        break;

      case "SUBSCRIBE_ROUND":
        router.push(`/mypage/notification`);

        break;

      case "DELIVERY":
        router.push("/mypage/order");
        break;

      case "PAYMENT":
        router.push("/mypage/payment");
        break;

      case "REFUND":
        router.push("/mypage/refund");
        break;

      default:
        if (n.linkUrl) {
          navigateTo(n.linkUrl);
        } else {
          router.push(`/mypage/notification/${n.notificationId}`);
        }
    }
  };

  return (
      <div className="w-full h-full space-y-8">
        <header className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">알림 목록</h2>
        </header>

        <div className="space-y-6">
          {currentData.map((n) => (
              <section
                  key={n.notificationId}
                  className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition p-5"
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="space-y-1 flex-1">
                    <h3 className="text-base font-semibold text-gray-900">
                      {n.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                      {n.message || "알림 내용이 없습니다."}
                    </p>
                  </div>
                  <StatusBadge type="NotificationType" value={n.type} />
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 border-t border-gray-100 pt-3 gap-2">
                  <p className="text-xs text-gray-400">
                    {dayjs(n.regDate).format("YYYY.MM.DD HH:mm")}
                  </p>

                  <div className="flex gap-2">
                    <button
                        onClick={() =>
                            router.push(`/mypage/notification/${n.notificationId}`)
                        }
                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                    >
                      상세 보기
                    </button>

                    <button
                        onClick={() => handleAction(n)}
                        className="px-3 py-1.5 text-sm font-semibold border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                    >
                      관련 페이지로 이동
                    </button>
                  </div>
                </div>
              </section>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
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
