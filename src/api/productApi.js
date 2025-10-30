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

export async function productData() {
  const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/product`,
      {
        cache: "no-store", // 캐시 방지
      }
  );

  if (!res.ok) {
    console.error(" productData fetch failed:", res.status);
    return [];
  }

  return await res.json();
}