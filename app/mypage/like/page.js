"use client";

import { useEffect, useState } from "react";
import { getLikedProducts } from "@/api/likeApi";
import ProductCardPurchase from "@/components/product/ProductCardPurchase";
import ProductMyLikeList from "@/components/product/ProductMyLikeList";

export default function productLikePage() {

    return (
        <div>
            <ProductMyLikeList />
        </div>
    )
}
