"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import AddToCartButton from "@/components/order/AddToCartButton";
import { useRouter } from "next/navigation";
import ProductDetailDescription from "@/components/product/ProductDetailDescription";
import ProductCardRental from "@/components/product/ProductCardRental";

export default function RentalDetailPage({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);

  // 클라이언트에서 fetch
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/product/${params.id}`,
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
        <ProductCardRental />

            {/* 버튼 */}
            <div className="flex gap-3 mt-2">
              <AddToCartButton productId={params.id} planId={1} />
              <Button
                  className="bg-[#ff0066] text-white px-6 py-2 rounded"
                  onClick={() =>
                      router.push(`/order/checkout/${params.id}?planId=1&type=RENTAL`)
                  }
              >
                렌탈 신청
              </Button>
            </div>
        {/* 상세 설명 */}
        <ProductDetailDescription html={product.cleanDescription} />
      </div>
  );
}
