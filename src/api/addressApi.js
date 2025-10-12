import { api } from "@/lib/axios";

export const addressApi = {
    // 전체 배송지 목록 조회
    getAll: () => api.get("/api/user/addresses"),

    // 기본 배송지 조회
    getDefault: () => api.get("/api/user/addresses/default"),

    // 신규 배송지 등록
    create: (data) => api.post("/api/user/addresses", data),

    // 배송지 수정
    update: (id, data) => api.put(`/api/user/addresses/${id}`, data),

    // 배송지 삭제
    remove: (id) => api.delete(`/api/user/addresses/${id}`),
};
