"use client";

import Image from "next/image";
import {useApiQuery} from "@/hooks/useApi";
import {useDispatch} from "react-redux";
import {openModal} from "@/store/modalSlice";
import PaymentDetail from "@/components/payments/PaymentDetail";
import EmptyState from "@/components/common/EmptyState";
import dayjs from "dayjs";
import {useQueryClient} from "@tanstack/react-query";
import StatusBadge from "@/components/common/StatusBadge";

export default function PaymentList() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // 결제 내역 조회
  const {
    data: payments = [],
    isError,
  } = useApiQuery(["payments"], "/api/user/payments", {
    refetchOnWindowFocus: false,
  });

  // invalidateQueries 실시간 상태 변동해주기
  const handleRefresh = async () => {
    await queryClient.invalidateQueries(["payments"]);
  };

  // 상세 모달 열기
  const handleOpenDetail = (paymentId) => {
    dispatch(openModal({content: <PaymentDetail paymentId={paymentId}/>}));
  };

  // 상태 처리
  if (isError)
    return (
        <EmptyState
            title="결제 내역을 불러올 수 없습니다"
            message="일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        />
    );

  if (!payments.length)
    return (
        <EmptyState
            title="결제 내역이 없습니다"
            message="아직 결제하신 내역이 없습니다."
        />
    );

  return (
      <div className="w-full h-full space-y-10">
        {/* 상단 타이틀 */}
        <header className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">결제 내역</h2>
          <button
              onClick={handleRefresh}
              className="text-sm text-gray-500 hover:text-gray-800 transition"
          >
            새로고침
          </button>
        </header>

        {/* 결제 카드 리스트 */}
        {payments.map((p) => {
          const isRental = p.orderPlanType === "RENTAL";
          const thumbnail = p.productThumbnail || "/image/image2.svg";

          //  상태 텍스트 변환
          const statusLabelMap = {
            PAID: "결제 완료",
            PENDING: "결제 대기",
            FAILED: "결제 실패",
            REFUNDED: "환불 완료",
            PARTIAL_REFUNDED: "부분 환불",
            COMPLETED: "정상 종료",
          };
          
          const statusText = statusLabelMap[p.paymentStatus] || p.paymentStatus;

          return (
              <section
                  key={p.paymentId}
                  className="space-y-3 border-b border-gray-100 pb-6"
              >
                {/* 날짜 & 상태 */}
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {dayjs(p.regDate).format("YYYY.MM.DD (dd)")}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">{statusText}</p>
                  </div>
                  <button
                      className="text-xs text-gray-500 hover:text-gray-700"
                      onClick={() => handleOpenDetail(p.paymentId)}
                  >
                    주문 상세
                  </button>
                </div>

                {/* 카드 본문 */}
                <div className="border border-gray-200 rounded-lg bg-white">
                  <div className="flex items-start gap-4 p-4">
                    {/* 이미지 */}
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                      <Image
                          src={thumbnail}
                          alt={p.productName || "상품 이미지"}
                          fill
                          sizes="80px"
                          className="object-cover"
                      />
                    </div>

                    {/* 상품 정보 */}
                    <div className="flex-1">
                      <p className="text-xs text-red-900 mt-1">
                        {p.orderPlanType} 상품
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {p.productName}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        결제일 : {dayjs(p.regDate).format("HH:mm")}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {p.amount?.toLocaleString()}원
                      </p>
                    </div>

                    {/* 우측 상태 뱃지 */}
                    <div className="flex items-start justify-end">
                      <StatusBadge type="PaymentStatus" value={p.paymentStatus}/>
                    </div>
                  </div>

                  {/* 하단 버튼 */}
                  <div className="grid grid-cols-2 border-t border-gray-100 text-sm text-gray-700">
                    <button
                        className="py-2 hover:bg-gray-50 transition"
                        onClick={() => alert("배송 조회 기능 연결 예정")}
                    >
                      배송 조회
                    </button>
                    <button
                        className="py-2 border-l border-gray-100 hover:bg-gray-50 transition"
                        onClick={() => alert("반품 기능 연결 예정")}
                    >
                      반품 신청
                    </button>
                  </div>
                </div>
              </section>
          );
        })}
      </div>
  );
}
