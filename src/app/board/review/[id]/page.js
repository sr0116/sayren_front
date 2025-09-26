// app/board/review/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getReviewById, deleteReview } from "@/api/reviewApi";
import Button from "@/components/common/Button";

export default function ReviewDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const data = await getReviewById(id);
        setReview(data);
      } catch (err) {
        console.error("[리뷰 조회 실패]", err);
        alert("리뷰를 불러오는 데 실패했습니다.");
        router.push("/board/review");
      } finally {
        setLoading(false);
      }
    };
    fetchReview();
  }, [id, router]);

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteReview(id);
      alert("삭제되었습니다.");
      router.push("/board/review");
    } catch (err) {
      console.error("[리뷰 삭제 실패]", err);
      alert("삭제 실패: " + (err.response?.message || err.message));
    }
  };

  if (loading) return <p>불러오는 중...</p>;
  if (!review) return <p>리뷰를 찾을 수 없습니다.</p>;

  return (
    <div className="max-w-3xl mx-auto p-10 border rounded-lg shadow-sm bg-white">
      <h1 className="text-2xl font-bold mb-2">{review.title}</h1>

      <div className="text-sm text-gray-500 mb-4 flex gap-2">
        <span>작성자: {review.writerName || "익명"}</span>
        <span>{new Date(review.regDate).toLocaleDateString()}</span>
      </div>

      <div
        className="prose max-w-none mb-6"
        dangerouslySetInnerHTML={{ __html: review.content }}
      />

      <div className="flex gap-2">
        <Button onClick={() => router.push(`/board/review/${id}/edit`)}>수정</Button>
        <Button variant="secondary" onClick={handleDelete}>삭제</Button>
        <Button variant="outline" onClick={() => router.push("/board/review")}>목록</Button>
      </div>
    </div>
  );
}
