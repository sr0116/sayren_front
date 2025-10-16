"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import ClearCartButton from "@/components/order/ClearCartButton";
import { useEffect, useState } from "react";
import { calcRentalPrice } from "@/utils/CalcRentalPrice";
import { useApiQuery } from "@/hooks/useApi";

export default function Page() {
  const router = useRouter();

  // ✅ 장바구니 API 호출 로그 확인
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

  const handleReset = () => {
    console.log("🧹 [CartPage] 장바구니 초기화 실행");
    setItemList([]);
  };

  // ✅ API 결과 로깅
  useEffect(() => {
    console.log("📡 [CartPage] useApiQuery 결과:", { items, isLoading, isError, error });

    if (isLoading) return;
    if (isError) {
      console.error("❌ [CartPage] 장바구니 API 오류:", error);
      return;
    }

    if (items && Array.isArray(items)) {
      try {
        const grouped = groupCartItems(items);
        console.log("✅ [CartPage] 그룹핑된 장바구니 아이템:", grouped);
        setItemList(grouped);
      } catch (e) {
        console.error("🔥 [CartPage] groupCartItems 오류:", e);
      }
    } else {
      console.warn("⚠️ [CartPage] items 데이터가 배열이 아님:", items);
    }
  }, [items, isLoading, isError]);

  // ✅ 그룹핑 함수 (안전 처리 + 로깅)
  function groupCartItems(cartItems) {
    console.log("🧾 [groupCartItems] 원본 cartItems:", cartItems);

    if (!Array.isArray(cartItems)) {
      throw new Error("cartItems는 배열이어야 합니다!");
    }

    if (cartItems.length === 0) {
      console.warn("⚠️ [groupCartItems] 장바구니가 비어 있음");
      return [];
    }

    const grouped = cartItems.reduce((acc, item) => {
      const key = `${item.productId}_${item.planId}`;
      console.log("🧩 [groupCartItems] 처리 중 item:", item);

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

    console.log("✅ [groupCartItems] 최종 그룹핑 결과:", Object.values(grouped));
    return Object.values(grouped);
  }

  if (isLoading) return <p className="text-center py-10">로딩 중...</p>;
  if (isError)
    return (
        <p className="text-center py-10 text-red-500">
          장바구니 조회 실패: {error?.message}
        </p>
    );

  // ✅ 총합 계산 로그
  const buyPrice = itemList
      ?.filter((item) => item.planType === "PURCHASE")
      .reduce((sum, item) => sum + item.price * item.quantity, 0);

  let deposit = 0;
  let monthly = 0;

  itemList
      ?.filter((item) => item.planType !== "PURCHASE")
      .forEach((item) => {
        const plan = plans.find((plan) => plan.planId === item.planId);
        if (!plan) {
          console.warn("⚠️ [CartPage] planId 매칭 실패:", item.planId);
          return;
        }

        const pri = calcRentalPrice(item.price, plan.month);
        monthly += pri.monthlyFee * item.quantity;
        deposit += pri.deposit * item.quantity;
      });

  const totalPrice = buyPrice + deposit + monthly;

  console.log("💰 [CartPage] 금액 계산:", {
    buyPrice,
    monthly,
    deposit,
    totalPrice,
  });

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
                {itemList.map((item, idx) => (
                    <div
                        key={`${item.productId}_${item.planId}_${idx}`}
                        className="flex gap-4 p-4 border rounded-lg shadow-sm bg-white"
                    >
                      <input type="checkbox" defaultChecked className="w-5 h-5 mt-2" />
                      <div className="flex-1 flex flex-col gap-2">
                        <h3 className="font-semibold text-lg">{item.productName}</h3>
                        <p className="text-gray-500 text-sm mb-2">
                          요금제:{" "}
                          {item.planType === "PURCHASE"
                              ? "구매"
                              : `렌탈 - ${
                                  plans.find((plan) => plan.planId === item.planId)
                                      ?.month || "?"
                              }개월`}
                        </p>

                        {/* 가격 */}
                        <div className="flex gap-2 items-center">
                    <span className="text-lg font-bold text-gray-900">
                      {item.planType !== "PURCHASE"
                          ? `월 ${(
                              calcRentalPrice(
                                  item.price,
                                  plans.find(
                                      (plan) => plan.planId === item.planId
                                  )?.month || 0
                              ).monthlyFee * item.quantity
                          ).toLocaleString()}`
                          : (item.price * item.quantity).toLocaleString()}
                      원
                    </span>
                          {item.quantity > 1 && item.planType === "PURCHASE" && (
                              <span className="text-gray-400 text-sm">
                        (개당 {item.price.toLocaleString()}원)
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
                                  console.log("➕ [CartPage] 수량 증가:", updated[idx]);
                                }}
                            >
                              +
                            </button>
                            <span className="w-6 text-center">{item.quantity}</span>
                            <button
                                className="px-2 text-gray-500 hover:text-black cursor-pointer"
                                onClick={() => {
                                  const updated = [...itemList];
                                  if (updated[idx].quantity > 1) updated[idx].quantity -= 1;
                                  setItemList(updated);
                                  console.log("➖ [CartPage] 수량 감소:", updated[idx]);
                                }}
                            >
                              −
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                          className="text-sm text-gray-500 hover:text-red-500"
                          onClick={() =>
                              alert(`삭제 기능은 ClearCartButton 사용!`)
                          }
                      >
                        삭제
                      </button>
                    </div>
                ))}
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

                <div className="mt-6 flex flex-col gap-3">
                  <Button
                      variant="primary"
                      className="w-full bg-blue-600 text-white py-3 rounded"
                      onClick={() => {
                        console.log("🧾 [CartPage] 주문 버튼 클릭됨");
                        console.log("📦 [CartPage] 현재 itemList:", itemList);

                        if (!itemList || itemList.length === 0) {
                          alert("장바구니가 비어 있습니다.");
                          return;
                        }

                        const cartIds = itemList
                            .flatMap((item) => item.cartItemIds)
                            .join(",");

                        const planId = itemList[0].planId;
                        console.log("🚀 [CartPage] 이동할 주문 파라미터:", {
                          productId: itemList[0].productId,
                          planId,
                          cartIds,
                        });

                        router.push(
                            `/order/checkout/${itemList[0].productId}?planId=${planId}&cartitems=${cartIds}`
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
