"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";

export default function RouteLoading() {
  const pathname = usePathname();
  const [isRouteChanging, setIsRouteChanging] = useState(false);

  useEffect(() => {
    setIsRouteChanging(true);

    // UX 부드럽게 → 최소 500ms 정도 표시 후 종료
    const timer = setTimeout(() => setIsRouteChanging(false), 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isRouteChanging) return null;

  return (
      <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">

        {/* 스피너 + 텍스트 */}
        <div className="relative flex flex-col items-center gap-4 pointer-events-auto">
          <LoadingSpinner size="lg" />
          {/*<span className="text-gray-300 font-medium text-lg">Loading...</span>*/}
        </div>
      </div>
  );
}
