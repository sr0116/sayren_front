"use client";

import { useEffect, useState } from "react";
import { getLikedProducts } from "@/api/likeApi";
import ProductCardPurchase from "@/components/product/ProductCardPurchase";

export default function ProductMyLikeList() {
    const [likedProducts, setLikedProducts] = useState([]);

    useEffect(() => {
        getLikedProducts()
            .then(setLikedProducts)
            .catch(() => alert("로그인이 필요합니다."));
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-8">
            <h2 className="text-2xl font-bold mb-6">내 찜한 상품</h2>

            {!likedProducts || likedProducts.length === 0 ? (
                <p className="text-gray-500">아직 찜한 상품이 없습니다 ❤️</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {likedProducts.map((p) => (
                        <ProductCardPurchase key={p.productId} product={p} />
                    ))}
                </div>
            )}
        </div>
    );
}
