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



  NotificationType: {
    SUBSCRIBE: "구독 알림",
    SUBSCRIBE_ROUND: "회차 결제 안내",
    DELIVERY: "배송 알림",
    PAYMENT: "결제 알림",
    REFUND: "환불 알림",
    SYSTEM: "시스템 안내",
  },


  // 사유 코드 (ReasonCode)
  ReasonCode: {
    NONE: "없음",
    USER_REQUEST: "사용자 요청",
    AUTO_REFUND: "자동 환불",
    REFUND_REQUEST: "환불 요청",
    REFUND_COMPLETED: "환불 완료",
    REFUND_FAILED: "환불 실패",
    PRODUCT_DEFECT: "제품 불량",
    DELIVERY_ISSUE: "배송 문제",
    RETURN_REQUEST: "회수 요청됨",
    RETURN_DELAY: "회수 지연",
    RETURN_FAILED: "회수 실패",
    OUT_OF_STOCK: "재고 부족",
    SERVICE_ERROR: "서비스 오류",
    SYSTEM_ERROR: "시스템 오류",
    PAYMENT_FAILURE: "결제 실패",
    PAYMENT_TIMEOUT: "결제 시간 초과",
    CANCEL_REJECTED: "취소 거절",
    CONTRACT_CANCEL: "계약 해지",
    ADMIN_CANCEL: "관리자 취소",
    ADMIN_FORCE_END: "관리자 강제 종료",
    ACCOUNT_SUSPENDED: "계정 정지",
    FRAUD_DETECTED: "부정 결제 탐지",
    EXPIRED: "계약 만료",
    OTHER: "기타",
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

  // 환불 요청 상태
  RefundRequestStatus: {
    PENDING: "환불 요청",
    AUTO_REFUND: "자동 환불",
    APPROVED: "환불 승인",
    APPROVED_WAITING_RETURN: "회수 대기 중",
    REJECTED: "환불 거절",
    CANCELED: "사용자 취소",
  },

  // 주문 상태
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

  // 구독 상태
  SubscribeStatus: {
    PENDING_PAYMENT: "결제 대기",
    PREPARING: "준비 중",
    ACTIVE: "진행 중",
    OVERDUE: "연체",
    ENDED: "종료됨",
    CANCELED: "중도 해지",
    FAILED: "결제 실패",
  },

  // 구독 상태 전이 (SubscribeTransition)
  SubscribeTransition: {
    PENDING_PAYMENT: "결제 대기",
    PREPARE: "결제 완료 (배송 준비)",
    FAIL_PAYMENT: "결제 실패",
    PREPARE_CANCEL_REQUEST: "배송 전 취소 요청",
    PREPARE_CANCEL_APPROVE: "배송 전 취소 승인",
    DELIVERY_IN_PROGRESS: "배송 중",
    START: "구독 시작",
    REQUEST_CANCEL: "취소 요청",
    CANCEL_APPROVE: "취소 승인",
    CANCEL_REJECT: "취소 거절",
    RETURN_REQUEST: "회수 요청됨",
    RETURN_IN_PROGRESS: "회수 진행 중",
    RETURN_DELAY: "회수 지연",
    RETURN_FAILED: "회수 실패",
    RETURNED_ONLY: "회수 완료(종료 전)",
    RETURNED_AND_CANCELED: "회수 완료 및 해지",
    END: "계약 종료",
    OVERDUE_PENDING: "연체 대기",
    OVERDUE_FINAL: "연체 확정",
    OVERDUE: "연체 중",
    ADMIN_FORCE_END: "관리자 강제 종료",
  },

  // 회차 단위 전이 (SubscribeRoundTransition)
  SubscribeRoundTransition: {
    PAY_SUCCESS: "회차 결제 성공",
    PAY_FAIL: "회차 결제 실패",
    PAY_TIMEOUT: "결제 시간 초과",
    CANCEL: "자동 환불",
    RETRY_SUCCESS: "재시도 성공",
    RETRY_FAIL: "재시도 실패",
    RETRY_PENDING: "재시도 대기 중",
    INIT_FAIL: "초기 결제 실패",
    CANCEL_ALL: "전체 취소",
    FORCED_END: "강제 종료",
  },

  // 회원 상태
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
