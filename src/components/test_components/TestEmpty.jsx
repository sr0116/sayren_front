"use client"

import EmptyState from "@/components/common/EmptyState";
import {useRouter} from "next/navigation";

export default function TestEmpty (){
  const router = useRouter();
  return (
    <div>
      <EmptyState
          title="주문 내역이 비어있습니다"
          message="아직 주문한 상품이 없어요. 상품을 둘러보고 원하는 상품을 주문해보세요."
          actionLabel="상품 보러 가기"
          onAction={() => router.push("/products")}
      />
    </div>
  );
}