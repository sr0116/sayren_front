"use client";
import Link from "next/link";
import {useEffect, useState} from "react";
import {noticeData} from "@/api/noticeApi";
import Pagination from "@/components/common/Pagination";

export default function NoticePage() {
  const [notices, setNotices] = useState([]);

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


  return (
    <div className="flex-grow border border-gray-200 rounded-lg p-6 bg-white shadow-sm relative">
      <h2 className="text-2xl font-bold mb-6">공지사항</h2>
      <table className="w-full border-t">
        <thead>
        <tr className="text-left text-gray-600 border-b">
          <th className="py-2 px-2 text-center">번호</th>
          <th className="py-2 px-2 w-1/3">제목</th>
          <th className="py-2 px-2 text-center">작성일</th>
          <th className="py-2 px-2 text-center">조회수</th>
        </tr>
        </thead>
        <tbody>
        {notices.map((n) => (
          <tr key={n.id} className="border-b hover:bg-gray-50">
            <td className="py-2 px-2 text-center">{n.id}</td>
            <td className="py-2 px-2">
              <Link href={`/board/support/notice/${n.id}`} className="text-[#111827] hover:underline">
                {n.title}
              </Link>
            </td>
            <td className="py-2 px-2 text-sm text-center">{n.date}</td>
            <td className="py-2 px-2 text-sm text-center">{n.views}</td>
          </tr>
        ))}
        </tbody>
      </table>

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
