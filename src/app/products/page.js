// app/products/page.js
import Link from "next/link";
import ProductCardPurchase from "@/components/product/ProductCardPurchase";
import ProductCardRental from "@/components/product/ProductCardRental";
import CategorySection from "@/components/index/CategorySection";
import ProductListCategory from "@/components/product/ProductListCategory";

async function getProducts(type) {
  const url = type
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?type=${type.toUpperCase()}`
    : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`;

  const res = await fetch(url, {
    cache: "no-store",
    // cache: "force-cache" // 거의 안 바뀌면 캐싱
    // next: { revalidate: 60 } // 60초마다 데이터 새로고침 (ISR)
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

const categoryMap = {
    "청소기" : "가전",
    "공기청정기" : "가전",
    "세탁기" : "가전제품",
    "스타일러": "신발관리기",
};

export default async function ProductListPage({ searchParams }) {
  const category = searchParams?.category || null;
  const type = searchParams?.type || null;
  const products = await getProducts(type);

  // ✅ 카테고리 필터
  const filtered =
      category && category !== "전체"
          ? products.filter((p) => {
            const mapped = categoryMap[category] || category;
            return p.productCategory === mapped;
          })
          : products;


  return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* 카테고리 섹션은 항상 보이도록 */}
        <ProductListCategory selected={category} />

        {/* 상품 없어도 나오도록 */}
        {filtered.length === 0 ? (
            <p className="p-6">상품이 없습니다.</p>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {filtered.map((p) => (
                  <Link key={p.productId} href={`/products/${p.productId}`}>
                    {type === "RENTAL" ? (
                        <ProductCardRental product={p} />
                    ) : (
                        <ProductCardPurchase product={p} />
                    )}
                  </Link>
              ))}
            </div>
        )}
      </div>
  );
}