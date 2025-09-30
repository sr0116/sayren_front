"use client";

import Image from "next/image";

export default function ProductCard({ product }) {
  const {
    img = "/image/image4.png",
    badge = "스탠드형",
    tag = "최근 본 제품",
    name = "SAYREN QNED TV (벽걸이형)",
    size = "217cm",
    specs = "해상도 4K · 스피커 출력 20W · 인공지능 프로세서 알파5 AI",
    model = "86QNED70TEA",
    rating = 4.9,
    reviewCount = 963,
    discount = 30,
    originalPrice = "3,890,000",
    price = "2,720,000",
    benefit = "2,352,600",
  } = product || {};

  return (
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden cursor-pointer flex flex-col h-[400px]">
        {/* 이미지 */}
        <div className="relative w-full h-36 md:h-40 lg:h-44 shrink-0">
          <Image src={img} alt={name} fill className="object-cover" />
          {badge && (
              <span className="absolute top-2 left-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-md">
            {badge}
          </span>
          )}
        </div>

        {/* 본문 */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-2">{tag}</p>

            <h3 className="font-semibold text-base line-clamp-1">{name}</h3>
            <span className="ml-1 text-sm text-gray-600">{size}</span>

            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{specs}</p>

            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <span className="line-clamp-1">{model}</span>
              <span className="flex items-center text-red-500 font-medium">
              ★ {rating} ({reviewCount})
            </span>
            </div>
          </div>

          <div className="mt-3">
            <span className="text-red-600 font-bold mr-2">{discount}%</span>
            <span className="text-gray-400 line-through text-sm">
            {originalPrice}원
          </span>
            <p className="text-lg font-bold text-gray-800 line-clamp-1">
              {price}원
            </p>
            <p className="text-sm text-red-500 line-clamp-1">
              최대혜택가 {benefit}원
            </p>
          </div>
        </div>

        <div className="px-4 py-2 border-t text-sm text-gray-500 flex justify-end">
          <button className="hover:text-black">♡ 비교하기</button>
        </div>
      </div>
  );
}
