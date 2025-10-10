import { api } from "@/lib/axios";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";


// 내 알림 전체 조회
export const getMyNotifications = async () => {
  try {
    const data = await api.get("/api/user/notification/my");
    return data;
  } catch (err) {
    console.error("내 알림 조회 실패:", err);
    throw err;
  }
};

// 테스트용 알림 수동 생성 (일반적으로는 스케줄러/이벤트에서 자동 실행)
// export const sendNotification = async (body) => {
//   try {
//     const data = await api.post("/api/user/notification/send", body);
//     return data;
//   } catch (err) {
//     console.error("알림 전송 실패:", err);
//     throw err;
//   }
// };

// 단일 알림 조회
export const getNotificationById = async (notificationId) => {
  try {
    const res = await api.get(`/api/user/notification/${notificationId}`);
    return res.data;
  } catch (err) {
    console.error("단일 알림 조회 실패:", err);
    throw err;
  }
};

//  단일 알림 읽음 처리
export const markNotificationAsRead = async (notificationId) => {
  try {
    const data = await api.patch(`/api/user/notification/${notificationId}/read`);
    return data;
  } catch (err) {
    console.error("단일 알림 읽음 처리 실패:", err);
    throw err;
  }
};

//  선택 알림 읽음 처리
export const markSelectedAsRead = async (body) => {
  try {
    const data = await api.patch("/api/user/notification/read-selected", body);
    return data;
  } catch (err) {
    console.error("선택 알림 읽음 처리 실패:", err);
    throw err;
  }
};

// 전체 알림 읽음 처리
export const markAllAsRead = async () => {
  try {
    const data = await api.patch("/api/user/notification/read-all");
    return data;
  } catch (err) {
    console.error("전체 알림 읽음 처리 실패:", err);
    throw err;
  }
};

// 단일 알림 삭제
export const deleteNotification = async (notificationId) => {
  try {
    const data = await api.delete(`/api/user/notification/${notificationId}`);
    return data;
  } catch (err) {
    console.error("단일 알림 삭제 실패:", err);
    throw err;
  }
};

//선택 알림 삭제
export const deleteSelectedNotifications = async (body) => {
  try {
    const data = await api.delete("/api/user/notification/delete-selected", {
      data: body,
    });
    return data;
  } catch (err) {
    console.error("선택 알림 삭제 실패:", err);
    throw err;
  }
};

// 전체 알림 삭제
export const deleteAllNotifications = async () => {
  try {
    const data = await api.delete("/api/user/notification/delete-all");
    return data;
  } catch (err) {
    console.error("전체 알림 삭제 실패:", err);
    throw err;
  }
};


//
// React Query Hooks
//

// 내 알림 목록
export function useMyNotificationsQuery(options) {
  return useApiQuery("myNotifications", "/api/user/notification/my", { options });
}

// 알림 생성 (테스트용)
export function useSendNotificationMutation(options) {
  return useApiMutation("POST", "/api/user/notification/send", { options });
}

// 단일 알림 조회 (React Query Hook)
export function useNotificationDetailQuery(notificationId, options) {
  return useApiQuery(
      ["notificationDetail", notificationId],
      `/api/user/notification/${notificationId}`,
      { options }
  );
}


// 단일 알림 읽음 처리
export function useMarkNotificationAsReadMutation(notificationId, options) {
  return useApiMutation("PATCH", `/api/user/notification/${notificationId}/read`, {
    invalidateKeys: ["myNotifications"],
    options,
  });
}

// 선택 알림 읽음 처리
export function useMarkSelectedAsReadMutation(options) {
  return useApiMutation("PATCH", "/api/user/notification/read-selected", {
    invalidateKeys: ["myNotifications"],
    options,
  });
}

// 전체 알림 읽음 처리
export function useMarkAllAsReadMutation(options) {
  return useApiMutation("PATCH", "/api/user/notification/read-all", {
    invalidateKeys: ["myNotifications"],
    options,
  });
}

// 단일 알림 삭제
export function useDeleteNotificationMutation(notificationId, options) {
  return useApiMutation("DELETE", `/api/user/notification/${notificationId}`, {
    invalidateKeys: ["myNotifications"],
    options,
  });
}

// 선택 알림 삭제
export function useDeleteSelectedNotificationsMutation(options) {
  return useApiMutation("DELETE", "/api/user/notification/delete-selected", {
    invalidateKeys: ["myNotifications"],
    options,
  });
}

// 전체 알림 삭제
export function useDeleteAllNotificationsMutation(options) {
  return useApiMutation("DELETE", "/api/user/notification/delete-all", {
    invalidateKeys: ["myNotifications"],
    options,
  });
}
