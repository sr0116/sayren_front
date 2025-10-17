import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import { useQueryClient } from "@tanstack/react-query";

//  전체 배송 목록 조회
export function useAllDeliveriesQuery(params, options) {
  return useApiQuery(
      ["allDeliveries", params],
      "/api/admin/deliveries/get-list",
      {
        params,

        options: {
          keepPreviousData: true,
          staleTime: 0,
          cacheTime: 0,
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          ...options,
        },
      }
  );
}

//이벤트 처리된 배송 상태 변경 + invalidate 자동 포함
export function useChangedDeliveryStatusMutation(
    options = {},
    invalidateKey = ["allDeliveries"]
) {
  const queryClient = useQueryClient();

  return useApiMutation("POST", "/api/admin/deliveries/changed-status", {
    options: {
      ...options,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(invalidateKey);
        options?.onSuccess?.(data, variables, context);
      },
    },
  });
}
