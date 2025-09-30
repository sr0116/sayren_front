"use client";

import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">상품이 없습니다.</p>;
  }

  return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
            <ProductCard key={p.id} product={p} />
        ))}
      </div>
  );
}
