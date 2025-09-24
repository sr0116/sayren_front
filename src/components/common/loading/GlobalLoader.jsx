"use client";

import { useEffect, useState } from "react";
import { useIsFetching } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";

export default function GlobalLoader() {
  const pathname = usePathname();
  const isFetching = useIsFetching(); // 진행 중인 API 요청 개수
  const [isRouteChanging, setIsRouteChanging] = useState(false);

  // 라우트 전환 감지
  useEffect(() => {
    setIsRouteChanging(true);
    const timer = setTimeout(() => setIsRouteChanging(false), 300); // 최소 표시 시간
    return () => clearTimeout(timer);
  }, [pathname]);

  // 전역 로딩 조건: 라우트 전환 OR API 요청
  const isLoading = isRouteChanging || isFetching > 0;

  if (!isLoading) return null;

  return (
      <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
        <div className="relative flex flex-col items-center gap-4 pointer-events-auto">
          <LoadingSpinner size="lg" />
          {/* 필요하다면 텍스트도 추가 가능 */}
          {/* <span className="text-gray-600 font-medium text-lg">Loading...</span> */}
        </div>
      </div>
  );
}
