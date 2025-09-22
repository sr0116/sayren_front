"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "@/components/common/Button";

const dummyQuestions = [
  { id: 1, type: "일반", title: "제품 사용 방법이 궁금합니다.", createdAt: "2025-09-20" },
  { id: 2, type: "AS", title: "설치 후 소음이 있습니다.", createdAt: "2025-09-21" },
];

export default function QuestionListPage() {
  const [filter, setFilter] = useState("전체");

  const filtered = filter === "전체"
    ? dummyQuestions
    : dummyQuestions.filter((q) => q.type === filter);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">문의하기</h2>

      {/* 탭 */}
      <div className="flex gap-2 mb-4">
        {["전체", "일반", "AS"].map((t) => (
          <Button
            key={t}
            type="button"
            onClick={() => setFilter(t)}
            // 선택된 버튼은 primary, 아니면 outline 스타일
            variant={filter === t ? "primary" : "outline"}
            className="w-auto px-4 py-2"
          >
            {t}문의
          </Button>
        ))}
      </div>

      {/* 목록 */}
      <ul className="divide-y border rounded">
        {filtered.map((q) => (
          <li key={q.id} className="p-3 flex justify-between items-center">
            <Link
              href={`/board/support/question/${q.id}`}
              className="hover:underline flex items-center gap-2"
            >
              {/* 카테고리 라벨 */}
              <span
                className={`px-2 py-1 text-xs font-semibold rounded 
            ${q.type === "AS"
                  ? "bg-gray-100 text-blue-600"
                  : "bg-gray-100 text-gray-600"}`}
              >
          {q.type}
        </span>

              {/* 제목 */}
              <span>{q.title}</span>
            </Link>

            {/* 작성일 */}
            <span className="text-sm text-gray-500">{q.createdAt}</span>
          </li>
        ))}
      </ul>


      {/* 작성 버튼 */}
      <div className="mt-4 text-right">
        <Link href="/board/support/question/new">
          <Button variant="primary" className="w-auto px-6 py-2">
            문의 작성하기
          </Button>
        </Link>
      </div>
    </div>
  );
}
