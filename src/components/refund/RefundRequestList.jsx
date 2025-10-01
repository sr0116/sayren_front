"use client";

import { useMyRefundRequestsQuery } from "@/api/refundRequestApi";
import { openModal } from "@/store/modalSlice";
import { useDispatch } from "react-redux";
import StatusBadge from "@/components/common/StatusBadge";
import EmptyState from "@/components/common/EmptyState";
import dayjs from "dayjs";
import RefundRequestDetail from "@/components/refund/RefundRequestDetail";

export default function RefundRequestList() {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useMyRefundRequestsQuery({
    staleTime: 1000 * 60, // 1분 캐싱
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>환불 요청 내역 불러오기 실패</div>;

  const requests = data ?? [];

  if (requests.length === 0) {
    return <EmptyState message="환불 요청 내역이 없습니다." />;
  }

  const handleOpenDetail = (refundRequestId) => {
    dispatch(
        openModal({
          content: <RefundRequestDetail refundRequestId={refundRequestId} />, // content 방식으로 통일
        })
    );
  };

  return (
      <div className="space-y-4">
        {requests.map((req) => (
            <div
                key={req.refundRequestId}
                className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white flex justify-between items-center cursor-pointer hover:bg-gray-50"
                onClick={() => handleOpenDetail(req.refundRequestId)}
            >
              <div>
                <div className="font-semibold text-gray-800">
                  환불 요청 번호 #{req.refundRequestId}
                </div>
                <div className="text-sm text-gray-500">
                  요청일: {dayjs(req.regDate).format("YYYY-MM-DD HH:mm")}
                </div>
                {req.voidDate && (
                    <div className="text-sm text-gray-500">
                      취소일: {dayjs(req.voidDate).format("YYYY-MM-DD HH:mm")}
                    </div>
                )}
                <div className="text-sm text-gray-500">
                  사유 코드: {req.reasonCode}
                </div>
              </div>
              <StatusBadge type="RefundRequestStatus"  value={req.status} />
            </div>
        ))}
      </div>
  );
}
