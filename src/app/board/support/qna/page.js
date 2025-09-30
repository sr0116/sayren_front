"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "@/components/common/Button";
import Pagination from "@/components/common/Pagination";
import {qnaData} from "@/api/qnaApi";
import {useApiQuery} from "@/hooks/useApi";


export default function QnaListPage() {
    const [qnas, setQnas] = useState([]);
  const [filter, setFilter] = useState("전체");

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
    setTotal(data.total);
  }, [data])

  if(isLoading) return (<div>로딩중...</div>)
  if(isError) return (<div>데이터 불러오기 실패</div>)

  const categories = ["전체", "일반문의", "AS문의"];

  const filtered = filter === "전체"
    ? qnas
    : qnas.filter((q) => q.type === filter);

  return (
    <div className="flex-grow border border-gray-200 rounded-lg p-6 bg-white shadow-sm relative">
      <h2 className="text-2xl font-bold mb-6">문의하기</h2>

      {/* 카테고리 */}
      <div className="flex gap-4 mb-6 pb-2 ">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => {
              setFilter(c);
              setOpenId(null);
            }}
            className={`pb-1 border-b-2 ${
              filter === c
                ? "border-[#ff0066] text-[#ff0066] font-bold"
                : "border-transparent text-gray-500"
            } cursor-pointer`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 목록 */}
      <ul className="divide-y border-t border-b">
        {filtered.map((q) => {
              const isSecret = q.secret;          // secret 여부
              const isOwnerOrAdmin = false;       // 로그인 사용자 정보로 체크 (더미 상태)

          return (

          <li key={q.id} className="p-3 flex justify-between items-center">
            {isSecret && !isOwnerOrAdmin ? (
          // 비밀글 (클릭 불가)
          <div className="flex items-center gap-2 text-gray-400 cursor-not-allowed">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded 
                      ${q.type === "AS"
                      ? "bg-gray-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"}`}
                  >
                    {q.type}
                  </span>
            <span>🔒 비밀글</span>
          </div>
          ) : (
          // 공개글 (클릭 가능)
          <Link
            href={`/board/support/qna/${q.id}`}
            className="hover:underline flex items-center gap-2"
          >
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
        )}

            {/* 작성일 */}
            <span className="text-sm text-gray-500">{q.createdAt}</span>
          </li>
         );
        })}
      </ul>


      {/* 작성 버튼 */}
      <div className="mt-4 text-right">
        <Link href="/board/support/qna/new">
          <Button variant="primary" className="w-auto px-6 py-2">
            문의 작성하기
          </Button>
        </Link>
      </div>

        {/* 공통 페이지네이션 */}
        <Pagination
            page={page}
            pageList={pageList}
            prev={prev}
            next={next}
            setPage={setPage}
        />
    </div>
  );
}
