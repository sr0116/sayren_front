"use client";
import {useRouter} from "next/navigation";
import Button from "@/components/common/Button";
import ClearCartButton from "@/components/order/ClearCartButton";
import {useCartItemsQuery} from "@/api/cartApi";
import {useEffect, useState} from "react";
import {calcRentalPrice} from "@/utils/CalcRentalPrice";
import {useApiQuery} from "@/hooks/useApi";

export default function Page() {
  const router = useRouter();

  const { data: items = [], isLoading, isError } = useApiQuery(
    ["cart"],
    `/api/user/cart`,
    {
        keepPreviousData: true,
        staleTime: 0,
        cacheTime: 0,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    }
  );



  const [itemList, setItemList] = useState([]);
  const plans = [
    {planId: 2, month: 12}, {planId: 3, month: 24}, {planId: 4, month: 36}
  ]
  const handleReset = () => {
    setItemList([]);
  }

  useEffect(() => {
    if(items && items.length > 0) {
      setItemList(groupCartItems(items));
    }
  }, [items])

  function groupCartItems(cartItems) {
    if (!Array.isArray(cartItems)) {
      throw new Error("cartItems는 배열이어야 합니다!");
    }

    const grouped = cartItems.reduce((acc, item) => {
      // 그룹 키 생성 (상품 + 요금제)
      const key = `${item.productId}_${item.planId}`;

      if (!acc[key]) {
        // 처음 등장한 상품이면 새 그룹 생성
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
        // 이미 존재하는 그룹이면 수량 +1, cartItemId 추가
        acc[key].quantity += 1;
        acc[key].cartItemIds.push(item.cartItemId);
      }

      return acc;
    }, {});

    if (isLoading) return <p>로딩 중...</p>;
    if (isError) return <p>조회 실패...</p>;


    // 객체 → 배열로 변환
    return Object.values(grouped);
  }


  if (isLoading) return <p className="text-center py-10">로딩 중...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">조회 실패...</p>;

  // 총합 계산
  const buyPrice = itemList?.filter((item) => item.planType === "PURCHASE").reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0)
  let deposit = 0;
  let monthly = 0;
  itemList?.filter(item => item.planType !== "PURCHASE").forEach(item => {
    const pri = calcRentalPrice(item.price, plans.find(plan => plan.planId === item.planId).month);
    monthly += pri.monthlyFee * item.quantity;
    deposit += pri.deposit * item.quantity;
  })


  const totalPrice = buyPrice + deposit + monthly;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">🛒 내 장바구니</h1>
      {/* 장바구니 비어있을 때 */}
      {!itemList || itemList.length === 0 ? (
        <p className="text-gray-500 text-center py-20">장바구니가 비어 있습니다.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {/* 왼쪽: 상품 목록 */}
          <div className="col-span-2 space-y-6">
            {itemList.map((item, idx) => (
              <div
                key={item.productId}
                className="flex gap-4 p-4 border rounded-lg shadow-sm bg-white "
              >
                <input type="checkbox" defaultChecked className="w-5 h-5 mt-2"/>
                <div className="flex-1 flex flex-col gap-2  ">
                  <h3 className="font-semibold text-lg">{item.productName}</h3>
                  <p className="text-gray-500 text-sm mb-2">
                    요금제: {item.planType === "PURCHASE" ? "구매" : `렌탈 - ${plans.find(plan => plan.planId === item.planId).month} 개월`}
                  </p>

                  {/* ✅ 가격 */}
                  <div className="flex gap-2 items-center">

                    <span className="text-lg font-bold text-gray-900">
            { item.planType !== "PURCHASE" ? (`월 ${(calcRentalPrice(item.price, plans.find(plan => plan.planId === item.planId).month).monthlyFee * item.quantity).toLocaleString()}`) : (item.price * item.quantity).toLocaleString()
            }원
          </span>
                    { (item.quantity > 1 && item.planType === "PURCHASE") &&
                      <span className="text-gray-400 text-sm">
              (개당 {item.price.toLocaleString()}원)
            </span>
                    }
                  </div>

                  {/* ✅ 수량 조절 버튼 */}
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
                          if (updated[idx].quantity > 1) updated[idx].quantity -= 1;
                          setItemList(updated);
                        }}
                      >
                        −
                      </button>

                    </div>


                  </div>
                </div>

                <button
                  className="text-sm text-gray-500 hover:text-red-500"
                  onClick={() => alert(`삭제 기능은 ClearCartButton 사용!`)}
                >
                  삭제
                </button>
              </div>
            ))}
          </div>

          {/* 오른쪽: 결제 요약 */}
          <div className="border rounded-lg shadow-md bg-white p-5 h-fit sticky top-6">
            <h2 className="font-semibold text-lg border-b pb-2 mb-3">주문 예상 금액</h2>
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
                onClick={() => router.push(`/order/checkout/${itemList[0].productId}?planId=${itemList[0].planId}`)}
              >
                총 {itemList.length}개 상품 구매하기
              </Button>
              <ClearCartButton onClick={handleReset}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
