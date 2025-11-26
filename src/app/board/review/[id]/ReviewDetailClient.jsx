"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getReviewById, deleteReview } from "@/api/reviewApi";
import Button from "@/components/common/Button";

export default function ReviewDetailClient({ id }) {
  const router = useRouter();
  const [review, setReview] = useState(null);

  useEffect(() => {
    getReviewById(id).then(setReview).catch(() => router.push("/board/review"));
  }, [id]);

  if (!review) return <p>로딩중...</p>;

  const handleDelete = async () => {
    if (!confirm("정말 삭제할까요?")) return;
    await deleteReview(id);
    alert("삭제 완료!");
    router.push("/board/review");
  };

  return (
      <div className="max-w-3xl mx-auto p-10 bg-white shadow-md">
        <h1 className="text-2xl font-bold">{review.title}</h1>

        <div
            className="prose max-w-none my-6"
            dangerouslySetInnerHTML={{ __html: review.content }}
        />

        <div className="flex gap-3">
          <Button onClick={() => router.push(`/board/review/${id}/edit`)}>
            수정
          </Button>
          <Button variant="secondary" onClick={handleDelete}>
            삭제
          </Button>
          <Button variant="outline" onClick={() => router.push("/board/review")}>
            목록
          </Button>
        </div>
      </div>
  );
}
