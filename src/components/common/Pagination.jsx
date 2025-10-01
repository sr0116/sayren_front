"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";

export default function Pagination({ data }) {
  const { page, totalPages, hasPrev, hasNext } = data;
  const searchParams = useSearchParams();

  const createPageLink = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage);
    return `?${params.toString()}`;
  };

  const groupSize = 5;
  const currentGroup = Math.floor((page - 1) / groupSize);
  const start = currentGroup * groupSize + 1;
  const end = Math.min(start + groupSize - 1, totalPages);
  const pageList = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
      <div className="flex items-center justify-center gap-1 mt-6">
        {/* 처음으로 */}
        <Link
            href={createPageLink(1)}
            className={`w-8 h-8 border rounded flex items-center justify-center ${
                page === 1
                    ? "text-gray-300 pointer-events-none"
                    : "text-gray-600 hover:bg-gray-100"
            }`}
        >
          <ChevronsLeft size={14} />
        </Link>

        {/* 이전 */}
        <Link
            href={createPageLink(page - 1)}
            className={`w-8 h-8 border rounded flex items-center justify-center ${
                !hasPrev
                    ? "text-gray-300 pointer-events-none"
                    : "text-gray-600 hover:bg-gray-100"
            }`}
        >
          <ChevronLeft size={14} />
        </Link>


        <div className="flex gap-2 mx-2">
          {/* 페이지 번호 */}
          {pageList.map((num) => (
              <Link
                  key={num}
                  href={createPageLink(num)}
                  className={`w-8 h-8 flex items-center justify-center rounded text-sm ${
                      num === page
                          ? "bg-black text-white font-bold"
                          : "text-gray-400 font-medium hover:text-black"
                  }`}
              >
                {num}
              </Link>
          ))}
        </div>
        {/* 다음 */}
        <Link
            href={createPageLink(page + 1)}
            className={`w-8 h-8 border rounded flex items-center justify-center ${
                !hasNext
                    ? "text-gray-300 pointer-events-none"
                    : "text-gray-600 hover:bg-gray-100"
            }`}
        >
          <ChevronRight size={14} />
        </Link>

        {/* 마지막으로 */}
        <Link
            href={createPageLink(totalPages)}
            className={`w-8 h-8 border rounded flex items-center justify-center ${
                page === totalPages
                    ? "text-gray-300 pointer-events-none"
                    : "text-gray-600 hover:bg-gray-100"
            }`}
        >
          <ChevronsRight size={14} />
        </Link>
      </div>
  );
}
