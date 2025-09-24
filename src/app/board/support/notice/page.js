"use client";
import Link from "next/link";
import {useEffect, useState} from "react";
import {noticeData} from "@/api/noticeApi";

export default function NoticePage() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    noticeData().then(setNotices);
  }, []);

  return (
    <div>
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
    </div>
  );
}
