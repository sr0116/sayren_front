"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function QnaDetailPage() {
  const { id } = useParams();
  const qna = dummyQnas[id];

  if (!qna) {
    return <p className="p-6">존재하지 않는 문의입니다.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">[{qna.type}] {qna.title}</h2>
      <p className="text-sm text-gray-500 mb-4">{qna.createdAt}</p>
      <p className="mb-6">{qna.content}</p>

      {/* 목록으로 */}
      <Link href="/board/support/qna" className="text-[#ff0066] hover:underline mt-4 block">
        목록으로 돌아가기
      </Link>
    </div>
  );
}
