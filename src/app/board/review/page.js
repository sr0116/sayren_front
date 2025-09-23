"use client";

import { useState } from "react";

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
  "패키지",
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
      <h2 className="text-2xl font-bold mb-6">리뷰 게시판</h2>

      {/* 카테고리 탭 */}
      <div className="grid grid-cols-4 md:grid-cols-7 gap-2 mb-6">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`border px-3 py-1 rounded text-sm ${
              filter === c
                ? "bg-[#ff0066] text-white font-semibold"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 리뷰 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredReviews.map((r) => (
          <div key={r.id} className="border rounded p-4 shadow-sm bg-white">
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
          </div>
        ))}
      </div>
    </div>
  );
}
