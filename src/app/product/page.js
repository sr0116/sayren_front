"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCardPurchase from "@/components/product/ProductCardPurchase";
import ProductListCategory from "@/components/product/ProductListCategory";
import axios from "axios";

export default function ProductListPage({ searchParams }) {
    const category = searchParams?.category || "전체";
    const [products, setProducts] = useState([]);
    const [keyword, setKeyword] = useState("");

    // ✅ 상품 불러오기 (큐레이션 필터 포함)
    const fetchProducts = async () => {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
            const params = new URLSearchParams();

            // 기본 조건
            params.append("type", "PURCHASE");
            if (category && category !== "전체") params.append("category", category);
            if (keyword) params.append("keyword", keyword);
            params.append("page", 0);
            params.append("size", 12);

            const url = `${baseUrl}/api/product/filter?${params.toString()}`;

            const res = await axios.get(url, { headers: { "Cache-Control": "no-store" } });
            setProducts(res.data.content || []);
        } catch (err) {
            console.error("상품 조회 실패:", err);
            setProducts([]);
        }
    };

    // ✅ 최초 로드 + 카테고리/검색어 변경 시 재요청
    useEffect(() => {
        fetchProducts();
    }, [category, keyword]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                {/* 카테고리 필터 */}
                <ProductListCategory selected={category} />

                {/* 검색 입력창 */}
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="border rounded-md px-3 py-2 w-60 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <button
                        onClick={fetchProducts}
                        className="bg-pink-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-pink-700"
                    >
                        검색
                    </button>
                </div>
            </div>

            {/* 상품 리스트 */}
            {products.length === 0 ? (
                <p className="p-6 text-gray-500 text-center">상품이 없습니다.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map((p) => (
                        <Link key={p.productId} href={`/product/${p.productId}`}>
                            <ProductCardPurchase product={p} />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
