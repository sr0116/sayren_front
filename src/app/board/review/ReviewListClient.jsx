"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/common/Button";
import Pagination from "@/components/common/Pagination";
import { useApiQuery } from "@/hooks/useApi";

const categories = [
  "전체",
  "정수기",
  "청소기",
  "의류건조기",
  "에어컨",
  "세탁기",
  "냉장고",
  "TV",
  "노트북",
];

export default function ReviewListClient() {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState("전체");
  const [total, setTotal] = useState(0);

  const { data, isLoading, isError } = useApiQuery(
      ["reviews"],
      "/api/user/review",
      {
        params: { page: 1, size: 10, categoryId: 2 },
        options: { staleTime: 1000 * 60 },
      }
  );

  useEffect(() => {
    if (!data) return;

    setReviews(Array.isArray(data) ? data : data.list || []);
    setTotal(data.length || 0);
  }, [data]);

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>데이터 불러오기 실패</div>;

  const filtered =
      filter === "전체"
          ? reviews
          : reviews.filter((r) => r.productName.includes(filter));

  return (
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">후기 게시판</h2>

        {/* 카테고리 필터 */}
        <div className="flex items-center justify-between mb-6">
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

          <Link href="/board/review/new">
            <Button type="button" className="px-4 py-2 w-auto">
              리뷰 작성하기
            </Button>
          </Link>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          총{" "}
          <span className="font-semibold text-pink-600">{total}</span> 개의 후기가
          등록되어 있습니다.
        </p>

        {/* 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((r) => (
              <Link
                  key={r.boardId}
                  href={`/board/review/${r.boardId}`}
                  className="border rounded p-4 bg-white shadow-sm hover:shadow-md transition block"
              >
                <h3 className="font-bold mb-1">{r.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {r.content.replace(/<[^>]*>/g, "")}
                </p>

                <div className="flex justify-between mt-3 text-xs text-gray-500">
                  <span>익명</span>
                  <span>{new Date(r.regDate).toLocaleDateString()}</span>
                </div>
              </Link>
          ))}
        </div>
      </div>
  );
}
