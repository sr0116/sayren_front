"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductDetailPage from "@/app/products/[id]/page"; // 팀원 원본
import AddToCartButton from "@/components/order/AddToCartButton";

export default function ProductDetailWithCart({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);

  // 상품 정보 API 호출 (상품과 동일 API)
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [params.id]);

  if (!product) return <p>불러오는 중...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/*  상품 원본 페이지 렌더링 */}
      <ProductDetailPage params={params} />


      <div className="flex gap-3 mt-6">
        <AddToCartButton product={product} />
        <button
          className="bg-[#ff0066] text-white px-6 py-2 rounded"
          onClick={() => router.push("/order/checkout")}
        >
          바로 구매
        </button>
      </div>
    </div>
  );
}
