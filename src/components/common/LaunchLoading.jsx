"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Refrigerator,
  Tv,
  AirVent,
  Monitor,
} from "lucide-react";

export default function LaunchLoading({
                                        title = "세상 이쁜 렌탈, 세이렌",
                                      }) {
  const icons = [
    <Refrigerator key="fridge" className="w-12 h-12 text-gray-700" />,
    <Tv key="tv" className="w-12 h-12 text-gray-700" />,
    <AirVent key="air" className="w-12 h-12 text-gray-700" />,
    <Monitor key="monitor" className="w-12 h-12 text-gray-700" />,
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % icons.length);
    }, 1000); // 1초 간격
    return () => clearInterval(interval);
  }, [icons.length]);

  return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        {/* 아이콘 전환 */}
        <div className="rounded-full bg-gray-100 p-6 shadow-md flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
            >
              {icons[index]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 브랜드 메시지 */}
        <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-4 text-sm text-gray-700 font-medium text-center"
        >
          {title}
          <span className="animate-pulse">...</span>
        </motion.p>

        {/* 로딩 중... */}
        <motion.span
            className="mt-2 text-xs text-gray-500 font-medium"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
        >
          로딩 중...
        </motion.span>
      </div>
  );
}
