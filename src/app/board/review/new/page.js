"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";

export default function ReviewNewPage() {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, content, file }); // 나중에 API 연결 예정
    router.push("/board/review");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">리뷰 작성</h2>

      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">
        <div>
          <label className="block mb-1 font-semibold">별점</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border p-2 rounded w-full"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} 점
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 rounded w-full"
            rows={3}
            placeholder="리뷰를 작성해주세요"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">첨부파일</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        <Button type="submit" className="text-white px-4 py-2 rounded">
          등록
        </Button>
      </form>
    </div>
  );
}
