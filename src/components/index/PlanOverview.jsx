"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PlanOverview() {
  const plans = [
    { name: "일반 구매", desc: "바로 구매하러 가기", href: "/products" },
    { name: "렌탈 구독", desc: "매월 정기 결제, 구독 상품 보러가기", href: "#" },
  ];

  return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">플랜 안내</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {plans.map((plan, i) => (
                <Link key={i} href={plan.href}>
                  <motion.div
                      whileHover={{ scale: 1.01 }} // 아주 살짝 확대만 (거의 안 느껴질 정도)
                      transition={{ duration: 0.15, ease: "easeOut" }} // 짧고 부드럽게
                      className="rounded-xl bg-white shadow-sm hover:shadow-md
                           border border-gray-100 transition-all p-8 cursor-pointer"
                  >
                    <h3 className="text-xl font-semibold text-gray-800">
                      {plan.name}
                    </h3>
                    <p className="mt-2 text-gray-500">{plan.desc}</p>
                  </motion.div>
                </Link>
            ))}
          </div>
        </div>
      </section>
  );
}
