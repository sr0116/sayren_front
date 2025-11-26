"use client";

import { useEffect, useState } from "react";
import ProductList from "@/components/product/ProductList";
import { api } from "@/lib/axios";

export default function ProductListPage({ searchParams }) {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
        .get("/api/user/product")
        .then((res) => {
          setProducts(res);
          setLoading(false);
        })
        .catch((err) => {
          console.error("❌ 상품 목록 요청 실패:", err);
          setLoading(false);
        });
  }, []);

  if (loading) return <div>상품 불러오는 중...</div>;
  if (!products) return <div>상품 로드 실패</div>;

  return <ProductList products={products} searchParams={searchParams} />;
}
