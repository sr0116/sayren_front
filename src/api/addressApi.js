import { api } from "@/lib/axios";


export const addressApi = {

    // 전체 배송지 목록 조회

    getAll: async () => {
        const res = await api.get("/api/user/addresses");
        return res.data;
    },

   // 기본 배송지 조회

    getDefault: async () => {
        const res = await api.get("/api/user/addresses/default");
        return res.data;
    },

  // 신규 배송지 등록

    create: async (data) => {
        const res = await api.post("/api/user/addresses", data);
        return res.data;
    },

   // 배송지 수정

    update: async (id, data) => {
        const res = await api.put(`/api/user/addresses/${id}`, data);
        return res.data;
    },


      // 배송지 삭제

    remove: async (id) => {
        await api.delete(`/api/user/addresses/${id}`);
    },
};
