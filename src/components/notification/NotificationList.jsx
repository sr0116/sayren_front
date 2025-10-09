"use client";
import { useRouter } from "next/navigation";
import { useMyNotificationsQuery } from "@/api/notificationApi";
import dayjs from "dayjs";

export default function NotificationList() {
  const router = useRouter();
  const { data, isLoading, isError } = useMyNotificationsQuery();
  const notifications = Array.isArray(data) ? data : [];

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>오류 발생</div>;

  if (notifications.length === 0)
    return <div className="text-center text-gray-500 mt-10">현재 알림이 없습니다.</div>;

  return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">알림 목록</h2>
        {notifications.map((n) => (
            <div
                key={n.notificationId}
                onClick={() => router.push(`/mypage/notification/${n.notificationId}`)}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{n.title}</p>
                  <p className="text-sm text-gray-500">{n.message}</p>
                  <p className="text-xs text-gray-400">{dayjs(n.regDate).format("YYYY-MM-DD HH:mm")}</p>
                </div>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
              {n.type}
            </span>
              </div>
            </div>
        ))}
      </div>
  );
}
