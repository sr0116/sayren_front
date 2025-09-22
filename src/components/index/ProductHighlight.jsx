"use client";

import MdPick from "./MdPick";

export default function ProductHighlight({ title, subtitle, products }) {
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">상품이 없습니다.</p>;
  }

  return (
      <section className="max-w-6xl mx-auto px-4 py-10">
        {/* 섹션 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
          </div>
          <button className="text-sm text-gray-500 hover:underline">
            더보기 &gt;
          </button>
        </div>

        {/* 리스트 */}
        <MdPick products={products} />
      </section>
  );
}
