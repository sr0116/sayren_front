import { useApiMutation, useApiQuery } from "@/hooks/useApi";

//  장바구니 담기
export function useAddCartItemMutation(options) {
  return useApiMutation("POST", "/api/user/cart/add-item", { options });
}

//  장바구니 조회
export function useCartItemsQuery(options) {
  return useApiQuery(["cart"], "/api/user/cart", { options });
}


// 장바구니 단일 삭제
export function useRemoveCartItemMutation(cartItemId, options) {
    return useApiMutation("DELETE", `/api/user/cart/delete-item/${cartItemId}`, { options });
}

// 장바구니 전체 비우기
export function useClearCartMutation(options) {
    return useApiMutation("DELETE", "/api/user/cart/clear-item", { options });
}