"use client";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function NoticeDetailPage() {
  const { id } = useParams();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">공지사항 상세</h2>
      <div className="border-b pb-2 mb-4">
        <h3 className="text-lg font-medium">공지사항 제목 </h3>
        <p className="text-sm text-gray-500">2025-09-15 · 조회수 196</p>
      </div>
      <p className="text-gray-700 leading-relaxed">
        10월 서버 정기 점검으로 인한 임시 중단 <br />
        10월 서버 정기 점검으로 사이트가 임시 중단됩니다. 3:00 AM ~ 5:00 AM 으로 이용이 제한됩니다.
      </p>

      {/* 목록으로 */}
      <Link href="/board/support/notice" className="text-[#ff0066] hover:underline mt-4 block">
        목록으로 돌아가기
      </Link>
    </div>
  );
}
