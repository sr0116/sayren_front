"use client";

import {
  useAllSubscribesForAdminQuery,
  useProcessSubscribeCancelMutation,
} from "@/api/subscribeApi";
import { openModal } from "@/store/modalSlice";
import { useDispatch } from "react-redux";
import { formatDate } from "@/components/common/Format";
import StatusBadge from "@/components/common/StatusBadge";
import EmptyState from "@/components/common/EmptyState";
import ConfirmDialog from "@/components/common/ConfirmDialog";

export default function AdminSubscribeCancelList() {
  const { data: subscribes = [], isLoading, isError } =
      useAllSubscribesForAdminQuery();
  const dispatch = useDispatch();

  const processMutation = useProcessSubscribeCancelMutation({
    onSuccess: (res) => {
      console.log("취소 승인/거절 성공 응답:", res);
      alert("요청이 정상적으로 처리되었습니다.");
    },
    onError: (err) => {
      console.error("취소 처리 오류 발생:", err);
      if (err?.response) {
        console.log("응답 코드:", err.response.status);
        console.log("백엔드 응답 메시지:", err.response.data);
      } else {
        console.log("네트워크 또는 클라이언트 오류:", err.message);
      }
      alert("요청 처리 중 오류가 발생했습니다.");
    },
  });

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>구독 요청 불러오기 실패</div>;
  if (!subscribes.length)
    return <EmptyState message="구독 내역이 없습니다." />;

  // reasonCode가 USER_REQUEST 인 항목만 취소 요청으로 간주
  const cancelRequests = subscribes.filter(
      (s) => s.reasonCode === "USER_REQUEST"
  );

  if (!cancelRequests.length)
    return <EmptyState message="현재 취소 요청 중인 구독이 없습니다." />;

  // 승인 / 거절 처리
  const openProcessModal = (s) => {
    console.log("모달 : ", s);

    dispatch(
        openModal({
          content: (
              <ConfirmDialog
                  title="구독 취소 요청 처리"
                  message={`구독 ID ${s.subscribeId}의 취소 요청을 승인 또는 거절하시겠습니까?`}
                  confirmText="승인"
                  cancelText="거절"
                  onConfirm={() => {
                    console.log("요청 승인", {
                      id: s.subscribeId,
                      status: "APPROVED",
                      reasonCode: "CONTRACT_CANCEL",
                    });

                    processMutation.mutate({
                      params: {
                        id: s.subscribeId,
                        status: "APPROVED",
                        reasonCode: "CONTRACT_CANCEL",
                      },
                    });
                  }}
                  onCancel={() => {
                    console.log(" 승인 거절:", {
                      id: s.subscribeId,
                      status: "REJECTED",
                      reasonCode: "CANCEL_REJECTED",
                    });

                    processMutation.mutate({
                      params: {
                        id: s.subscribeId,
                        status: "REJECTED",
                        reasonCode: "CANCEL_REJECTED",
                      },
                    });
                  }}
              />
          ),
        })
    );
  };

  return (
      <div>
        <h2 className="text-xl font-bold mb-4">구독 취소 요청 관리</h2>

        <table className="w-full border border-gray-100 text-sm">
          <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-2">구독 ID</th>
            <th className="p-2">주문 ID</th>
            <th className="p-2">상태</th>
            <th className="p-2">사유</th>
            <th className="p-2">보증금</th>
            <th className="p-2">월 렌탈료</th>
            <th className="p-2">개월 수</th>
            <th className="p-2">시작일</th>
            <th className="p-2">종료일</th>
            <th className="p-2">신청일</th>
            <th className="p-2">관리</th>
          </tr>
          </thead>

          <tbody>
          {cancelRequests.map((s) => (
              <tr
                  key={s.subscribeId}
                  className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-2 text-center">{s.subscribeId}</td>
                <td className="p-2 text-center">{s.orderItemId}</td>
                <td className="p-2 text-center">
                  <StatusBadge type="SubscribeStatus" value={s.status} />
                </td>
                <td className="p-2 text-center">{s.reasonCode}</td>
                <td className="p-2 text-right">
                  {s.depositSnapshot?.toLocaleString()} 원
                </td>
                <td className="p-2 text-right">
                  {s.monthlyFeeSnapshot?.toLocaleString()} 원
                </td>
                <td className="p-2 text-center">{s.totalMonths}개월</td>
                <td className="p-2 text-center">{formatDate(s.startDate)}</td>
                <td className="p-2 text-center">{formatDate(s.endDate)}</td>
                <td className="p-2 text-center">{formatDate(s.regDate)}</td>
                <td className="p-2 text-center">
                  <button
                      onClick={() => openProcessModal(s)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                  >
                    처리하기
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}
