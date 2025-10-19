"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getReviews } from "@/api/reviewApi";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getReviews(1, 10);
        const data = res.data || res;

        console.log("[ReviewSection] API 응답", res);
        console.log("[ReviewSection] 응답 data", data);

        const reviewArray = Array.isArray(data) ? data : data.dtoList || [];
        console.log("[ReviewSection] 추출된 reviewArray", reviewArray);

        const picked = reviewArray.slice(0, 3);
        setReviews(picked);
      } catch (err) {
        console.error("리뷰 불러오기 실패:", err);
      }
    };

    fetchReviews();
  }, []);

  if (!reviews || reviews.length === 0) {
    return (
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900">고객 후기</h2>
            <p className="mt-3 text-gray-500 mb-6">
              실제 고객님들의 생생한 경험을 확인해보세요.
            </p>
            <p className="text-gray-500">아직 등록된 후기가 없습니다.</p>
          </div>
        </section>
    );
  }

  return (
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">고객 후기</h2>
            <p className="mt-3 text-gray-500">
              실제 고객님들의 생생한 경험을 확인해보세요.
            </p>
          </div>

          {/* Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[200px]">
            {reviews.map((r, i) => (
                <motion.div
                    key={r.boardId || i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between hover:shadow-md transition"
                >
                  <span className="text-5xl text-gray-200 leading-none mb-3">“</span>

            {/* 제목 */}
            <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-1">
              {r.title || "제목 없음"}
            </h3>

            {/* 본문 */}
            <p className="text-gray-700 flex-grow text-sm leading-relaxed">
              {(r.content
                  ? r.content.replace(/<[^>]*>/g, "").slice(0, 100)
                  : "내용 없음")}...
            </p>

            {/* 하단 정보 */}
            <div className="flex justify-between mt-5 text-xs text-gray-500">
              <span>
                {r.productName ? `SAYREN ${r.productName}` : "익명"}
              </span>
              <span>
                {r.regDate ? new Date(r.regDate).toLocaleDateString() : "날짜 없음"}
              </span>
            </div>
                </motion.div>
            ))}
          </div>


          {/* 더보기 버튼 */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mt-9"
          >
            <Link
                href="/board/review"
                className="inline-block px-6 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
            >
              더 많은 후기 보기
            </Link>
          </motion.div>
        </div>
      </section>
  );
}
