"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function NewProductPage() {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get("/api/products");
                // 첫 번째 상품만 불러오기
                const first = data[0];
                if (first) {
                    // description에서 태그 제거
                    first.cleanDescription = first.description
                        ? first.description.replace(/<[^>]*>?/g, "").trim()
                        : "";
                    setProduct(first);
                }
            } catch (err) {
                console.error("상품 불러오기 실패:", err);
            }
        };

        fetchProduct();
    }, []);

    if (!product) return <p>로딩중...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* 상품명 */}
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

            {/* 가격 */}
            <p className="text-pink-600 font-semibold text-lg mb-4">
                {product.price?.toLocaleString()}원
            </p>

            {/* 메인 설명 (태그 제거된 텍스트) */}
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {product.cleanDescription}
            </p>

            {/* 카테고리 / 모델명 */}
            <p className="text-sm text-gray-500 mt-4">
                카테고리: {product.productCategory} | 모델명: {product.modelName}
            </p>
        </div>
    );
}
