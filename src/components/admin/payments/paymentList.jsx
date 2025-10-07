"use client";
import {useState} from "react";
import Pagination from "@/components/common/Pagination";
import {formatDate} from "@/components/common/Format";
import StatusBadge from "@/components/common/StatusBadge";
import EmptyState from "@/components/common/EmptyState";
import {useAllPaymentsForAdminQuery} from "@/api/paymentApi";

export default function PaymentList() {
  const {data: payments = [], isLoading} = useAllPaymentsForAdminQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (isLoading) return <div>로딩 중...</div>;
  if (!payments.length) return <EmptyState message="결제 내역이 없습니다."/>;

  const totalPages = Math.ceil(payments.length / itemsPerPage);
  const currentData = payments.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  return (
      <div>
        <h2 className="text-xl font-bold mb-4">결제 내역</h2>

        <table className="w-full border border-gray-100 text-sm">
          <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-2">결제 ID</th>
            <th className="p-2">주문 ID</th>
            <th className="p-2">상품명</th>
            <th className="p-2">결제 금액</th>
            <th className="p-2">상태</th>
            <th className="p-2">결제 수단</th>
            <th className="p-2">결제일</th>
            <th className="p-2">환불 상태</th>
          </tr>
          </thead>

          <tbody>
          {currentData.map((p) => (
              <tr key={p.paymentId} className="border-t hover:bg-gray-50 transition">
                <td className="p-2 text-center">{p.paymentId}</td>
                <td className="p-2 text-center">{p.orderItemId}</td>
                <td className="p-2 text-center">{p.productName}</td>
                <td className="p-2 text-right">{p.amount?.toLocaleString()} 원</td>
                <td className="p-2 text-center">
                  <StatusBadge type="PaymentStatus" value={p.paymentStatus}/>
                </td>
                <td className="p-2 text-center">{p.paymentType}</td>
                <td className="p-2 text-center">{formatDate(p.regDate)}</td>
                <td className="p-2 text-center">
                  {p.refundStatus ? (
                      <StatusBadge
                          type="RefundRequestStatus"
                          value={p.refundStatus}
                      />
                  ) : (
                      "-"
                  )}
                </td>
              </tr>
          ))}
          </tbody>
        </table>

        <Pagination
            data={{
              page: currentPage,
              totalPages: totalPages,
              hasPrev: currentPage > 1,
              hasNext: currentPage < totalPages,
            }}
        />
      </div>
  );
}
