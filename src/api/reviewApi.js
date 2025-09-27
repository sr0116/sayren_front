import { api } from "@/lib/axios";
import { useApiMutation } from "@/hooks/useApi";

// 리뷰 등록
export function useReviewCreateMutation(options) {
  return useApiMutation("POST", "/api/user/reviews", { options });
}

// 리뷰 수정
export const updateReview = async (id, data) => {
  console.log("[리뷰 수정 요청]", id, data);
  const res = await api.put(`/api/user/reviews/${id}`, data);
  console.log("[리뷰 응답]", res);
  return res;
};

// 리뷰 목록 조회
export const getReviews = async () => {
  const res = await api.get("/api/user/reviews");
  console.log("[리뷰 응답]", res);
  return res;
};

// 리뷰 상세 조회
export const getReviewById = async (id) => {
  const res = await api.get(`/api/user/reviews/${id}`);
  console.log("[리뷰 응답]", res);
  return res;

};

// 리뷰 삭제
export const deleteReview = async (id) => {
  console.log("DELETE 요청 보냄:", `/api/user/reviews/${id}`);
  const res = await api.delete(`/api/user/reviews/${id}`);
  console.log("DELETE 응답:", res);
  return res;

};
