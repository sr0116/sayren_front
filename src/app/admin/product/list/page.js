// /app/admin/product/page.js
import AdminProductList from "@/components/product/AdminProductList";
import AdminProductState from "@/components/product/AdminProductState";

export default async function ProductListPage({ searchParams }) {
  // 상품 목록만 서버사이드로 미리 불러오기
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product`);
  if (!res.ok) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-semibold mb-2">서버 에러</h1>
        <p>상품 데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  const products = await res.json();

  // 카테고리는 더 이상 서버에서 안 불러옴 (클라이언트 useEffect에서 처리)
  const categories = [];

  return (
    <div>
      <AdminProductState />
      <AdminProductList
        products={products}
        categories={categories} // 빈 배열로 전달해도 OK
        searchParams={searchParams}
      />
    </div>
  );
}
