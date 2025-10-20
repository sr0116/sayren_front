import { api } from "@/lib/axios";
import { useApiMutation } from "@/hooks/useApi";

// 좋아요 토글 (상품/게시글)
export function useToggleLikeMutation(options) {
    return useApiMutation("POST", "/api/user/board/like", { options });
}

// 게시글 좋아요 요청 (일반 호출 방식)
export const toggleLike = async (boardId) => {
    console.log("[좋아요 토글 요청]", boardId);
    const res = await api.post("/api/user/board/like", { boardId });
    console.log("[좋아요 응답]", res.data);
    return res.data; // { id: boardId, likeCount: n }
};

// 특정 게시글 좋아요 개수 가져오기
export const getLikeCount = async (boardId) => {
    const res = await api.get(`/api/user/board/${boardId}/like`);
    return res.data;
};

//  내가 찜한 상품 목록 (마이페이지용)
export const getLikedProducts = async () => {
    console.log("[찜한 상품 목록 요청]");
    const res = await api.get("/api/mypage/like");
    console.log("[찜한 상품 목록 응답]", res.data);
    return res.data;
};
