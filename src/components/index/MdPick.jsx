"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function MdPick({ products }) {
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">상품이 없습니다.</p>;
  }

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
            <motion.div
                key={p.id}
                whileHover={{ scale: 1.002 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-md overflow-hidden cursor-pointer"
            >
              <div className="relative w-full h-56">
                <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    className="object-cover"
                />
                {p.label && (
                    <span className="absolute top-2 left-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-md">
                {p.label}
              </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-base line-clamp-1 group-hover:text-gray-900 transition-colors duration-200">
                  {p.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-1 group-hover:text-gray-700 transition-colors duration-200">
                  {p.model}
                </p>
                <p className="mt-2 font-bold text-gray-800 group-hover:text-black transition-colors duration-200">
                  최대혜택가 {p.price}원
                </p>
              </div>
            </motion.div>
        ))}
      </div>
  );
}
