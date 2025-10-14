  import { useApiMutation, useApiQuery } from "@/hooks/useApi";

//  장바구니 담기
export function useAddCartItemMutation(options) {
  return useApiMutation("POST", "/api/user/cart/add-item", { options });

}


export function useCartItemsQuery(options) {
  return useApiQuery(["cart"], "/api/user/cart", options );
}

export function useRemoveCartItemMutation(cartItemId, options) {
  return useApiMutation("DELETE", `/api/user/cart/delete-item/${cartItemId}`, {options});
}

export function useClearCartMutation(options) {
  return useApiMutation("DELETE", "/api/user/cart/clear-item", {options});
}
