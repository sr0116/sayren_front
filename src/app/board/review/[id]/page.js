"use client";

export default function ReviewDetailPage({ params }) {
  const { id } = params;

  // 나중에 fetch(`/api/review/${id}`) 같은 식으로 API 불러오기
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">리뷰내용</h2>
      <div className="border p-4 rounded">
        <div className="flex justify-between mb-2">
          <span className="font-semibold">⭐ 5</span>
          <span className="text-gray-500 text-sm">2025-09-20</span>
        </div>
        <p>리뷰 상세 내용 (아이디: {id})</p>
      </div>
    </div>
  );
}
