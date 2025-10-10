"use client";

import { useState, useEffect } from "react";
import Button from "@/components/common/Button";
import Link from "next/link";
import { getReviews } from "@/api/reviewApi";
import Pagination from "@/components/common/Pagination";
import {useApiQuery} from "@/hooks/useApi";

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
  const [reviews, setReviews] = useState([]);   // 리뷰 데이터 상태
  const [filter, setFilter] = useState("전체"); // 필터 상태
  const [total, setTotal] = useState(0); // 등록 글 수

  // 페이징 상태
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [pageList, setPageList] = useState([]);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false)


  const { data, isLoading, isError } = useApiQuery(
    ["reviews"],
    "/api/user/reviews/list",
    {
      params: { page: 1, size: 10 },
      options: { staleTime: 1000 * 60 }
    }
  );

  useEffect(() => {
    if(data == null) return;

    setReviews(data.list);        // 리뷰 배열
    setPage(data.page);
    setPageList(data.pageList);
    setPrev(data.prev);
    setNext(data.next);
    setTotal(data.totalPages);
  }, [data])

  if(isLoading) return (<div>로딩중...</div>)
  if(isError) return (<div>데이터 불러오기 실패</div>)

  // 필터링
  const filteredReviews =
    filter === "전체"
      ? reviews
      : reviews.filter((r) => r.productName.includes(filter));

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">후기 게시판</h2>
      {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
      {/*들어오는 값 확인*/}

      {/* 카테고리 + 작성 버튼 */}
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
        총{" "}
        <span className="font-semibold text-[#ff0066]">
         {total}
        </span>{" "}
        개의 후기가 등록되어 있습니다.
      </p>

      {/* 리뷰 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {(filteredReviews || []).map((r) => (
          <Link
            key={r.boardId}
            href={`/board/review/${r.boardId}`}
            className="border rounded p-4 shadow-sm bg-white hover:shadow-md transition cursor-pointer block"
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
