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

    // 나중에 API 연동 예정
    console.log({ rating, content, file });

    // 작성 후 목록으로 이동
    router.push("/board/review");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">리뷰 작성</h2>

      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">
        {/* 별점 */}
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

        {/* 내용 */}
        <div>
          <label className="block mb-1 font-semibold">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 rounded w-full"
            rows={4}
            placeholder="리뷰를 작성해주세요"
          />
        </div>

        {/* 첨부파일 */}
        <div>
          <label className="block mb-1 font-semibold">첨부파일</label>

          {/* 숨겨진 파일 input */}
          <input
            id="file-upload"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />

          {/* label 자체를 버튼처럼 */}
          <label
            htmlFor="file-upload"
            className="inline-block border border-gray-900 px-3 py-1 text-sm rounded cursor-pointer hover:bg-gray-100"
          >
            파일 선택
          </label>

          {/* 파일명 표시 */}
          <p className="mt-2 text-sm text-gray-600">
            {file ? file.name : "선택된 파일 없음"}
          </p>
        </div>

        {/* 버튼 */}
        <div className="flex gap-2">
          <Button
            type="submit"
            variant="primary"
            className="px-4 py-2 w-auto"
          >
            등록
          </Button>
          <Button
            type="button"
            variant="outline"
            className="px-4 py-2 w-auto"
            onClick={() => router.push("board/review")}
          >
            취소
          </Button>
        </div>
      </form>
    </div>
  );
}
