"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Toast from "@/components/common/layout/Toast";


// 전역 토스트 컨테이너
export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  // 토스트 추가
  const addToast = useCallback((type, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);

    // 3초 뒤 자동 삭제
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  // 외부에서 호출할 수 있도록 window에 노출
  if (typeof window !== "undefined") {
    window.toast = addToast;
  }

  return (
      <div className="fixed top-5 right-5 flex flex-col gap-3 z-50">
        <AnimatePresence>
          {toasts.map((toast) => (
              <Toast
                  key={toast.id}
                  type={toast.type}
                  message={toast.message}
                  onClose={() =>
                      setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                  }
              />
          ))}
        </AnimatePresence>
      </div>
  );
}
