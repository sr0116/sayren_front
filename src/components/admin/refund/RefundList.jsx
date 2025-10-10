"use client";

import {useAllRefundRequestsQuery} from "@/api/refundRequestApi";
import {openModal} from "@/store/modalSlice";
import {useDispatch} from "react-redux";
import {formatDate} from "@/components/common/Format";
import StatusBadge from "@/components/common/StatusBadge";
import EmptyState from "@/components/common/EmptyState";
import RefundProcessDialog from "@/components/refund/RefundProcessDialog";

export default function AdminRefundList() {
  const {data: requests = [], isLoading, isError} = useAllRefundRequestsQuery();
  const dispatch = useDispatch();

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>환불 요청 불러오기 실패</div>;
  if (!requests.length)
    return <EmptyState message="환불 요청 내역이 없습니다."/>;

  // 모달 열기 (승인/거절 다이얼로그)
  const openProcessModal = (req) => {
    dispatch(
        openModal({
          content: <RefundProcessDialog request={req}/>,
        })
    );
  };

  return (
      <div>
        <h2 className="text-xl font-bold mb-4">환불 요청 목록</h2>

        <table className="w-full border border-gray-100 text-sm">
          <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-2">요청 ID</th>
            <th className="p-2">결제 ID</th>
            <th className="p-2">상품명</th>
            <th className="p-2">구분</th>
            <th className="p-2">사유</th>
            <th className="p-2">상태</th>
            <th className="p-2">요청일</th>
            <th className="p-2">취소일</th>
            <th className="p-2">관리</th>
          </tr>
          </thead>

          <tbody>
          {requests.map((r) => (
              <tr
                  key={r.refundRequestId}
                  className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-2 text-center">{r.refundRequestId}</td>
                <td className="p-2 text-center">{r.paymentId}</td>
                <td className="p-2 text-center">{r.productName}</td>
                <td className="p-2 text-center">{r.orderPlanType}</td>
                <td className="p-2 text-center">{r.reasonCode}</td>
                <td className="p-2 text-center">
                  <StatusBadge type="RefundRequestStatus" value={r.status}/>
                </td>
                <td className="p-2 text-center">{formatDate(r.regDate)}</td>
                <td className="p-2 text-center">
                  {r.voidDate ? formatDate(r.voidDate) : "-"}
                </td>
                <td className="p-2 text-center">
                  <button
                      onClick={() => openProcessModal(r)}
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
