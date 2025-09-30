// app/products/page.js
import Link from "next/link";
import ProductList from "@/components/product/ProductList";
import ProductGrid from "@/components/product/ProductGrid";
import ProductCard from "@/components/product/ProductCard";

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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <Link key={p.productId} href={`/products/purchase/${p.productId}`}>
          <ProductCard product={p} />
        </Link>
      ))}
    </div>
  );
}
