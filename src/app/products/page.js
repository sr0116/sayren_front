// app/products/page.js
import Link from "next/link";

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`, {
    cache: "no-store",
    // cache: "force-cache" // 거의 안 바뀌면 캐싱
    // next: { revalidate: 60 } // 60초마다 데이터 새로고침 (ISR)
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function ProductListPage({ searchParams }) {
  const category = searchParams?.category || null;
  const products = await getProducts();

  // 카테고리 필터
  const filtered = category
    ? products.filter((p) => p.productCategory === category)
    : products;

  if (!products || products.length === 0) {
    return <p className="p-6">상품이 없습니다.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        {category ? `${category} 상품` : "전체 상품"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.productId}`}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl overflow-hidden cursor-pointer transition-shadow block"
          >
            {/* 이미지 */}
            <div className="relative w-full h-64">
              {p.thumbnailUrl ? (
                <img
                  src={p.thumbnailUrl}
                  alt={p.productName}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                  No Image
                </div>
              )}
            </div>

            {/* 내용 */}
            <div className="p-4">
              <h3 className="font-semibold text-base">{p.productName}</h3>

              {p.tags && p.tags.length > 0 ? (
                <p className="text-gray-400 text-xs mt-1 truncate">
                  {p.tags.join(" | ")}
                </p>
              ) : (
                <p className="text-gray-300 text-xs mt-1 italic"></p>
              )}

              <p className="mt-2 font-bold text-[#ff0066]">
                {p.price?.toLocaleString()}원
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>

  );
}
