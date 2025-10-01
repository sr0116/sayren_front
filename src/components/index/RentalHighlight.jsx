"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const productData = {
  정수기: [
    { id: 1, rank: 1, name: "SAYREN 정수기 A", model: "WD523VC", price: "20,400", salePrice: "0", img: "/image/image4.png" },
    { id: 2, rank: 2, name: "SAYREN 정수기 B", model: "WD520AWB", price: "14,400", salePrice: "0", img: "/image/image4.png" },
    { id: 3, rank: 3, name: "SAYREN 정수기 B", model: "WD520AWB", price: "14,400", salePrice: "0", img: "/image/image4.png" },
  ],
  TV: [
    { id: 3, rank: 1, name: "SAYREN 올레드 TV", model: "OLED55C2", price: "79,000", salePrice: "59,000", img: "/image/image2.svg" },
  ],
  에어컨: [
    { id: 4, rank: 1, name: "SAYREN 에어컨 A", model: "AC9999", price: "55,000", salePrice: "45,000", img: "/image/image2.svg" },
  ],
  냉장고: [
    { id: 5, rank: 1, name: "SAYREN 냉장고 A", model: "REF1234", price: "65,000", salePrice: "55,000", img: "/image/image2.svg" },
  ],
  워시타워: [
    { id: 6, rank: 1, name: "SAYREN 워시타워 A", model: "WT9999", price: "59,900", salePrice: "49,900", img: "/image/image2.svg" },
  ],
  공기청정기: [
    { id: 7, rank: 1, name: "SAYREN 공기청정기 A", model: "AC1234", price: "19,900", salePrice: "15,900", img: "/image/image2.svg" },
  ],
  의류건조기: [
    { id: 8, rank: 1, name: "SAYREN 건조기 A", model: "DR5678", price: "39,900", salePrice: "29,900", img: "/image/image2.svg" },
  ],
  식기세척기: [
    { id: 9, rank: 1, name: "SAYREN 식기세척기 A", model: "DW2024", price: "35,000", salePrice: "29,000", img: "/image/image2.svg" },
  ],
  세탁기: [
    { id: 10, rank: 1, name: "SAYREN 세탁기 A", model: "WM1234", price: "49,000", salePrice: "39,000", img: "/image/image2.svg" },
  ],
  스타일러: [
    { id: 11, rank: 1, name: "SAYREN 스타일러 A", model: "ST5678", price: "29,900", salePrice: "24,900", img: "/image/image2.svg" },
  ],
};

export default function RentalHighlight() {
  const [selected, setSelected] = useState("정수기");

  return (
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold mb-2">구독 인기상품</h2>
        <p className="text-sm text-gray-500 mb-6">SAYREN만의 구독 인기 상품</p>

        {/* 카테고리 탭 */}
        <div className="flex flex-wrap gap-3 mb-8">
          {Object.keys(productData).map((cat) => (
              <button
                  key={cat}
                  onClick={() => setSelected(cat)}
                  className={`px-4 py-2 rounded-full border text-sm ${
                      selected === cat
                          ? "bg-black text-white"
                          : "bg-white text-gray-700 border-gray-300"
                  }`}
              >
                {cat}
              </button>
          ))}
        </div>

        {/* 좌측 배너 + 우측 상품 카드 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 좌측 배너 */}
          <div className="lg:col-span-1 bg-gray-50 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold">{selected} &gt;</h3>
              <p className="text-sm text-gray-600 mt-2">
                월 요금 반값 할인과<br />멤버십 최대 5만원까지!
              </p>
            </div>
          </div>

          {/* 상품 카드 */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productData[selected]?.map((p) => (
                <motion.div
                    key={p.id}
                    whileHover={{ scale: 1.002 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-md
                         overflow-hidden cursor-pointer"
                >
                  {/* 이미지 */}
                  <div className="relative w-full h-56">
                    <img
                        src={p.img}
                        alt={p.name}
                        className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 내용 */}
                  <div className="p-4">
                    <p className="text-xs text-red-500 mb-1">대량할인</p>
                    <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-gray-800">
                      {p.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{p.model}</p>

                    <p className="mt-2 text-lg font-semibold text-gray-900">
                      월 {p.price}원
                    </p>
                    <p className="text-sm text-red-500">
                      최대혜택가 월 {p.salePrice}원
                    </p>
                  </div>
                </motion.div>
            ))}
          </div>
        </div>
      </section>
  );
}
