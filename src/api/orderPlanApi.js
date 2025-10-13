import { api } from "@/lib/axios"; // 이미 설정된 axios 프록시 사용

// 요금제 전체 조회
export const getOrderPlans = () => api.get("/api/order-plans");

// 요금제 단건 조회
export const getOrderPlanById = (id) => api.get(`/api/order-plans/${id}`);

// 요금제 등록
export const createOrderPlan = (data) => api.post("/api/order-plans", data);

// 요금제 수정
export const updateOrderPlan = (id, data) =>
  api.put(`/api/order-plans/${id}`, data);

// 요금제 삭제
export const deleteOrderPlan = (id) => api.delete(`/api/order-plans/${id}`);
