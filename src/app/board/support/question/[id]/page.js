"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

// 더미 데이터
const dummyQuestions = {
  1: { id: 1, type: "일반", title: "제품 사용 방법이 궁금합니다.", content: "이 제품은 어떻게 사용하는 건가요?", createdAt: "2025-09-20" },
  2: { id: 2, type: "AS", title: "설치 후 소음이 있습니다.", content: "설치 후 소음이 발생합니다. 조치가 필요합니다.", createdAt: "2025-09-21" },
};

export default function QuestionDetailPage() {
  const { id } = useParams();
  const question = dummyQuestions[id];

  if (!question) {
    return <p className="p-6">존재하지 않는 문의입니다.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">[{question.type}] {question.title}</h2>
      <p className="text-sm text-gray-500 mb-4">{question.createdAt}</p>
      <p className="mb-6">{question.content}</p>

      {/* 목록으로 */}
      <Link href="/board/support/question" className="text-[#ff0066] hover:underline mt-4 block">
        목록으로 돌아가기
      </Link>
    </div>
  );
}
