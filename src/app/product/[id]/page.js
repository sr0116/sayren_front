"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                // 태그 제거된 description 준비
                data.cleanDescription = data.description?.replace(/<[^>]*>?/g, "").trim();
                setProduct(data);
            } catch (err) {
                console.error("상품 불러오기 실패:", err);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) return <p>로딩중...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">{product.productName}</h1>
            <p className="text-pink-600 font-semibold text-lg mb-4">
                {product.price?.toLocaleString()}원
            </p>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {product.cleanDescription}
            </p>
            <p className="text-sm text-gray-500 mt-4">
                카테고리: {product.productCategory} | 모델명: {product.modelName}
            </p>
        </div>
    );
}
