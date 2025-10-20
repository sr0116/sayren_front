  import { useApiMutation, useApiQuery } from "@/hooks/useApi";

//  장바구니 담기
export function useAddCartItemMutation(options) {
  return useApiMutation("POST", "/api/user/cart/add-item", { options });

}
//  장바구니 목록 조회
export function useCartItemsQuery(options) {
  return useApiQuery(["cart"], "/api/user/cart", options );
}
  // 장바구니에서 특정 상품 삭제
  export function useRemoveCartItemMutation(options = {}) {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

    return useApiMutation("DELETE", "/api/user/cart/delete-item", {
      ...options,
      options: {
        ...options,
        headers: {
          ...(options.headers || {}),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      },
      isCustomUrlAllowed: true,
    });
  }
  //장바구니 전체 비우기
export function useClearCartMutation(options) {
  return useApiMutation("DELETE", "/api/user/cart/clear-item", {options});
}
