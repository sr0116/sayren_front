"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import { TextInput } from "@/components/common/Input";

export default function QuestionNewPage() {
  const [type, setType] = useState("일반");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ type, title, content });
    alert("문의가 등록되었습니다.");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">문의하기</h2>

      {/* 탭 */}
      <div className="flex gap-2 mb-4">
        {["일반", "AS"].map((t) => (
          <Button
            key={t}
            type="button"
            variant={type === t ? "primary" : "outline"}
            onClick={() => setType(t)}
            className="w-auto px-4 py-2"  // w-full 기본값 덮어쓰기
          >
            {t}문의
          </Button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput
          placeholder="제목을 입력하세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border rounded p-2 h-40 resize-none"
          placeholder={`${type}문의 내용을 작성해주세요.`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit">
          {type}문의 제출하기
        </Button>
      </form>
    </div>
  );
}
