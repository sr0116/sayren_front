"use client";

import {
  useAllSubscribesForAdminQuery,
  useProcessSubscribeCancelMutation,
} from "@/api/subscribeApi";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/modalSlice";
import { useQueryClient } from "@tanstack/react-query";
import EmptyState from "@/components/common/EmptyState";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import SubscribeCancelTable from "@/components/admin/subscribe/SubscribeCancelTable";
import {getEnumOptions} from "@/utils/enumOptions";

export default function AdminSubscribeCancelList() {
  const { data: subscribes = [], isLoading, isError } =
      useAllSubscribesForAdminQuery();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const processMutation = useProcessSubscribeCancelMutation({
    onSuccess: () => {
      alert("요청이 정상적으로 처리되었습니다.");
      queryClient.invalidateQueries(["adminSubscribes"]);
    },
    onError: (err) => {
      console.error("구독 취소 처리 오류:", err);
      alert("요청 처리 중 오류가 발생했습니다.");
    },
  });

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>구독 요청 불러오기 실패</div>;
  if (!subscribes.length)
    return <EmptyState message="구독 내역이 없습니다." />;

  // reasonCode === USER_REQUEST 인 항목만 취소 요청으로 간주
  const cancelRequests = subscribes.filter(
      (s) => s.reasonCode === "USER_REQUEST"
  );

  if (!cancelRequests.length)
    return <EmptyState message="현재 취소 요청 중인 구독이 없습니다." />;

  // 관리자 처리 모달
  const openProcessModal = (s) => {
    let selectedReason = "CONTRACT_CANCEL";

    // 관리자용 ReasonCode 옵션
    const reasonOptions = getEnumOptions("ReasonCode").filter((opt) =>
        [
          "CONTRACT_CANCEL",
          "ADMIN_FORCE_END",
          "SERVICE_ERROR",
          "PRODUCT_DEFECT",
          "DELIVERY_ISSUE",
          "OTHER",
        ].includes(opt.value)
    );

    dispatch(
        openModal({
          content: (
              <ConfirmDialog
                  title="구독 취소 요청 처리"
                  message={
                    <div className="space-y-3">
                      <p>
                        구독 ID <b>{s.subscribeId}</b>의 취소 요청을 승인 또는 거절하시겠습니까?
                      </p>

                      <label className="block text-sm font-medium text-gray-700">
                        취소 사유 선택
                      </label>

                      <select
                          defaultValue={selectedReason}
                          onChange={(e) => (selectedReason = e.target.value)}
                          className="border rounded-md w-full px-2 py-1"
                      >
                        {reasonOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                        ))}
                      </select>
                    </div>
                  }
                  confirmText="승인"
                  cancelText="거절"
                  onConfirm={() => {
                    processMutation.mutate({
                      params: {
                        id: s.subscribeId,
                        status: "APPROVED",
                        reasonCode: selectedReason,
                      },
                    });
                  }}
                  onCancel={() => {
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
        <SubscribeCancelTable requests={cancelRequests} onProcess={openProcessModal} />
      </div>
  );
}
