"use client";

import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "@/store/modalSlice";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function GlobalModal() {
  const dispatch = useDispatch();
  const { isOpen, content } = useSelector((state) => state.modal);

  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setTimeout(() => setAnimate(true), 10);
      document.body.style.overflow = "hidden";
    } else {
      setAnimate(false);
      document.body.style.overflow = "";
      const timer = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // ESC 닫기 (추가)

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  });

  if (!visible) return null;

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => dispatch(closeModal()), 200);
  };

  return (
      // 배경 오버레이
      <div
          onClick={handleClose}
          className={`fixed inset-0 z-50 flex items-center justify-center 
        bg-black/50 transition-opacity duration-200
        ${animate ? "opacity-100" : "opacity-0"}`}
      >
        {/*// 모달 컨텐츠 박스*/}
        <div
            role="dialog"            // 접근성: 스크린리더에게 대화상자임을 알림
            aria-modal="true"        // 접근성: 배경은 비활성화 상태임을 알림
            onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록
            className={`relative bg-white rounded-lg shadow-lg p-6 w-[600px] max-w-[90%]
          transform transition-all duration-200
          ${animate ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        >
          {/*닫기 버튼*/}
          <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <X size={20} />
          </button>
          {/*실제 콘텐츠 삽입 영역*/}
          <div>{content}</div>
        </div>
      </div>
  );
}
