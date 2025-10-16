"use client";

import ConfirmDialog from "@/components/common/ConfirmDialog";

export default function RefundPolicyModal() {
  return (
      <ConfirmDialog
          title="환불 규정 안내"
          hideCancel
          confirmText="확인"
          message={
            <>
              <p className="font-medium text-gray-800 mb-2">
                결제 및 구독(렌탈) 상품의 환불 규정은 다음과 같습니다:
              </p>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-2">
                <li>
                  <b>결제 후 24시간 이내</b> 요청 시{" "}
                  <span className="font-semibold text-gray-900">전액 환불</span>
                </li>
                <li>
                  <b>상품 불량 / 배송 문제</b> 사유일 경우{" "}
                  <span className="font-semibold text-gray-900">전액 환불</span>
                </li>
                <li>
                  <b>배송 완료 후 7일 이내 단순 변심</b> 시{" "}
                  <span className="font-semibold text-gray-900">5%</span> 차감 후 환불
                </li>
                <li>
                  <b>배송 완료 후 7일 초과</b> 시 단순 변심 환불은 불가
                </li>
                <li>
                  <b>렌탈 상품</b>의 경우 계약 중 해지 시{" "}
                  <span className="font-semibold text-gray-900">위약금(10~20%)</span>
                  이 보증금에서 차감됨
                </li>
              </ul>
            </>
          }
      />
  );
}
