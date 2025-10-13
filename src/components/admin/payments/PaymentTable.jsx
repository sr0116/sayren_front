"use client";

import StatusBadge from "@/components/common/StatusBadge";
import { formatDate } from "@/components/common/Format";


export default function PaymentTable({ payments, onRowClick }) {
  return (
      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-50 border-b">
        <tr>
          <th className="py-2 text-center">결제 ID</th>
          <th className="py-2 text-center">회원명</th>
          <th className="py-2 text-center">상품명</th>
          <th className="py-2 text-center">금액</th>
          <th className="py-2 text-center">결제유형</th>
          <th className="py-2 text-center">상태</th>
          <th className="py-2 text-center">결제일</th>
        </tr>
        </thead>

        <tbody>
        {payments.map((p) => (
            <tr
                key={p.paymentId}
                onClick={() => onRowClick(p.paymentId)}
                className="hover:bg-gray-50 cursor-pointer border-b transition"
            >
              <td className="py-2 text-center text-gray-600">{p.paymentId}</td>
              <td className="py-2 text-center">{p.buyerName || "-"}</td>
              <td className="py-2 text-center">{p.productName}</td>
              <td className="py-2 text-right font-medium text-gray-900">
                {p.amount?.toLocaleString()} 원
              </td>
              <td className="py-2 text-center text-gray-500">{p.orderPlanType}</td>
              <td className="py-2 text-center">
                <StatusBadge type="PaymentStatus" value={p.paymentStatus} />
              </td>
              <td className="py-2 text-center text-gray-500">
                {formatDate(p.regDate)}
              </td>
            </tr>
        ))}
        </tbody>
      </table>
  );
}
