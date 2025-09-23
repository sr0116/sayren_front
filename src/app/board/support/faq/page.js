"use client";
import { useState, useEffect } from "react";
import { faqData } from "@/api/faqApi";

export default function FaqPage() {
  const [faqs, setFaqs] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [filter, setFilter] = useState("전체");

  useEffect(() => {
    faqData().then(setFaqs);
  }, []);

  const categories = ["전체", "가입/계약", "결제", "배송/설치", "해지/반품", "기타"];
  const filteredFaqs =
    filter === "전체" ? faqs : faqs.filter((f) => f.category === filter);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>

      {/* 카테고리 */}
      <div className="flex gap-4 mb-6 border-b pb-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => {
              setFilter(c);
              setOpenId(null);
            }}
            className={`pb-1 border-b-2 ${
              filter === c
                ? "border-[#ff0066] text-[#ff0066] font-bold"
                : "border-transparent text-gray-500"
            } cursor-pointer`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* FAQ 리스트 */}
      <div className="divide-y">
        {filteredFaqs.map((f) => (
          <div key={f.id}>
            <button
              onClick={() => setOpenId(openId === f.id ? null : f.id)}
              className="w-full flex items-center justify-between py-4 text-left"
            >
            {/* 카테고리 라벨 */}
            <span className="flex items-center gap-2">
              <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-600">
                {f.category}
              </span>
              <span className="text-[#111827] font-medium cursor-pointer">{f.question}</span>
            </span>

              {/* 토글 아이콘 */}
              <span className="ml-2 text-xl">
          {openId === f.id ? (
            <span className="text-[#ff0066]">−</span>
          ) : (
            <span className="text-gray-400">+</span>
          )}
        </span>
            </button>

            {/* 답변 */}
            {openId === f.id && (
              <div className="border border-gray-400 rounded-md bg-white p-5 text-sm mb-3">
                <span className="text-[#ff0066]">{f.answer}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
