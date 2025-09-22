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

  if (!visible) return null;

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => dispatch(closeModal()), 200);
  };

  return (
      <div
          className={`fixed inset-0 z-50 flex items-center justify-center 
        bg-black/50 transition-opacity duration-200
        ${animate ? "opacity-100" : "opacity-0"}`}
      >
        <div
            className={`relative bg-white rounded-lg shadow-lg p-6 w-[600px] max-w-[90%]
          transform transition-all duration-200
          ${animate ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        >
          <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <X size={20} />
          </button>

          <div>{content}</div>
        </div>
      </div>
  );
}
