"use client";

import { useState, useEffect } from "react";
import RentalList from "@/components/product/RentalList";
import { api } from "@/lib/axios";

export default function RentalListPage({ searchParams }) {
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
          console.error("렌탈 목록 로드 실패:", err);
          setLoading(false);
        });
  }, []);

  if (loading) return <div>불러오는 중...</div>;
  if (!products) return <div>서버 오류</div>;

  return <RentalList products={products} searchParams={searchParams} />;
}
