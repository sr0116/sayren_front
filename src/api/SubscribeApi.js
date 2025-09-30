import { api } from "@/lib/axios";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";

// 내 구독 요약 리스트 (마이페이지)
export const getMySubscribes = async () => {
  try {
    const data = await api.get("/api/user/subscribes");
    return data;
  } catch (err) {
    console.error("구독 요약 조회 실패:", err);
    throw err;
  }
};

// 구독 단건 상세 조회
export const getSubscribeById = async (id) => {
  try {
    const data = await api.get(`/api/user/subscribes/${id}`);
    return data;
  } catch (err) {
    console.error("구독 상세 조회 실패:", err);
    throw err;
  }
};

// 구독 상태 변경 이력 조회
export const getSubscribeHistories = async (id) => {
  try {
    const data = await api.get(`/api/user/subscribes/${id}/histories`);
    return data;
  } catch (err) {
    console.error("구독 이력 조회 실패:", err);
    throw err;
  }
};

// 구독 취소 요청
export const cancelSubscribe = async (id) => {
  try {
    const data = await api.post(`/api/user/subscribes/${id}/cancel`, {});
    return data;
  } catch (err) {
    console.error("구독 취소 요청 실패:", err);
    throw err;
  }
};

//
// React Query Hooks
//

// 내 구독 리스트
export function useMySubscribesQuery(options) {
  return useApiQuery("mySubscribes", "/api/user/subscribes", { options });
}

// 구독 단건
export function useSubscribeByIdQuery(id, options) {
  return useApiQuery(["subscribe", id], `/api/user/subscribes/${id}`, {
    options,
  });
}

// 구독 이력
export function useSubscribeHistoriesQuery(id, options) {
  return useApiQuery(
      ["subscribeHistories", id],
      `/api/user/subscribes/${id}/histories`,
      { options }
  );
}

// 구독 취소
export function useCancelSubscribeMutation(id, options) {
  return useApiMutation("POST", `/api/user/subscribes/${id}/cancel`, {
    options,
  });
}
