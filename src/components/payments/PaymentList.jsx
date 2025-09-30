"use client";

import {useState} from "react";
import {useApiQuery} from "@/hooks/useApi";
import Pagination from "@/components/common/Pagination";
import StatusBadge from "@/components/common/StatusBadge";
import EmptyState from "@/components/common/EmptyState";
import {openModal} from "@/store/modalSlice";
import {useDispatch} from "react-redux";
import PaymentDetail from "@/components/payments/PaymentDetail";
import dayjs from "dayjs";

export default function PaymentList() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const size = 5; // 한 페이지당 5개

  const {data: payments = [], isLoading, isError} = useApiQuery(
      ["payments"],
      "/api/user/payments"
  );

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>결제 내역을 불러오는 중 오류가 발생했습니다.</div>;

  // 페이지네이션 계산
  const totalPages = Math.ceil(payments.length / size);
  const pageList = Array.from({length: totalPages}, (_, i) => i + 1);
  const prev = page > 1;
  const next = page < totalPages;

  // 현재 페이지 데이터
  const pagePayments = payments.slice((page - 1) * size, page * size);

  if (pagePayments.length === 0) {
    return (
        <EmptyState
            title="결제 내역이 없습니다"
            message="아직 결제하신 내역이 없습니다."
        />
    );
  }

  const handleClick = (paymentId) => {
    dispatch(openModal({content: <PaymentDetail paymentId={paymentId}/>}));
  };

  return (
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-semibold mb-6">결제 내역</h2>

        {/* 래퍼 추가 */}
        <div className="flex flex-col flex-1">
          {/* 리스트 영역 */}
          <div className="flex-1 space-y-4 overflow-y-auto">
            {pagePayments.map((p) => (
                <div
                    key={p.paymentId}
                    onClick={() => handleClick(p.paymentId)}
                    className="border border-gray-300 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer"
                >
                  <div>
                    <p className="font-semibold">상품명: {p.productName}</p>
                    <p className="text-sm text-gray-500">
                      결제일: {dayjs(p.regDate).format("YYYY-MM-DD HH:mm")}
                    </p>
                    <p className="text-sm text-gray-500">
                      금액: {p.amount?.toLocaleString()}원
                    </p>
                  </div>
                  <StatusBadge type="PaymentStatus" status={p.paymentStatus} />
                </div>
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="mt-6 flex justify-center  pt-4">
            <Pagination
                page={page}
                pageList={pageList}
                prev={prev}
                next={next}
                setPage={setPage}
            />
          </div>
        </div>
      </div>
  );
}
