// 상태(enum) → Tailwind 색상 매핑
// 규칙: Green(성공/정상), Yellow(대기), Blue(진행), Red(실패/거절), Gray(종료/만료), Orange(특수/사용자 요청)

export const statusColorMap = {
  // 공통
  CommonStatus: {
    ACTIVE: "bg-green-100 text-green-800",
    DISABLED: "bg-red-100 text-red-800",
    DELETED: "bg-gray-100 text-gray-800",
  },
  ActorType: {
    SYSTEM: "bg-gray-200 text-gray-800",
    USER: "bg-blue-100 text-blue-800",
    ADMIN: "bg-blue-200 text-blue-900",
  },

  // 사유코드(ReasonCode)
  ReasonCode: {
    NONE: "bg-gray-100 text-gray-800",
    USER_REQUEST: "bg-orange-100 text-orange-800",
    AUTO_REFUND: "bg-orange-100 text-orange-800",
    REFUND_REQUEST: "bg-orange-100 text-orange-800",
    REFUND_COMPLETED: "bg-green-100 text-green-800",
    REFUND_FAILED: "bg-red-100 text-red-800",
    PRODUCT_DEFECT: "bg-orange-100 text-orange-800",
    DELIVERY_ISSUE: "bg-orange-100 text-orange-800",
    RETURN_REQUEST: "bg-orange-100 text-orange-800",
    RETURN_DELAY: "bg-yellow-100 text-yellow-800",
    RETURN_FAILED: "bg-red-100 text-red-800",
    OUT_OF_STOCK: "bg-orange-100 text-orange-800",
    SERVICE_ERROR: "bg-red-100 text-red-800",
    SYSTEM_ERROR: "bg-red-200 text-red-900",
    PAYMENT_FAILURE: "bg-red-100 text-red-800",
    PAYMENT_TIMEOUT: "bg-red-200 text-red-900",
    CANCEL_REJECTED: "bg-red-200 text-red-900",
    CONTRACT_CANCEL: "bg-orange-200 text-orange-900",
    ADMIN_CANCEL: "bg-red-200 text-red-900",
    ADMIN_FORCE_END: "bg-red-200 text-red-900",
    ACCOUNT_SUSPENDED: "bg-red-200 text-red-900",
    FRAUD_DETECTED: "bg-red-200 text-red-900",
    EXPIRED: "bg-gray-100 text-gray-800",
    OTHER: "bg-gray-200 text-gray-800",
  },

  // 결제 상태
  PaymentStatus: {
    PENDING: "bg-yellow-100 text-yellow-800",        // 결제 대기
    PAID: "bg-green-100 text-green-800",             // 결제 완료
    FAILED: "bg-red-100 text-red-800",               // 결제 실패
    REFUNDED: "bg-gray-100 text-gray-800",           // 환불 완료
    PARTIAL_REFUNDED: "bg-orange-100 text-orange-800", // 부분 환불
    COMPLETED: "bg-green-200 text-green-900",        // 정상 종료
  },
  PaymentType: {
    KAKAO: "bg-yellow-100 text-yellow-800",
    TOSS: "bg-blue-100 text-blue-800",
    CARD: "bg-indigo-100 text-indigo-800",
  },

  // 환불 요청 상태
  RefundRequestStatus: {
    PENDING: "bg-yellow-100 text-yellow-800",           // 요청 대기
    APPROVED: "bg-green-100 text-green-800",            // 승인됨
    APPROVED_WAITING_RETURN: "bg-blue-100 text-blue-800", // 회수 대기
    REJECTED: "bg-red-100 text-red-800",                // 거절됨
    CANCELED: "bg-gray-100 text-gray-800",              // 사용자 취소
  },

  // 주문 상태
  OrderStatus: {
    PENDING: "bg-yellow-100 text-yellow-800",   // 결제 대기
    PAID: "bg-green-100 text-green-800",        // 결제 완료
    SHIPPED: "bg-blue-100 text-blue-800",       // 배송 중
    DELIVERED: "bg-green-200 text-green-900",   // 배송 완료
    CANCELED: "bg-red-100 text-red-800",        // 취소됨
  },
  OrderPlanType: {
    PURCHASE: "bg-green-100 text-green-800",
    RENTAL: "bg-blue-100 text-blue-800",
  },

  // 구독 상태
  SubscribeStatus: {
    PENDING_PAYMENT: "bg-yellow-100 text-yellow-800", // 결제 대기
    PREPARING: "bg-blue-100 text-blue-800",           // 준비 중
    ACTIVE: "bg-green-100 text-green-800",            // 진행 중
    OVERDUE: "bg-orange-100 text-orange-800",         // 연체
    ENDED: "bg-gray-100 text-gray-800",               // 종료됨
    CANCELED: "bg-red-100 text-red-800",              // 중도 해지
    FAILED: "bg-red-200 text-red-900",                // 결제 실패
  },

  // 구독 전이(transition) — 상태는 SubscribeStatus 색상 재사용
  SubscribeTransition: {
    PENDING_PAYMENT: "bg-yellow-100 text-yellow-800",
    PREPARE: "bg-blue-100 text-blue-800",
    FAIL_PAYMENT: "bg-red-100 text-red-800",
    PREPARE_CANCEL_REQUEST: "bg-orange-100 text-orange-800",
    PREPARE_CANCEL_APPROVE: "bg-gray-100 text-gray-800",
    DELIVERY_IN_PROGRESS: "bg-blue-100 text-blue-800",
    START: "bg-green-100 text-green-800",
    REQUEST_CANCEL: "bg-orange-100 text-orange-800",
    CANCEL_APPROVE: "bg-orange-200 text-orange-900",
    CANCEL_REJECT: "bg-red-200 text-red-900",
    RETURN_REQUEST: "bg-orange-100 text-orange-800",
    RETURN_IN_PROGRESS: "bg-blue-100 text-blue-800",
    RETURN_DELAY: "bg-yellow-100 text-yellow-800",
    RETURN_FAILED: "bg-red-100 text-red-800",
    RETURNED_ONLY: "bg-gray-100 text-gray-800",
    RETURNED_AND_CANCELED: "bg-red-100 text-red-800",
    END: "bg-gray-200 text-gray-800",
    OVERDUE_PENDING: "bg-orange-100 text-orange-800",
    OVERDUE_FINAL: "bg-red-100 text-red-800",
    OVERDUE: "bg-orange-200 text-orange-900",
    ADMIN_FORCE_END: "bg-red-200 text-red-900",
  },

  // 회차 전이(SubscribeRoundTransition)
  SubscribeRoundTransition: {
    PAY_SUCCESS: "bg-green-100 text-green-800",
    PAY_FAIL: "bg-red-100 text-red-800",
    PAY_TIMEOUT: "bg-red-200 text-red-900",
    CANCEL: "bg-gray-100 text-gray-800",
    RETRY_SUCCESS: "bg-green-200 text-green-900",
    RETRY_FAIL: "bg-red-200 text-red-900",
    RETRY_PENDING: "bg-yellow-100 text-yellow-800",
    INIT_FAIL: "bg-red-200 text-red-900",
    CANCEL_ALL: "bg-orange-200 text-orange-900",
    FORCED_END: "bg-gray-200 text-gray-800",
  },

  // 회원
  MemberStatus: {
    READY: "bg-yellow-100 text-yellow-800",   // 가입 대기
    ACTIVE: "bg-green-100 text-green-800",    // 정상 회원
    DISABLED: "bg-red-100 text-red-800",      // 비활성
    DELETED: "bg-gray-100 text-gray-800",     // 삭제
  },
  TokenStatus: {
    ACTIVE: "bg-green-100 text-green-800",    // 유효
    EXPIRED: "bg-gray-100 text-gray-800",     // 만료
    REVOKED: "bg-red-100 text-red-800",       // 강제 만료
    BLACKLISTED: "bg-red-200 text-red-900",   // 보안 차단
  },
};
