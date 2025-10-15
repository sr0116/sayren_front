import { api } from "@/lib/axios";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import {useMutation, useQueryClient} from "@tanstack/react-query";

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

// 구독 회차 리스트
export function useSubscribeRoundsQuery(subscribeId, options) {
  return useApiQuery(
      ["subscribeRounds", subscribeId],
      `/api/user/subscribes/${subscribeId}/rounds`,
      { options }
  );
}

// 구독 회차 단건 상세
export function useSubscribeRoundDetailQuery(subscribeId, roundNo, options) {
  return useApiQuery(
      ["subscribeRound", subscribeId, roundNo],
      `/api/user/subscribes/${subscribeId}/rounds/${roundNo}`,
      { options }
  );
}

// 관리자: 전체 구독 조회
export function useAllSubscribesForAdminQuery(options) {
  return useApiQuery("allSubscribes", "/api/admin/subscribes", { options });
}

// 관리자: 구독 취소 승인/거절 처리
export function useProcessSubscribeCancelMutation(options) {
  return useApiMutation(
      "POST",
      (params) =>
          `/api/admin/subscribes/${params.id}/cancel?status=${params.status}&reasonCode=${params.reasonCode}`,
      {
        invalidateKeys: ["allSubscribes"],
        options,
      }
  );
}

// 구독 삭제 (직접 axios.delete 사용)
export function useDeleteSubscribeMutation(options) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (subscribeId) => {
      //  DELETE는 body 없이 전송해야 함
      return await api.delete(`/api/user/subscribes/${subscribeId}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: async (res, variables, context) => {
      //  캐시 무효화로 리스트 자동 새로고침
      await queryClient.invalidateQueries(["mySubscribes"]);
      options?.onSuccess?.(res, variables, context);
    },
    onError: options?.onError,
  });
}



