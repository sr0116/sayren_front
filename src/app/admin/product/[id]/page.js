import ProductDetail from "@/components/product/ProductDetail";

export const revalidate = false;
export default async function ProductDetailPage({ params }) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/${params.id}`);


  if (!res.ok) {
    return (
      <div>
        <h1 className="text-center mb-16 font-semibold text-2xl">서버 에러가 발생했습니다.</h1>
        <p>상품을 가져올 수 없습니다.</p>
      </div>
    );
  }

  const product = await res.json();

  // 로딩 처리
  if (!product) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <p className="text-gray-500">상품 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <ProductDetail product={product} type="buy"/>
    </div>
  );
}
