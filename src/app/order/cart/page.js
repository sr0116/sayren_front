"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import ClearCartButton from "@/components/order/ClearCartButton";
import RemoveCartItemButton from "@/components/order/RemoveCartItemButton";
import { useEffect, useState } from "react";
import { calcRentalPrice } from "@/utils/CalcRentalPrice";
import { useApiQuery } from "@/hooks/useApi";
import { useRemoveCartItemMutation } from "@/api/cartApi";

export default function Page() {
  const router = useRouter();

  const {
    data: items = [],
    isLoading,
    isError,
    error,
  } = useApiQuery(["cart"], `/api/user/cart`, {
    keepPreviousData: true,
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const [itemList, setItemList] = useState([]);
  const plans = [
    { planId: 2, month: 12 },
    { planId: 3, month: 24 },
    { planId: 4, month: 36 },
  ];

  const removeCartItem = useRemoveCartItemMutation({
    onSuccess: () => {
      alert("상품이 장바구니에서 삭제되었습니다.");
      window.location.reload();
    },
    onError: (err) => {
      console.error("삭제 실패:", err);
      alert("상품 삭제 중 오류가 발생했습니다.");
    },
  });

  const handleReset = () => {
    console.log(" [CartPage] 장바구니 초기화 실행");
    setItemList([]);
  };

  useEffect(() => {
    if (isLoading) return;
    if (isError) {
      console.error(" [CartPage] 장바구니 API 오류:", error);
      return;
    }

    if (items && Array.isArray(items)) {
      const grouped = groupCartItems(items);
      setItemList(grouped);
    }
  }, [items, isLoading, isError]);

  function groupCartItems(cartItems) {
    const grouped = cartItems.reduce((acc, item) => {
      const key = `${item.productId}_${item.planId}`;
      if (!acc[key]) {
        acc[key] = {
          productId: item.productId,
          productName: item.productName,
          planId: item.planId,
          planType: item.planType,
          price: item.price,
          quantity: 1,
          cartItemIds: [item.cartItemId],
        };
      } else {
        acc[key].quantity += 1;
        acc[key].cartItemIds.push(item.cartItemId);
      }
      return acc;
    }, {});
    return Object.values(grouped);
  }

  if (isLoading) return <p className="text-center py-10">로딩 중...</p>;
  if (isError)
    return (
      <p className="text-center py-10 text-red-500">
        장바구니 조회 실패: {error?.message}
      </p>
    );

  //  가격 계산
  let buyPrice = 0,
    deposit = 0,
    monthly = 0;

  itemList.forEach((item) => {
    const plan = plans.find((plan) => plan.planId === item.planId);
    if (!plan) return;

    const { monthlyFee, deposit: dep } = calcRentalPrice(item.price, plan.month);
    if (item.planType === "PURCHASE") {
      buyPrice += item.price * item.quantity;
    } else {
      monthly += Math.floor(monthlyFee / 10) * 10 * item.quantity;
      deposit += Math.floor(dep / 10) * 10 * item.quantity;
    }
  });

  const totalPrice = buyPrice + monthly + deposit;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">내 장바구니</h1>

      {!itemList || itemList.length === 0 ? (
        <p className="text-gray-500 text-center py-20">
          장바구니가 비어 있습니다.
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 왼쪽: 상품 목록 */}
          <div className="lg:col-span-2 space-y-6">
            {itemList.map((item, idx) => {
              const plan = plans.find((p) => p.planId === item.planId);
              const { monthlyFee, deposit: itemDeposit } = calcRentalPrice(
                item.price,
                plan?.month || 0
              );

              return (
                <div
                  key={`${item.productId}_${item.planId}_${idx}`}
                  className="flex gap-4 p-4 border rounded-lg shadow-sm bg-white"
                >
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 mt-2"
                  />

                  {/* 상품 정보 */}
                  <div className="flex-1 flex flex-col gap-2">
                    <h3 className="font-semibold text-lg">
                      {item.productName}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">
                      요금제:{" "}
                      {item.planType === "PURCHASE"
                        ? "구매"
                        : `렌탈 - ${plan?.month || "?"}개월`}
                    </p>

                    {/*  가격 + 보증금 표시 */}
                    <div className="flex flex-col gap-1">
                      <span className="text-lg font-bold text-gray-900">
                        {item.planType !== "PURCHASE"
                          ? `월 ${(monthlyFee * item.quantity).toLocaleString()}원`
                          : (item.price * item.quantity).toLocaleString() + "원"}
                      </span>
                      {item.planType !== "PURCHASE" && (
                        <span className="text-sm text-gray-500">
                          보증금: {itemDeposit.toLocaleString()}원
                        </span>
                      )}
                    </div>

                    {/* 수량 조절 */}
                    <div className="flex gap-3 flex-col">
                      <div className="items-center border border-gray-300 rounded-full px-1 py-1 flex w-20">
                        <button
                          className="px-2 text-gray-500 hover:text-black cursor-pointer"
                          onClick={() => {
                            const updated = [...itemList];
                            updated[idx].quantity += 1;
                            setItemList(updated);
                          }}
                        >
                          +
                        </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button
                          className="px-2 text-gray-500 hover:text-black cursor-pointer"
                          onClick={() => {
                            const updated = [...itemList];
                            if (updated[idx].quantity > 1)
                              updated[idx].quantity -= 1;
                            setItemList(updated);
                          }}
                        >
                          −
                        </button>
                      </div>
                    </div>
                  </div>

                  {/*  단일 삭제 버튼 */}
                  <RemoveCartItemButton
                    cartItemId={item.cartItemIds[0]}
                    productName={item.productName}
                  />
                </div>
              );
            })}
          </div>

          {/* 오른쪽: 결제 요약 */}
          <div className="border rounded-lg shadow-md bg-white p-5 h-fit sticky top-6">
            <h2 className="font-semibold text-lg border-b pb-2 mb-3">
              주문 예상 금액
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between font-bold text-md">
                <span>구매금액</span>
                <span>{buyPrice.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between font-bold text-md">
                <span>월 렌탈금액</span>
                <span>{monthly.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between font-bold text-md">
                <span>보증금</span>
                <span>{deposit.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2">
                <span>총 결제금액</span>
                <span>{totalPrice.toLocaleString()}원</span>
              </div>
            </div>

            {/*  버튼 영역 */}
            <div className="mt-6 flex flex-col gap-3">
              <Button
                variant="primary"
                className="w-full bg-blue-600 text-white py-2 text-sm rounded-md hover:bg-blue-700 transition"
                onClick={() => {
                  if (!itemList || itemList.length === 0) {
                    alert("장바구니가 비어 있습니다.");
                    return;
                  }

                  const firstItem = itemList[0];
                  const planId = firstItem.planId;
                  const plan = plans.find((p) => p.planId === planId);
                  const months = plan ? plan.month : 36;
                  const type = firstItem.planType;
                  const cartIds = itemList
                    .flatMap((item) => item.cartItemIds)
                    .join(",");

                  router.push(
                    `/order/checkout/${firstItem.productId}?planId=${planId}&months=${months}&cartitems=${cartIds}&type=${type}`
                  );
                }}
              >
                총 {itemList.length}개 상품 주문하기
              </Button>

              <ClearCartButton onClick={handleReset} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
