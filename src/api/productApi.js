import {useApiMutation} from "@/hooks/useApi";

export function useProductRegisterMutation(options) {
  return useApiMutation("POST", "api/admin/product/register", {options});
}

export function useProductDeleteMutation(options) {
  return useApiMutation("DELETE",() =>  `/api/admin/product/delete`, { options });
}

// export function useProductDeleteMutation(options) {
//   return useApiMutation("DELETE",({productId}) =>  `/api/admin/product/delete/${productId}`, { options });
// }