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
  return useApiMutation(
      "POST",
      // reasonCode를 URL에 직접 포함시킴
      ({ reasonCode }) =>
          `/api/user/subscribes/${id}/cancel?reasonCode=${reasonCode || "USER_REQUEST"}`,
      { options }
  );
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
//  관리자: 전체 구독 조회 (응답 구조 자동 정규화)
export function useAllSubscribesForAdminQuery(options) {
  return useApiQuery(["allSubscribes"], "/api/admin/subscribes", {
    options: {
      select: (res) => {

        //  res가 배열 형태면 그대로 반환
        if (Array.isArray(res)) return res;
        // res.data 형태면 내부 배열 반환
        if (Array.isArray(res?.data)) return res.data;
        // ️res.data.data 형태면 그것 반환
        if (Array.isArray(res?.data?.data)) return res.data.data;

        console.warn(" 예기치 않은 응답 구조:", res);
        return [];
      },
      ...options,
    },
  });
}
//  관리자: 구독 취소 승인/거절 처리
export function useProcessSubscribeCancelMutation(options) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables) => {

      if (!variables?.id) throw new Error("Missing id in mutation variables");

      const { id, status, reasonCode } = variables;

      //  URL 직접 구성
      const url = `/api/admin/subscribes/${id}/cancel?status=${status}&reasonCode=${reasonCode}`;
      console.debug("[DEBUG] 관리자 구독 취소 요청 URL:", url);

      //  API 호출
      return await api.post(url, {});
    },

    onSuccess: async (res, variables, context) => {
      console.debug("구독 취소 처리 성공:", res);
      await queryClient.invalidateQueries(["allSubscribes"]);
      options?.onSuccess?.(res, variables, context);
    },

    onError: (err, variables, context) => {
      console.error(" 구독 취소 처리 실패:", err);
      options?.onError?.(err, variables, context);
    },
  });
}




