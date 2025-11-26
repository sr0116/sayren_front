"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TextInput } from "@/components/common/Input";
import Button from "@/components/common/Button";
import { getReviewById, updateReview } from "@/api/reviewApi";
import { queryClient } from "@/lib/queryClient";

export default function ReviewEditClient({ id }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getReviewById(id).then((data) => {
      setTitle(data.title);
      setContent(data.content);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateReview(id, { title, content });

    queryClient.invalidateQueries({ queryKey: ["reviews"] });
    alert("수정 완료!");
    router.push(`/board/review/${id}`);
  };

  return (
      <form className="max-w-3xl mx-auto p-6 bg-white" onSubmit={handleSubmit}>
        <TextInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
        />

        <ReactQuill value={content} onChange={setContent} theme="snow" />

        <div className="flex gap-4 mt-6">
          <Button type="submit">수정 완료</Button>
          <Button variant="outline" onClick={() => router.back()}>
            취소
          </Button>
        </div>
      </form>
  );
}
