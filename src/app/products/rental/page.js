import ProductCard from "@/components/product/ProductCard";

export default function LeaseProductList({ products }) {
  if (!products || products.length === 0) {
    return <p className="text-gray-500">구독 상품이 없습니다.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <div key={p.productId} className="relative">
          {/* 기존 카드 재사용 */}
          <ProductCard product={p} />

          {/* 추가 UI (원가, 혜택가 등) */}
          <div className="absolute bottom-4 left-4 right-4 px-2">
            {p.originalPrice && (
              <p className="text-gray-400 line-through text-sm">
                {p.originalPrice.toLocaleString()}원
              </p>
            )}
            {p.benefit && (
              <p className="text-sm text-[#ff0066]">
                최대혜택가 {p.benefit.toLocaleString()}원
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
