"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TextInput } from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useFormInput } from "@/hooks/useFormInput";
import { useReviewCreateMutation } from "@/api/reviewApi";
import { queryClient } from "@/lib/queryClient";

export default function ReviewNewClient() {
  const router = useRouter();
  const params = useSearchParams();
  const [content, setContent] = useState("");

  const productId = Number(params.get("productId") || 0);

  const { formData: form, handleChange } = useFormInput({
    title: "",
    categoryId: 2,
    isSecret: false,
  });

  const { mutate: createReview, isLoading } = useReviewCreateMutation({
    onSuccess: () => {
      alert("등록 완료!");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      router.push("/board/review");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) return alert("제목을 입력하세요");
    if (!content.replace(/<[^>]*>/g, "").trim())
      return alert("내용을 입력하세요");

    createReview({
      data: {
        ...form,
        content,
        productId: productId || 231,
      },
    });
  };

  return (
      <form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-3xl mx-auto p-6 bg-white"
      >
        <TextInput
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="제목"
        />

        <ReactQuill
            value={content}
            onChange={setContent}
            theme="snow"
            className="h-[400px]"
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "등록중..." : "등록하기"}
        </Button>
      </form>
  );
}
