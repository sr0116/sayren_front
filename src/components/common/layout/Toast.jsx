"use client";

import {motion} from "framer-motion";
import {X} from "lucide-react";

export default function Toast({type = "info", message, onClose, duration = 3000}) {
  // toast
  // 상태별 색상
  const typeColors = {
    success: "bg-green-100 text-green-800 border-green-300",
    error: "bg-red-100 text-red-800 border-red-300",
    warning: "bg-orange-100 text-orange-800 border-orange-300",
    info: "bg-gray-100 text-gray-800 border-gray-300",
  };

  return (
      // 모션 애니메이션
      <motion.div
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -20}}
          transition={{duration: 0.25}}
          className={`flex items-center justify-between gap-3 px-4 py-3 rounded-md shadow-md border ${typeColors[type]}`}
      >
        <span className="text-sm font-medium">{message}</span>
        <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
        >
          <X size={16}/>
        </button>
      </motion.div>
  );

}
