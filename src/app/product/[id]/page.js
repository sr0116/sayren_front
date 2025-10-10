"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import AddToCartButton from "@/components/order/AddToCartButton";
import { useRouter } from "next/navigation";

export default function ProductDetailPage({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);


  // 클라이언트에서 fetch
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${params.id}`,
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
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-3xl font-bold mb-35 text-gray-900 tracking-tigh">상품 상세정보</h2>

        <div
            className="
              space-y-20
              [&_p]:text-center [&_p]:text-gray-900 [&_p]:font-semibold
              [&_p]:text-[21px] [&_p]:leading-[1.8] [&_p]:tracking-tight
              [&_p]:max-w-4xl [&_p]:mx-auto [&_p]:my-10
              [&_img]:rounded-2xl [&_img]:my-14 [&_img]:mx-auto [&_img]:shadow-sm
              [&_img]:w-full [&_img]:max-w-[900px]
            "
        >
          {(() => {
            // <p>태그랑 <img>태그 따로 뽑기
            const paragraphs =
                product.cleanDescription?.match(/<p>.*?<\/p>/gs) || [];
            const images =
                product.cleanDescription?.match(/<img.*?>/gs) || [];

            // 글과 이미지를 번갈아 섞기
            const merged = [];
            const max = Math.max(paragraphs.length, images.length);
            for (let i = 0; i < max; i++) {
              if (paragraphs[i]) merged.push(paragraphs[i]);
              if (images[i]) merged.push(images[i]);
            }

            // 섞은 결과 렌더링
            return merged.map((html, idx) => (
                <div key={idx} dangerouslySetInnerHTML={{ __html: html }} />
            ));
          })()}
        </div>
      </div>
    </div>
  );
}
