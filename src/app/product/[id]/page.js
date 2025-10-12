"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import AddToCartButton from "@/components/order/AddToCartButton";
import { useRouter } from "next/navigation";
import ProductDetailDescription from "@/components/product/ProductDetailDescription";

export default function ProductDetailPage({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);


  // 클라이언트에서 fetch
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/${params.id}`,
        { cache: "no-store" }
      );
      if (res.ok) {
        const data = await res.json();
        data.cleanDescription = data.description;
        setProduct(data);
      }
    };
    fetchProduct();
  }, [params.id]);

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <p className="text-gray-500">상품 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* 상품 이미지 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12">
        <div className="w-full">
          {product.thumbnailUrl ? (
            <img
              src={product.thumbnailUrl}
              alt={product.productName}
              width={600}
              height={600}
              className="rounded-lg shadow-md object-cover w-full"
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded">
              No Image
            </div>
          )}
        </div>

        {/* 상품 상세 */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold">{product.productName}</h1>
          <p className="text-sm text-gray-500">
            카테고리: {product.productCategory} | 모델명: {product.modelName}
          </p>
          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-800">
              총 금액:{" "}
              <span className="text-[#ff0066]">
                {product.price?.toLocaleString()}원
              </span>
            </p>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 mt-2">
            <AddToCartButton productId={params.id} planId={1} />
            <Button
              className="bg-[#ff0066] text-white px-6 py-2 rounded"
              onClick={() =>
                router.push(`/order/checkout/${params.id}?planId=1`)
              }
            >
              바로 구매
            </Button>
          </div>
        </div>
      </div>

      {/* 상세 설명 */}
      <ProductDetailDescription html={product.cleanDescription} />
    </div>
  );
}
