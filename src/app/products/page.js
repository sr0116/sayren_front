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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.productId}`} // 상세 페이지 이동
            className="border border-gray-300 rounded p-3 text-center shadow hover:shadow-lg transition block"
          >
            {/* 이미지 */}
            {p.thumbnailUrl ? (
              <img
                src={p.thumbnailUrl}
                alt={p.productName}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-64 object-cover rounded"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                No Image
              </div>
            )}

            {/* 이름 */}
            <h3 className="mt-2 text-sm font-bold">{p.productName}</h3>

            {/* 태그 */}
            {p.tags && p.tags.length > 0 ? (
              <p className="text-gray-400 text-xs mt-1 truncate">
                {p.tags.join(" | ")}
              </p>
            ) : (
              <p className="text-gray-300 text-xs mt-1 italic"></p>
            )}

            {/* 가격 */}
            <p className="text-[#ff0066] font-bold mt-2">
              {p.price?.toLocaleString()}원
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
