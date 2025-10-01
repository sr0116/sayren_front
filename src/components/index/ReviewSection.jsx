"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ReviewSection() {
  const reviews = [
    {
      user: "Emma123",
      text: "공기청정기를 구독했는데 설치도 간편하고, 관리까지 해주니까 너무 편리했어요. 요즘 집안 공기도 훨씬 쾌적해졌습니다.",
    },
    {
      user: "Liam525",
      text: "정수기를 신청했는데 하루 만에 설치 완료! 기사님도 친절하시고, 물 맛도 좋아서 만족합니다.",
    },
    {
      user: "Sophiaaaa",
      text: "가전제품을 렌탈로 이용하니 초기 비용 부담이 줄어서 좋아요. 특히 월 구독은 생활비 관리에 큰 도움이 됩니다.",
    },
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((r, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6
                         flex flex-col justify-between hover:shadow-md transition"
                >
                  {/* 큰 따옴표 강조 */}
                  <span className="text-5xl text-gray-200 leading-none mb-4">“</span>

                  <p className="text-gray-700 flex-grow">{r.text}</p>


                </motion.div>
            ))}
          </div>

          {/* Link to more reviews */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mt-12"
          >
            <Link
                href="/board/review"
                className="inline-block px-6 py-3 rounded-lg bg-gray-900 text-white
                       font-medium hover:bg-gray-800 transition"
            >
              더 많은 후기 보기
            </Link>
          </motion.div>
        </div>
      </section>
  );
}
