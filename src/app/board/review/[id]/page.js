"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import { getReviewById, deleteReview } from "@/api/reviewApi";

export default function ReviewDetailPage({ params }) {
  const { id } = params; // URL에서 리뷰 ID 가져오기
  const router = useRouter();
  const [review, setReview] = useState(null);

  // 상세 데이터 가져오기
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const data = await getReviewById(id);
        setReview(data);
      } catch (err) {
        console.error(err);
        window.toast("error", "리뷰 상세를 불러오는 데 실패했습니다.");
      }
    };
    fetchReview();
  }, [id]);

  // 삭제 핸들러
  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteReview(id);
      window.toast("success", "삭제되었습니다.");
      router.push("/board/review"); // 삭제 후 목록으로 이동
    } catch (err) {
      console.error(err);
      window.toast("error", "삭제 실패");
    }
  };

  if (!review) {
    return <p className="text-center text-gray-500">불러오는 중...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">상세 후기</h2>

      <div className="border p-4 rounded bg-white">
        {/* 이미지 */}
        <img
          src={review.thumbnailUrl || "/no-image.png"}
          alt={review.productName || review.title}
          className="w-full h-60 object-cover mb-3 rounded"
        />

        {/* 별점 + 작성일 */}
        <div className="flex justify-between mb-2">
          <span className="text-red-500 font-semibold">
            {"★".repeat(review.rating || 0)}
          </span>
          <span className="text-gray-500 text-sm">{review.createdAt}</span>
        </div>

        {/* 제목(상품명) */}
        <h3 className="font-bold text-lg mb-2">
          {review.productName || review.title}
        </h3>

        {/* 내용 */}
        <p className="text-gray-700 mb-4">{review.content}</p>

        {/* 작성자 */}
        <div className="text-sm text-gray-500 mb-4">작성자: {review.writer}</div>

        {/* 버튼 */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="px-4 py-2 w-auto"
            onClick={() => router.push(`/board/review/${id}/edit`)}
          >
            수정
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="px-4 py-2 w-auto"
            onClick={handleDelete}
          >
            삭제
          </Button>
          <Button
            type="button"
            variant="primary"
            className="px-4 py-2 w-auto ml-auto"
            onClick={() => router.push("/board/review")}
          >
            목록으로
          </Button>
        </div>
      </div>
    </div>
  );
}
