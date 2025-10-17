"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { noticeData } from "@/api/noticeApi";
import Pagination from "@/components/common/Pagination";

export default function NoticePage() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      const res = await noticeData(1, 10);
      setNotices(res.list);
    };
    fetchNotices();
  }, []);

  return (
    <div className="flex-grow border border-gray-200 rounded-lg p-6 bg-white shadow-sm relative">
      <h2 className="text-2xl font-bold mb-6">공지사항</h2>
      <table className="w-full border-t">
        <thead>
        <tr className="text-left text-gray-600 border-b">
          <th className="py-2 px-2 text-center w-[80px]">번호</th>
          <th className="py-2 px-2">제목</th>
          <th className="py-2 px-2 text-center w-[120px]">작성일</th>
          <th className="py-2 px-2 text-center w-[80px]">조회수</th>
        </tr>
        </thead>
        <tbody>
        {notices.map((n) => (
          <tr key={n.id} className="border-b hover:bg-gray-50">
            <td className="py-2 px-2 text-center">{n.id}</td>
            <td className="py-2 px-2">
              <Link
                href={`/board/support/notice/${n.id}`}
                className="text-[#111827] hover:underline"
              >
                {n.title}
              </Link>
            </td>
            <td className="py-2 px-2 text-sm text-center">{n.date}</td>
            <td className="py-2 px-2 text-sm text-center">{n.views}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
