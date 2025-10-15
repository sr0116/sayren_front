"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TextInput } from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useFormInput } from "@/hooks/useFormInput";
import { useReviewCreateMutation } from "@/api/reviewApi";
import {queryClient} from "@/lib/queryClient";

export default function ReviewNewPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [content, setContent] = useState("");

  // productId
  const productId = Number(params.get("productId") || 0);

  const { formData: form, handleChange } = useFormInput({
    title: "",
    categoryId: 2,
    isSecret: false,
  });

  const { mutate: createReview, isLoading } = useReviewCreateMutation({
    onSuccess: () => {
      alert("후기가 등록되었습니다!");
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
      router.push("/board/review");
    },
    onError: (err) => {
      console.error("[리뷰 등록 실패]", err);
      alert("등록 실패: " + (err.response?.data?.message || err.message));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("제목을 입력하세요");
      return;
    }
    if (!content || content.replace(/<[^>]*>/g, "").trim() === "") {
      alert("내용을 입력하세요");
      return;
    }

    createReview({
      data: {
        ...form,
        productId: 3,
        content, // 바로 HTML 문자열
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto p-6 bg-white">
      <TextInput
        name="title"
        type="text"
        value={form.title}
        onChange={handleChange}
        placeholder="제목을 입력하세요"
      />

      {/* React Quill Editor */}
      <ReactQuill
        value={content}
        onChange={setContent}
        theme="snow"
        placeholder="내용을 입력하세요..."
        className="bg-white h-[400px]"
      />

      <div className="mt-15">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "등록중..." : "등록하기"}
        </Button>
      </div>
    </form>
  );
}
