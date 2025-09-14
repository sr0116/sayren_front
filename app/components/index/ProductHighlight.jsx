"use client";

import { useState } from "react";

// 카테고리별 상품 데이터 (예시)
const productData = {
  정수기: [
    {
      id: 1,
      rank: 1,
      name: "SAYREN 정수기 A",
      model: "WD523VC",
      price: "20,400",
      salePrice: "0",
      img: "https://placehold.co/300x500?text=정수기1",
    },
    {
      id: 2,
      rank: 2,
      name: "SAYREN 정수기 B",
      model: "WD520AWB",
      price: "14,400",
      salePrice: "0",
      img: "https://placehold.co/300x500?text=정수기2",
    },
    {
      id: 3,
      rank: 3,
      name: "SAYREN 정수기 c",
      model: "WD520AWB",
      price: "14,400",
      salePrice: "2,000",
      img: "https://placehold.co/300x500?text=정수기3",
    },
  ],
  공기청정기: [
    {
      id: 3,
      rank: 1,
      name: "SAYREN 공기청정기 A",
      model: "AC1234",
      price: "19,900",
      salePrice: "15,900",
      img: "https://placehold.co/300x500?text=공기청정기1",
    },
  ],
  청소기: [
    {
      id: 4,
      rank: 1,
      name: "SAYREN 청소기 A",
      model: "VC5678",
      price: "29,900",
      salePrice: "24,900",
      img: "https://placehold.co/300x500?text=청소기1",
    },
  ],
  워시타워: [
    {
      id: 5,
      rank: 1,
      name: "SAYREN 워시타워 A",
      model: "WT9999",
      price: "59,900",
      salePrice: "49,900",
      img: "https://placehold.co/300x500?text=워시타워1",
    },
  ],
  TV: [
    {
      id: 6,
      rank: 1,
      name: "SAYREN 올레드 TV",
      model: "OLED55C2",
      price: "79,000",
      salePrice: "59,000",
      img: "https://placehold.co/300x500?text=TV1",
    },
  ],
};

export default function ProductHighlight() {
  // 임시로 정수기 기본값 태그로 해두고 나중에 수정하기
  const [selected, setSelected] = useState("정수기");

  return (
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold mb-6">카테고리별 인기상품</h2>

        <div className="flex flex-wrap gap-3 mb-8">
          {Object.keys(productData).map((cat) => (
              <button
                  key={cat}
                  onClick={() => setSelected(cat)}
                  className={`px-4 py-2 rounded-full border text-sm transition ${
                      selected === cat
                          ? "bg-black text-white"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {cat}
              </button>
          ))}
        </div>

        {/* 상품 카드 */}
        <div className="flex flex-wrap gap-6">
          {productData[selected]?.map((p) => (
              <div
                  key={p.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02]
                     transition border border-gray-100 relative flex flex-col
                     w-full sm:w-[48%] lg:w-[32%] p-6"
              >
                <div className="absolute top-3 left-3 bg-black text-white text-xs rounded px-2 py-1">
                  {p.rank}
                </div>

                {/* 이미지 */}
                <div className="h-64 flex items-center justify-center">
                  <img
                      src={p.img}
                      alt={p.name}
                      className="h-full object-contain"
                  />
                </div>

                <div className="mt-4">
                  <h3 className="font-bold text-gray-900">{p.name}</h3>
                  <p className="text-sm text-gray-500">{p.model}</p>

                  <p className="mt-2 text-lg font-semibold text-gray-900">
                    월 {p.price}원
                  </p>
                  <p className="text-sm text-red-500">
                    최대혜택가 월 {p.salePrice}원
                  </p>
                </div>
              </div>
          ))}
        </div>
      </section>
  );
}
