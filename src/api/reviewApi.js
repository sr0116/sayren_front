import axios from "axios";

// 후기 등록
export const createReview = async ({ title, content }) => {
  try {
    const res = await axios.post(
      "/api/proxy/api/reviews",   // 서버 엔드포인트
      {
        categoryId: 3,           // REVIEW 카테고리 번호 (DB 맞게 조정)
        title,
        content,
        secret: false,           // 후기글은 비밀글 불가
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.error("후기 등록 실패:", err);
    throw err;
  }
};

// 후기 목록 조회
export const getReviews = async () => {
  try {
    const res = await axios.get("/api/proxy/api/reviews?category=REVIEW", {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("후기 목록 조회 실패:", err);
    throw err;
  }
};

// 후기 상세 조회
export const getReviewById = async (boardId) => {
  try {
    const res = await axios.get(`/api/proxy/api/reviews/${boardId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("후기 상세 조회 실패:", err);
    throw err;
  }
};

// 후기 삭제
export const deleteReview = async (boardId) => {
  try {
    await axios.delete(`/api/proxy/api/reviews/${boardId}`, {
      withCredentials: true,
    });
  } catch (err) {
    console.error("후기 삭제 실패:", err);
    throw err;
  }
};
