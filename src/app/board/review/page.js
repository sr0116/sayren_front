"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import Link from "next/link";

// 더미 데이터
const dummyReviews = [
  {
    id: 1,
    productName: "SAYREN 퓨리케어 오브제컬렉션 정수기",
    category: "정수기",
    rating: 5,
    content: "성능 좋고 편리해요.",
    writer: "이수*",
    createdAt: "2025-09-23",
    image: "/sample1.jpg",
  },
  {
    id: 2,
    productName: "SAYREN 오브제컬렉션 정수기",
    category: "정수기",
    rating: 5,
    content: "정말 맘에 들어요.",
    writer: "김은*",
    createdAt: "2025-09-23",
    image: "/sample2.jpg",
  },
  {
    id: 3,
    productName: "SAYREN 퓨리케어 냉장고",
    category: "냉장고",
    rating: 4,
    content: "깔끔한 디자인 마음에 듦.",
    writer: "하영*",
    createdAt: "2025-09-23",
    image: "/sample3.jpg",
  },
];

const categories = [
  "전체",
  "TV",
  "냉장고",
  "정수기",
  "청소기",
  "세탁기",
  "건조기",
  "PC",
  "에어컨",
];

export default function ReviewListPage() {
  const [filter, setFilter] = useState("전체");

  const filteredReviews =
    filter === "전체"
      ? dummyReviews
      : dummyReviews.filter((r) => r.category === filter);

  return (
    <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">후기 게시판</h2>

      {/* 카테고리 + 작성 버튼 한 줄 정렬 */}
      <div className="flex items-center justify-between mb-6">
        {/* 카테고리 탭 */}
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Button
              key={c}
              type="button"
              variant={filter === c ? "primary" : "outline"}
              onClick={() => setFilter(c)}
              className="!w-auto px-4 py-2 rounded text-sm"
            >
              {c}
            </Button>
          ))}
        </div>

        {/* 글작성 버튼 */}
        <Link href="/board/review/new">
          <Button type="button" variant="primary" className="px-4 py-2 w-auto">
            리뷰 작성하기
          </Button>
        </Link>
      </div>

      {/* 후기 개수 */}
      <p className="text-sm text-gray-600 mb-6">
        총 <span className="font-semibold text-[#ff0066]">{filteredReviews.length}</span> 개의 후기가 등록되어 있습니다.
      </p>


      {/* 리뷰 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredReviews.map((r) => (
          <Link
            key={r.id}
            href={`/board/review/${r.id}`}
            className="border rounded p-4 shadow-sm bg-white hover:shadow-md transition cursor-pointer block"
          >
            <img
              src={r.image}
              alt={r.productName}
              className="w-full h-48 object-cover mb-3 rounded"
            />
            <div className="text-red-500 text-sm mb-1">
              {"★".repeat(r.rating)}
            </div>
            <h3 className="font-bold mb-1">{r.productName}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{r.content}</p>
            <div className="flex justify-between mt-3 text-xs text-gray-500">
              <span>{r.writer}</span>
              <span>{r.createdAt}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
