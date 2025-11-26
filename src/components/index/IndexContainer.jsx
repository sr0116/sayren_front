"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/index/HeroSection";
import CategorySection from "@/components/index/CategorySection";
import PlanOverview from "@/components/index/PlanOverview";
import ReviewSection from "@/components/index/ReviewSection";
import QnASection from "@/components/index/QnASection";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "@/store/productSlice";

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


        <PlanOverview />


        <ReviewSection />
        <QnASection />
      </>
  );

}