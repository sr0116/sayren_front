"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyButton({ copyText, className = "", children }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("복사 실패:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border 
                  border-gray-300 bg-white text-gray-700 
                  hover:bg-gray-100 active:bg-gray-200 
                  transition ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-600" />
          <span>복사됨!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 text-gray-500" />
          <span>{children}</span>
        </>
      )}
    </button>
  );
}
