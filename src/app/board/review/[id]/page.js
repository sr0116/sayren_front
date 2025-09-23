"use client";

import Button from "@/components/common/Button";

export default function ReviewDetailPage({ params }) {
  const { id } = params;

  // 더미 데이터 대신 API 연동 예정
  const review = {
    id,
    productName: "SAYREN 퓨리케어 오브제컬렉션 정수기",
    rating: 5,
    content: "성능 좋고 편리해요.",
    writer: "이수*",
    createdAt: "2025-09-23",
    image: "/sample1.jpg",
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">상세 후기</h2>

      <div className="border p-4 rounded bg-white">
        {/* 이미지 */}
        <img
          src={review.image}
          alt={review.productName}
          className="w-full h-60 object-cover mb-3 rounded"
        />

        {/* 별점 + 작성일 */}
        <div className="flex justify-between mb-2">
          <span className="text-red-500 font-semibold">
            {"★".repeat(review.rating)}
          </span>
          <span className="text-gray-500 text-sm">{review.createdAt}</span>
        </div>

        {/* 제목(상품명) */}
        <h3 className="font-bold text-lg mb-2">{review.productName}</h3>

        {/* 내용 */}
        <p className="text-gray-700 mb-4">{review.content}</p>

        {/* 작성자 */}
        <div className="text-sm text-gray-500 mb-4">작성자: {review.writer}</div>

        {/* 버튼 */}
        <div className="flex gap-2">
          <Button type="button" variant="outline" className="px-4 py-2 w-auto">
            수정
          </Button>
          <Button type="button" variant="secondary" className="px-4 py-2 w-auto">
            삭제
          </Button>
          <Button
            type="button"
            variant="primary"
            className="px-4 py-2 w-auto ml-auto"
            onClick={() => history.back()}
          >
            목록으로
          </Button>
        </div>
      </div>
    </div>
  );
}
