"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Link from "next/link";


async function getProducts() {
  const { data } = await axios.get("/api/products");
  return data;
}

export default function ProductListPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: Infinity,
  });

  if (isLoading) return <p>로딩중...</p>;
  if (isError) return <p>에러 발생!</p>;
  if (!products || products.length === 0) return <p>상품이 없습니다.</p>;

  // 카테고리 필터
  const filtered = category
      ? products.filter((p) => p.productCategory === category)
      : products;

  return (
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">
          {category ? `${category} 상품` : "전체 상품"}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filtered.map((p) => (
              <Link
                  key={p.id}
                  href={`/product/${p.id}`}   // 상품 id별 상세 페이지로 이동
                  className="border border-gray-300 rounded p-3 text-center shadow hover:shadow-lg transition block"
              >
                {/* 이미지 */}
                {p.imageUrl ? (
                    <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-full h-64 object-cover rounded"
                    />
                ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                      No Image
                    </div>
                )}

                {/* 이름 */}
                <h3 className="mt-2 text-sm font-bold">{p.productName}</h3>

                {/* 태그 한 줄 표시 */}
                {p.tags && p.tags.length > 0 ? (
                  <p className="text-gray-400 text-xs mt-1 truncate">
                    {p.tags.join(" | ")}
                  </p>
                ) : (
                  <p className="text-gray-300 text-xs mt-1 italic"></p>
                )}

                {/* 가격 */}
                <p className="text-[#ff0066] font-bold mt-2">
                  {p.price?.toLocaleString()}원
                </p>
              </Link>
          ))}
        </div>
      </div>
  );
}
