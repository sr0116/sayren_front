"use client";

import { useAllRefundRequestsQuery } from "@/api/refundRequestApi";
import { openModal } from "@/store/modalSlice";
import { useDispatch } from "react-redux";
import RefundProcessDialog from "./RefundProcessDialog";


export default function AdminRefundList() {
  const { data: requests = [], isLoading, isError } = useAllRefundRequestsQuery();
  const dispatch = useDispatch();

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>환불 요청 불러오기 실패</div>;

  const openProcessModal = (req) => {
    dispatch(
        openModal({
          content: (
              <RefundProcessDialog
                  request={req}
              />
          ),
        })
    );
  };

  return (
      <div>
        <h2 className="text-xl font-bold mb-4">환불 요청 목록</h2>
        <table className="w-full border border-gray-100  text-sm">
          <thead>
          <tr className="bg-gray-100 ">
            <th className="p-2 ">환불요청ID</th>
            <th className="p-2">결제ID</th>
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
              <tr key={r.refundRequestId} className="border border-gray-200 rounded-xl">
                <td className="p-2">{r.refundRequestId}</td>
                <td className="p-2">{r.paymentId}</td>
                <td className="p-2">{r.productName}</td>
                <td className="p-2">{r.orderPlanType}</td>
                <td className="p-2">{r.reasonCode}</td>
                <td className="p-2">{r.status}</td>
                <td className="p-2">{r.regDate}</td>
                <td className="p-2">{r.voidDate ?? "-"}</td>
                <td className="p-2">
                  <button
                      onClick={() => openProcessModal(r)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    처리하기
                  </button>
                </td>
              </tr>
          ))}
          {requests.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center text-gray-500 py-6">
                  환불 요청 내역이 없습니다.
                </td>
              </tr>
          )}
          </tbody>
        </table>
      </div>
  );
}