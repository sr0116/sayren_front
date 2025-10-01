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
  ReasonCode: {
    NONE: "bg-gray-100 text-gray-800",
    USER_REQUEST: "bg-orange-100 text-orange-800",
    AUTO_REFUND: "bg-orange-100 text-orange-800",
    PRODUCT_DEFECT: "bg-orange-100 text-orange-800",
    DELIVERY_ISSUE: "bg-orange-100 text-orange-800",
    OUT_OF_STOCK: "bg-orange-100 text-orange-800",
    CONTRACT_CANCEL: "bg-orange-200 text-orange-900",
    OTHER: "bg-gray-200 text-gray-800",
    SERVICE_ERROR: "bg-red-100 text-red-800",
    SYSTEM_ERROR: "bg-red-200 text-red-900",
    PAYMENT_FAILURE: "bg-red-100 text-red-800",
    CANCEL_REJECTED: "bg-red-200 text-red-900",
    EXPIRED: "bg-gray-100 text-gray-800",
  },

  // 결제
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

  // 환불 요청
  RefundRequestStatus: {
    PENDING: "bg-yellow-100 text-yellow-800",   // 환불 요청됨
    APPROVED: "bg-green-100 text-green-800",    // 환불 승인됨
    REJECTED: "bg-red-100 text-red-800",        // 환불 거절됨
    CANCELED: "bg-gray-100 text-gray-800",      // 사용자 취소
  },

  // 주문
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

  // 구독
  SubscribeStatus: {
    PENDING_PAYMENT: "bg-yellow-100 text-yellow-800", // 결제 대기
    PREPARING: "bg-blue-100 text-blue-800",           // 준비 중
    ACTIVE: "bg-green-100 text-green-800",            // 진행 중
    ENDED: "bg-gray-100 text-gray-800",               // 종료됨
    CANCEL_REQUESTED: "bg-orange-100 text-orange-800",// 취소 요청
    CANCELED: "bg-red-100 text-red-800",              // 중도 해지
    FAILED: "bg-red-200 text-red-900",                // 실패
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
