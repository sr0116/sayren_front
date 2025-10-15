"use client";

import ConfirmDialog from "@/components/common/ConfirmDialog";

export default function RefundPolicyRentalModal() {
  return (
      <ConfirmDialog
          title="구독(렌탈) 환불 규정 안내"
          hideCancel
          confirmText="확인"
          message={
            <>
              <p className="font-medium text-gray-800 mb-2">
                구독(렌탈) 상품 환불 기준은 다음과 같습니다:
              </p>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-2">
                <li>
                  <b>결제 후 24시간 이내</b> 환불 요청 시{" "}
                  <span className="font-semibold text-gray-900">보증금 전액 환불</span>
                  됩니다.
                </li>
                <li>
                  <b>배송 완료 후 7일 이내 단순 변심</b> 시{" "}
                  <span className="font-semibold text-gray-900">보증금의 5%</span>가
                  차감되어 환불됩니다.
                </li>
                <li>
                  <b>불량 / 배송 문제</b> 사유일 경우{" "}
                  <span className="font-semibold text-gray-900">전액 환불</span>이
                  가능합니다.
                </li>
                <li>
                  <b>7일 초과 및 계약 중 해지</b> 시{" "}
                  <span className="font-semibold text-gray-900">위약금(10~20%)</span>이
                  보증금에서 차감됩니다.
                </li>
              </ul>
            </>
          }
      />
  );
}
