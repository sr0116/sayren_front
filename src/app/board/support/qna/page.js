"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "@/components/common/Button";
import Pagination from "@/components/common/Pagination";
import {qnaData} from "@/api/qnaApi";


export default function QnaListPage() {
    const [qnas, setQnas] = useState([]);
  const [filter, setFilter] = useState("전체");

    // 페이징 상태
    const [page, setPage] = useState(1);
    const [size] = useState(10);
    const [pageList, setPageList] = useState([]);
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false)

    useEffect(() => {
        qnaData(page, size).then((data) => {
            setQnas(data.list);
            setPage(data.page);
            setPageList(data.pageList);
            setPrev(data.prev);
            setNext(data.next);
        });
    }, [page, size]);


  const filtered = filter === "전체"
    ? qnas
    : qnas.filter((q) => q.type === filter);

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
