import { useApiMutation, useApiQuery } from "@/hooks/useApi";

// 주문 생성
export function useCreateOrderMutation(options) {
    return useApiMutation("POST", "/api/user/orders/create", { options });
}

// 내 주문 전체 조회
export function useMyOrdersQuery(options) {
    return useApiQuery(["orders"], "/api/user/orders/my", { options });
}

// 단일 주문 조회
export function useOrderQuery(orderId, options) {
    return useApiQuery(["order", orderId], `/api/user/orders/${orderId}`, { options });
}

// 결제 완료 처리
export function useMarkPaidMutation(orderId, options) {
    return useApiMutation("POST", `/api/user/orders/${orderId}/paid`, { options });
}

// 결제 실패/취소 처리
export function useCancelOrderMutation(orderId, options) {
    return useApiMutation("POST", `/api/user/orders/${orderId}/cancel`, { options });
}
