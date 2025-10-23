import { statusLabelMap } from "@/utils/statusLabelMap";

export function getEnumOptions(enumType) {
  const enumMap = statusLabelMap[enumType];
  if (!enumMap) {
    console.warn(`Enum 타입 '${enumType}'을 찾을 수 없습니다.`);
    return [];
  }
  return Object.entries(enumMap).map(([value, label]) => ({
    value,
    label,
  }));
}

/**
 * 사용자 요청 옵션
 */
export const userSubscribeOptions = [
  {
    group: "구독 요청",
    options: [
      { reasonCode: "USER_REQUEST", label: "구독 취소 요청" },
      { reasonCode: "EXPIRED", label: "계약 만료 신청" },
    ],
  },
  {
    group: "문제 사유로 요청",
    options: [
      { reasonCode: "PRODUCT_DEFECT", label: "상품 불량" },
      { reasonCode: "DELIVERY_ISSUE", label: "배송 문제 (지연/오배송)" },
    ],
  },
];

/**
 * 관리자 구독 처리 옵션
 */
export const adminSubscribeOptions = [
  {
    group: "구독 요청 처리",
    options: [
      { reasonCode: "CONTRACT_CANCEL", label: "승인 - 구독 취소" },
      { reasonCode: "EXPIRED", label: "승인 - 계약 만료" },
      { reasonCode: "PRODUCT_DEFECT", label: "승인 - 상품 불량 환불" },
      { reasonCode: "DELIVERY_ISSUE", label: "승인 - 배송 문제 환불" },
      { reasonCode: "USER_REQUEST", label: "승인 - 단순 변심" },
      { reasonCode: "CANCEL_REJECTED", label: "거절" },
      { reasonCode: "ADMIN_FORCE_END", label: "강제 종료" },
    ],
  },
];


/**
 * 사용자 환불 요청 (일반)
 */
export const userRefundOptions = [
  {
    group: "환불 요청",
    options: [
      { value: "PENDING", label: "환불 요청 (단순 변심)", reasonCode: "USER_REQUEST" },
      { value: "PENDING", label: "환불 요청 (상품 불량)", reasonCode: "PRODUCT_DEFECT" },
      { value: "PENDING", label: "환불 요청 (배송 문제)", reasonCode: "DELIVERY_ISSUE" },
    ],
  },
];


/**
 *  관리자 환불 요청 처리 옵션
 * - RefundRequest 기반 (환불 승인/거절만 관리)
 */
export const adminRefundOptions = [
  {
    group: "환불 요청 처리",
    options: [
      { value: "APPROVED", label: "환불 승인", reasonCode: "AUTO_REFUND" },
      { value: "REJECTED", label: "환불 거절", reasonCode: "CANCEL_REJECTED" },
    ],
  },
];
