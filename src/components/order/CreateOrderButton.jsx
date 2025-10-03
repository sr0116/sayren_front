"use client";

import Button from "@/components/common/Button";
import { useCreateOrderMutation } from "@/api/orderApi";
import { useRouter } from "next/navigation";

export default function CreateOrderButton({ addressId }) {
  const router = useRouter();

  const createOrderMutation = useCreateOrderMutation({
    onSuccess: (data) => {
      console.log("주문 생성 성공:", data);
      router.push(`/order/history/${data.orderId}`); //  상세 페이지로 이동
    },
    onError: (err) => {
      console.error("주문 생성 실패:", err);
      alert("주문 생성에 실패했습니다.");
    },
  });

  const handleClick = () => {
    createOrderMutation.mutate({ params: { addressId } });
  };

  return (
    <Button
      variant="primary"
      onClick={handleClick}
      disabled={createOrderMutation.isLoading}
    >
      {createOrderMutation.isLoading ? "처리 중..." : "바로 구매"}
    </Button>

  );
}
