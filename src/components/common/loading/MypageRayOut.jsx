"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MyMenu from "@/components/member/MyMenu";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";

export default function MypageRayOut({ children }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  // 경로가 바뀔 때 로딩 시작 → 일정 시간 후 해제
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400); // 0.4초 정도 유지
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
      <div className="w-full flex flex-col md:flex-row gap-6 px-6">
        {/* 왼쪽 메뉴 영역 */}
        <aside className="w-full md:w-60 shrink-0">
          <h2 className="text-xl font-bold mb-6 text-gray-800">마이페이지</h2>
          <MyMenu />
        </aside>

        {/* 오른쪽 컨텐츠 영역 */}
        <section className="flex-grow border border-gray-200 rounded-lg p-6 bg-white shadow-sm relative">
          {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                <LoadingSpinner size="lg" blockUI={false} />
              </div>
          ) : (
              children
          )}
        </section>
      </div>
  );
}
