import { api } from "@/lib/axios";
import { useApiQuery } from "@/hooks/useApi";

// 단일 주문 아이템 조회
export const getOrderItemById = async (orderItemId) => {
  try {
    const data = await api.get(`/api/user/order-items/${orderItemId}`);
    return data;
  } catch (err) {
    console.error("주문 아이템 조회 실패:", err);
    throw err;
  }
};

// React Query Hook
export function useOrderItemQuery(orderItemId, options) {
  return useApiQuery(
      ["orderItem", orderItemId],
      `/api/user/order-items/${orderItemId}`,
      { options, enabled: !!orderItemId }
  );
}
