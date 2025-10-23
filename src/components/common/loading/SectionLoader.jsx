"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";


export default function SectionLoader({
                                        children,
                                        padded = true,
                                        duration = 400,
                                        lockUI = true,
                                        color = "gray-900",
                                      }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), duration);
    return () => clearTimeout(timer);
  }, [pathname, searchParams, duration]);

  return (
      <div className="relative w-full h-full">
        {/* 로딩 오버레이 */}
        <AnimatePresence>
          {isLoading && (
              <motion.div
                  key="sectionLoader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`absolute inset-0 flex items-center justify-center bg-white/70 z-10 rounded-lg ${
                      lockUI ? "pointer-events-auto" : "pointer-events-none"
                  }`}
              >
                <LoadingSpinner size="lg" color={color} blockUI={false} />
              </motion.div>
          )}
        </AnimatePresence>

        {/* 실제 컨텐츠 */}
        <div className={padded ? "p-6" : ""}>{children}</div>
      </div>
  );
}
