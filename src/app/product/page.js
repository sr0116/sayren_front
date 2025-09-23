"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import React from "react";

async function getProducts() {
  const { data } = await axios.get("/api/products");
  return data;
}


const dummyProducts = [
  { id: 1, category: "TV", name: "LG OLED TV", price: 2400000, image: "/tv.png" },
  { id: 2, category: "냉장고", name: "삼성 비스포크 냉장고", price: 1200000, image: "/fridge.png" },
  { id: 3, category: "정수기", name: "LG 퓨리케어 정수기", price: 500000, image: "/water.png" },
];

export default function ProductListPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  // 필수 . (캐싱된 데이터를 바로 불러오는역할)
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: Infinity,
  });


  const filtered = category
    ? dummyProducts.filter((p) => p.category === category)
    : dummyProducts;

  return (
    <div className="max-w-6xl mx-auto p-6">

      { (isLoading || isError) ? (<p>로딩중...</p>) : data.map((product) => (
        <div key={product?.id}>
          <div>{product?.name}</div>
          <div>{product?.price}</div>
          <div>{product?.productCategory}</div>
          <div dangerouslySetInnerHTML={{ __html: product?.description }} />
        </div>
      ))}
      {JSON.stringify(data, null, 2)}

      <h2 className="text-2xl font-bold mb-6">
        {category ? `${category} 상품` : "전체 상품"}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4   gap-6">
        {filtered.map((p) => (
          <div key={p.id} className="border rounded p-3 text-center">
            <Image src={p.image} alt={p.name} className="w-full h-64 object-cover rounded" />
            <h3 className="mt-2 text-sm">{p.name}</h3>
            <p className="text-[#ff0066] font-bold">
              {p.price.toLocaleString()}원
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
