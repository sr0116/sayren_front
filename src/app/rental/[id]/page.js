"use client";

import { useState, useEffect } from "react";
import ProductDetail from "@/components/product/ProductDetail";
import { api } from "@/lib/axios";

export default function RentalDetailPage({ params }) {
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
          console.error("렌탈 상세 로드 실패:", err);
          setLoading(false);
        });
  }, [params.id]);

  if (loading) return <div>불러오는 중...</div>;
  if (!product) return <div>상품 정보를 불러올 수 없습니다.</div>;

  return <ProductDetail product={product} type="rental" />;
}
