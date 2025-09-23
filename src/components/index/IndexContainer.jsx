"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/index/HeroSection";
import CategorySection from "@/components/index/CategorySection";
import ProductHighlight from "@/components/index/ProductHighlight";
import PlanOverview from "@/components/index/PlanOverview";
import ReviewSection from "@/components/index/ReviewSection";
import QnASection from "@/components/index/QnASection";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "@/store/productSlice";
import PaymentButton from "@/components/payments/PaymentButton";
import PaymentPage from "@/components/payments/PaymentPage";

export default function IndexContainer() {

  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.product);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [dispatch, status]);

  return (
      <>
        <HeroSection />
        <CategorySection />
        <PaymentPage />

        {/* 정수기 카테고리 */}
        {products["정수기"] && (
            <ProductHighlight
                title="MD's Pick"
                subtitle="놓치기 아쉬운 특별한 가격"
                products={products["정수기"]}
            />
        )}

        <PlanOverview />
        <ReviewSection />

        {/* TV 카테고리 */}
        {products["TV"] && (
            <ProductHighlight
                title="TV 추천"
                subtitle="이번 달 가장 인기 있는 상품"
                products={products["TV"]}
            />
        )}

        {/* 에어컨 카테고리 */}
        {products["에어컨"] && (
            <ProductHighlight
                title="에어컨 추천"
                subtitle="여름 필수 가전"
                products={products["냉장고"]}
            />
        )}

        <QnASection />
      </>
  );

}