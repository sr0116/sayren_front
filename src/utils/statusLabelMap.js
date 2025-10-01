// 상태(enum) → 한글 라벨 매핑

export const statusLabelMap = {
  // 공통
  CommonStatus: {
    ACTIVE: "활성",
    DISABLED: "비활성",
    DELETED: "삭제됨",
  },
  ActorType: {
    SYSTEM: "시스템",
    USER: "사용자",
    ADMIN: "관리자",
  },
  ReasonCode: {
    NONE: "없음",
    USER_REQUEST: "사용자 요청",
    AUTO_REFUND: "자동 환불",
    PRODUCT_DEFECT: "제품 불량",
    DELIVERY_ISSUE: "배송 문제",
    OUT_OF_STOCK: "재고 부족",
    CONTRACT_CANCEL: "계약 취소",
    OTHER: "기타",
    SERVICE_ERROR: "서비스 오류",
    SYSTEM_ERROR: "시스템 오류",
    PAYMENT_FAILURE: "결제 실패",
    CANCEL_REJECTED: "취소 거절",
    EXPIRED: "만료됨",
  },

  // 결제
  PaymentStatus: {
    PENDING: "결제 대기",
    PAID: "결제 완료",
    FAILED: "결제 실패",
    REFUNDED: "환불 완료",
    PARTIAL_REFUNDED: "부분 환불",
    COMPLETED: "정상 종료",
  },
  PaymentType: {
    KAKAO: "카카오페이",
    TOSS: "토스페이",
    CARD: "신용/체크카드",
  },

  // 환불 요청
  RefundRequestStatus: {
    PENDING: "환불 요청됨",
    APPROVED: "환불 승인됨",
    REJECTED: "환불 거절됨",
    CANCELED: "사용자 취소",
  },

  // 주문
  OrderStatus: {
    PENDING: "결제 대기",
    PAID: "결제 완료",
    SHIPPED: "배송 중",
    DELIVERED: "배송 완료",
    CANCELED: "취소됨",
  },
  OrderPlanType: {
    PURCHASE: "일시 구매",
    RENTAL: "렌탈 구독",
  },

  // 구독
  SubscribeStatus: {
    PENDING_PAYMENT: "결제 대기",
    PREPARING: "준비 중",
    ACTIVE: "진행 중",
    ENDED: "종료됨",
    CANCEL_REQUESTED: "취소 요청",
    CANCELED: "중도 해지",
    FAILED: "실패",
  },

  // 회원
  MemberStatus: {
    READY: "가입 대기",
    ACTIVE: "정상 회원",
    DISABLED: "비활성",
    DELETED: "삭제됨",
  },
  TokenStatus: {
    ACTIVE: "유효",
    EXPIRED: "만료",
    REVOKED: "강제 만료",
    BLACKLISTED: "보안 차단",
  },
};
