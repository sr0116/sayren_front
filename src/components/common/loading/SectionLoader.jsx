"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";

export default function SectionLoader({ children }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
      <div className="relative w-full h-full">
        {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10 rounded-lg">
              {/* translate 보정 필요시 여기 추가 */}
              <div className="flex items-center justify-center">
                <LoadingSpinner size="lg" blockUI={false} />
              </div>
            </div>
        )}

        {/* 섹션 내부 컨텐츠 */}
        <div className="p-6">{children}</div>
      </div>
  );
}
