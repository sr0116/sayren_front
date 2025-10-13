import {useApiMutation} from "@/hooks/useApi";

const BASE_URL = process.env.NEXT_PUBLIC_SPRING_API_BASE_URL;

export function useChangeDeliveryStatusMutation(options) {
  return useApiMutation("POST", "/api/admin/deliveries/change-status", { options });
}
//   이벤트 처리된 api 컨트롤러
export function useChangedDeliveryStatusMutation(options) {
  return useApiMutation("POST", "/api/admin/deliveries/changed-status", options);
}
