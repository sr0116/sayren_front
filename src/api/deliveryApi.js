import {useApiMutation} from "@/hooks/useApi";

const BASE_URL = process.env.NEXT_PUBLIC_SPRING_API_BASE_URL;

export function useChangeDeliveryStatusMutation(options) {
  return useApiMutation("POST", "/api/admin/deliveries/change-status", { options });
}