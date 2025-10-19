"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TextInput } from "@/components/common/Input";
import Button from "@/components/common/Button";
import { getReviewById, updateReview } from "@/api/reviewApi";
import { queryClient } from "@/lib/queryClient";

export default function ReviewEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 기존 리뷰 불러오기
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const data = await getReviewById(id);
        setTitle(data.title || "");
        setContent(data.content || "");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("제목을 입력하세요");
      return;
    }
    if (!content || content.replace(/<[^>]*>/g, "").trim() === "") {
      alert("내용을 입력하세요");
      return;
    }

    try {
      setIsSaving(true);
      await updateReview(id, { title, content });
      alert("리뷰가 수정되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      router.push(`/board/review/${id}`);
    } catch (err) {
      console.error("[리뷰 수정 실패]", err);
      alert("수정 실패: " + (err.response?.data?.message || err.message));
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <p>불러오는 중...</p>;

  return (
      <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto p-6 bg-white">
        <h2 className="text-2xl font-bold mb-4">리뷰 수정하기</h2>

        <TextInput
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
        />

        <ReactQuill
            value={content}
            onChange={setContent}
            theme="snow"
            placeholder="내용을 입력하세요..."
            className="bg-white h-[400px]"
        />

        <div className="mt-10 flex gap-2">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "수정 중..." : "수정하기"}
          </Button>
          <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/board/review/${id}`)}
          >
            취소
          </Button>
        </div>
      </form>
  );
}
