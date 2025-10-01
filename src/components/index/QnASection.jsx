"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function QnASection() {
  const qnas = [
    {
      q: "렌탈 계약은 최소 몇 개월인가요?",
      a: "기본 12개월 이상부터 가능합니다.",
    },
    {
      q: "중도 해지 시 위약금이 있나요?",
      a: "계약 조건에 따라 위약금이 발생할 수 있습니다.",
    },
    {
      q: "제품 사용 중 문제가 생기면 어떻게 하나요?",
      a: "고객센터 Support 게시판에서 24시간 문의 가능합니다.",
    },
  ];

  return (
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">자주 묻는 질문</h2>
            <p className="mt-3 text-gray-500">
              고객님들이 가장 많이 궁금해하시는 내용을 모았습니다.
            </p>
          </div>

          {/* QnA 카드 */}
          <div className="grid md:grid-cols-3 gap-6">
            {qnas.map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                    viewport={{ once: true }} // 스크롤 시 한 번만 실행
                    className="rounded-2xl border border-gray-100 bg-gray-50 p-6
                         hover:bg-gray-100 transition"
                >
                  <p className="font-semibold text-gray-800 mb-2">Q. {item.q}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">A. {item.a}</p>
                </motion.div>
            ))}
          </div>

          {/* Support 이동 버튼 */}
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center mt-12"
          >
            <Link
                href="/board/support"
                className="inline-block px-6 py-3 rounded-lg bg-gray-900 text-white
                       font-medium hover:bg-gray-800 transition"
            >
              더 많은 질문 보기
            </Link>
          </motion.div>
        </div>
      </section>
  );
}
