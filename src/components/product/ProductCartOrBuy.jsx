"use client";

import AddToCartButton from "@/components/order/AddToCartButton";
import Button from "@/components/common/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { calcRentalPrice } from "@/utils/CalcRentalPrice";

export default function ProductCartOrBuy({ productId, price, type }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { monthlyFee, deposit, totalPrice } = calcRentalPrice(price, selectedPlan?.month);
  const plans = [
    { planId: 2, month: 12 },
    { planId: 3, month: 24 },
    { planId: 4, month: 36 },
  ];
  const router = useRouter();

  if (type === "buy") {
    return (
      <div>
        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-800">
            총 금액:{" "}
            <span className="text-[#ff0066]">{price.toLocaleString()}원</span>
          </p>
        </div>

        <div className="flex gap-3 mt-2">
          <AddToCartButton productId={productId} planId={1} />
          <Button
            className="bg-[#ff0066] text-white px-6 py-2 rounded"

            onClick={() =>
              router.push(`/order/checkout/${productId}?planId=1&type=PURCHASE`)
            }
          >
            바로 구매
          </Button>
        </div>
      </div>
    );
  } else if (type === "rental") {
    return (
      <div>
        {/* 요금제 선택 영역 */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">요금제 선택</h3>
          <div className="flex gap-2 flex-wrap w-full">
            {plans.map((plan) => (
              <button
                key={plan.planId}
                onClick={() => setSelectedPlan(plan)}
                className={`flex-1 py-2 rounded-lg border transition-all ${
                  selectedPlan?.planId === plan.planId
                    ? "border-gray-900"
                    : "border-gray-300 cursor-pointer hover:bg-gray-100"
                }`}
              >
                렌탈 {plan.month}개월
              </button>
            ))}
          </div>
        </div>

        <div className="mb-2 flex gap-2 items-center">
          <p className="text-lg font-semibold text-gray-700">총 금액 :</p>
          <span className="font-semibold text-gray-700 text-lg">
            {totalPrice.toLocaleString()}원
          </span>
        </div>

        <div className="mb-6 flex gap-2 items-center justify-between">
          <div className="flex-1 flex gap-2">
            <p className="text-lg font-semibold text-gray-700">월 결제 금액 :</p>
            <span className="font-semibold text-primary text-2xl">
              {monthlyFee.toLocaleString()}원
            </span>
          </div>
          <span className="text-gray-500 text-m">
            ( 보증금 : {deposit.toLocaleString()}원 )
          </span>
        </div>

        {/* 장바구니 및 구매 버튼 */}
        <div className="flex gap-3 mt-2">
          <AddToCartButton productId={productId} planId={selectedPlan?.planId} />
          <Button
            className="bg-[#ff0066] text-white px-6 py-2 rounded"
            onClick={() => {
              if (!selectedPlan) {
                alert("요금제를 선택해주세요!");
                return;
              }

              router.push(`/order/checkout/${productId}?planId=${selectedPlan.planId}&type=RENTAL`);
            }}
          >
            바로 구매
          </Button>
        </div>
      </div>
    );
  }
}
