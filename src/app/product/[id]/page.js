"use client";

import { useEffect, useState } from "react";
import ProductDetail from "@/components/product/ProductDetail";
import { api } from "@/lib/axios";

export default function ProductDetailPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
        .get(`/api/user/product/${params.id}`)
        .then((res) => {
          setProduct(res);
          setLoading(false);
        })
        .catch((err) => {
          console.error("❌ 상품 상세 요청 실패:", err);
          setLoading(false);
        });
  }, [params.id]);

  if (loading) return <div>불러오는 중...</div>;
  if (!product) return <div>상품 없음</div>;

  return <ProductDetail product={product} type="buy" />;
}
