"use client";

import { useDispatch } from "react-redux";
import { openModal } from "@/store/modalSlice";
import { useRefundRequestByIdQuery } from "@/api/refundRequestApi";
import EmptyState from "@/components/common/EmptyState";
import StatusBadge from "@/components/common/StatusBadge";
import dayjs from "dayjs";
import Image from "next/image";
import Button from "@/components/common/Button";
import RefundPolicyPurchaseModal from "@/components/refund/RefundPolicyPurchaseModal";
import RefundPolicyRentalModal from "@/components/refund/RefundPolicyRentalModal";

export default function RefundRequestDetail({ refundRequestId }) {
  const dispatch = useDispatch();

  const {
    data: refund,
    isLoading,
    isError,
  } = useRefundRequestByIdQuery(refundRequestId, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError)
    return (
        <EmptyState
            title="환불 상세 조회 실패"
            message="일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        />
    );
  if (!refund)
    return (
        <EmptyState
            title="환불 정보 없음"
            message="존재하지 않는 환불 요청입니다."
        />
    );

  const reasonLabelMap = {
    USER_REQUEST: "사용자 요청",
    PRODUCT_DEFECT: "상품 불량",
    DELIVERY_DELAY: "배송 지연",
    SYSTEM_ERROR: "시스템 오류",
    CHANGE_OF_MIND: "단순 변심",
  };

  // 타입별 환불 규정 모달 분기
  const handleOpenPolicy = () => {
    dispatch(
        openModal({
          content:
              refund.orderPlanType === "RENTAL" ? (
                  <RefundPolicyRentalModal />
              ) : (
                  <RefundPolicyPurchaseModal />
              ),
        })
    );
  };

  return (
      <div className="w-full max-w-[550px] space-y-10">
        {/* 상단 헤더 */}
        <header className="border-b border-gray-200 pb-4">
          <h2 className="text-lg font-bold text-gray-900">환불 상세 정보</h2>
          <p className="text-sm text-gray-500 mt-1">
            요청번호 #{refund.refundRequestId}
          </p>
        </header>

        {/* 상품 정보 */}
        <section className="space-y-4">
          <h3 className="text-base font-semibold text-gray-800">환불 상품</h3>
          <div className="flex items-start gap-4">
            <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
              <Image
                  src={refund.productThumbnail || "/image/image2.svg"}
                  alt={refund.productName || "상품 이미지"}
                  fill
                  sizes="96px"
                  className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-medium text-gray-900">{refund.productName}</p>
              <p className="text-sm text-gray-500 mt-1">
                {refund.orderPlanType === "RENTAL"
                    ? "렌탈 상품"
                    : "일반 결제 상품"}
              </p>
            </div>
          </div>
        </section>

        {/* 환불 요청 정보 */}
        <section className="space-y-4">
          <h3 className="text-base font-semibold text-gray-800">환불 요청 정보</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">요청 사유</span>
              <span className="text-gray-900">
              {reasonLabelMap[refund.reasonCode] || refund.reasonCode}
            </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">환불 상태</span>
              <StatusBadge type="RefundRequestStatus" value={refund.status} />
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">요청일</span>
              <span className="text-gray-900">
              {dayjs(refund.regDate).format("YYYY-MM-DD HH:mm")}
            </span>
            </div>
          </div>
        </section>

        {/* 환불 금액 (조건: APPROVED, AUTO_REFUNDED) */}
        {/*{["APPROVED", "AUTO_REFUNDED"].includes(refund.status) && (*/}
        {/*    <section className="space-y-4">*/}
        {/*      <h3 className="text-base font-semibold text-gray-800">환불 금액</h3>*/}
        {/*      <div className="space-y-2 text-sm">*/}
        {/*        <div className="flex justify-between">*/}
        {/*          <span className="text-gray-500">결제 금액</span>*/}
        {/*          <span className="text-gray-900 font-medium">*/}
        {/*        {refund.amount?.toLocaleString()}원*/}
        {/*      </span>*/}
        {/*        </div>*/}
        {/*        <div className="flex justify-between">*/}
        {/*          <span className="text-gray-500">환불 예정 금액</span>*/}
        {/*          <span className="text-gray-900 font-medium">*/}
        {/*        {refund.refundAmount?.toLocaleString() || "-"}원*/}
        {/*      </span>*/}
        {/*        </div>*/}
        {/*        <div className="flex justify-between">*/}
        {/*          <span className="text-gray-500">환불 수단</span>*/}
        {/*          <span className="text-gray-900">*/}
        {/*        {refund.refundMethod || refund.paymentMethod || "카드 결제"}*/}
        {/*      </span>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </section>*/}
        {/*)}*/}

        {/* 하단 버튼 (조건 분기 적용) */}
        <div className="flex justify-end">
          <Button variant="outline" onClick={handleOpenPolicy}>
            {refund.orderPlanType === "RENTAL"
                ? "렌탈 환불 규정"
                : "일반 환불 규정"}
          </Button>
        </div>
      </div>
  );
}
