"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import ClearCartButton from "@/components/order/ClearCartButton";
import { useApiQuery } from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { calcRentalPrice } from "@/utils/CalcRentalPrice";
import { preparePayment, completePayment } from "@/api/paymentApi";
import { requestPortOnePayment } from "@/lib/portone";
import Script from "next/script";
import axios from "axios";

export default function Page() {
  const router = useRouter();

  // 장바구니 데이터 조회
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
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const plans = [
    { planId: 2, month: 12 },
    { planId: 3, month: 24 },
    { planId: 4, month: 36 },
  ];

  const handleReset = () => setItemList([]);

  // SDK 로드 상태 감시
  useEffect(() => {
    if (window.IMP) {
      console.log("✅ PortOne SDK 이미 로드됨");
      setSdkLoaded(true);
    }
  }, []);

  // 장바구니 그룹핑
  useEffect(() => {
    if (items && items.length > 0) {
      const grouped = groupCartItems(items);
      setItemList(grouped);
    }
  }, [items]);

  function groupCartItems(cartItems) {
    if (!Array.isArray(cartItems)) throw new Error("cartItems는 배열이어야 합니다.");
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

  if (isLoading)
    return <p className="text-center py-10">로딩 중...</p>;
  if (isError)
    return <p className="text-center py-10 text-red-500">조회 실패...</p>;

  // 금액 계산
  const buyPrice = itemList
      ?.filter((item) => item.planType === "PURCHASE")
      .reduce((sum, item) => sum + item.price * item.quantity, 0);

  let deposit = 0;
  let monthly = 0;
  itemList
      ?.filter((item) => item.planType !== "PURCHASE")
      .forEach((item) => {
        const pri = calcRentalPrice(
            item.price,
            plans.find((plan) => plan.planId === item.planId).month
        );
        monthly += pri.monthlyFee * item.quantity;
        deposit += pri.deposit * item.quantity;
      });

  const totalPrice = buyPrice + deposit + monthly;

  // ✅ 주문 + 결제 모달 자동 실행
  const handleOrderAndPay = async () => {
    if (!sdkLoaded) {
      alert("결제 모듈이 아직 로드되지 않았습니다.");
      return;
    }

    try {
      setLoading(true);
      console.log("🧾 주문 + 결제 시작");

      const first = itemList[0];
      const orderReq = {
        productId: first.productId,
        planId: first.planId,
        addressId: 1, // TODO: 실제 주소 선택 후 연결
      };

      // 1️⃣ 주문 생성
      const orderRes = await axios.post("/api/user/orders/create", orderReq);
      console.log("✅ 주문 생성 응답:", orderRes.data);

      const orderItemId = orderRes.data.data?.orderItems?.[0]?.orderItemId;
      if (!orderItemId) throw new Error("orderItemId를 찾을 수 없습니다.");

      // 2️⃣ 결제 준비
      const paymentData = await preparePayment({ orderItemId });
      console.log("✅ 결제 준비 완료:", paymentData);

      // 3️⃣ PortOne 모달 실행
      const rsp = await requestPortOnePayment(paymentData);
      console.log("💳 PortOne 응답:", rsp);

      if (!rsp || !rsp.imp_uid) throw new Error("결제 응답이 올바르지 않습니다.");

      // 4️⃣ 결제 검증
      const verify = await completePayment({
        paymentId: paymentData.paymentId,
        impUid: rsp.imp_uid,
      });
      console.log("✅ 결제 검증 결과:", verify);

      if (verify.paymentStatus === "PAID") {
        alert("결제가 정상적으로 완료되었습니다.");
      } else if (verify.paymentStatus === "FAILED") {
        alert("결제에 실패했습니다.");
      } else if (verify.paymentStatus === "CANCELED") {
        alert("결제가 취소되었습니다.");
      } else {
        alert(`결제 상태를 확인할 수 없습니다: ${verify.paymentStatus}`);
      }
    } catch (err) {
      console.error("🚨 결제 처리 중 오류:", err);
      alert("결제 중 오류가 발생했습니다: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <>
        {/* PortOne SDK */}
        <Script
            src="https://cdn.iamport.kr/v1/iamport.js"
            strategy="afterInteractive"
            onLoad={() => {
              console.log("✅ PortOne SDK 로드 완료");
              setSdkLoaded(true);
            }}
            onError={() => {
              console.error("🚨 PortOne SDK 로드 실패");
              setSdkLoaded(false);
            }}
        />

        <div>
          <h1 className="text-2xl font-bold mb-6">내 장바구니</h1>

          {!itemList || itemList.length === 0 ? (
              <p className="text-gray-500 text-center py-20">
                장바구니가 비어 있습니다.
              </p>
          ) : (
              <div className="grid grid-cols-3 gap-6">
                {/* 상품 목록 */}
                <div className="col-span-2 space-y-6">
                  {itemList.map((item) => (
                      <div
                          key={item.productId}
                          className="flex gap-4 p-4 border rounded-lg shadow-sm bg-white"
                      >
                        <div className="flex-1 flex flex-col gap-2">
                          <h3 className="font-semibold text-lg">{item.productName}</h3>
                          <p className="text-gray-500 text-sm">
                            {item.planType === "PURCHASE"
                                ? "구매"
                                : `렌탈 - ${
                                    plans.find((p) => p.planId === item.planId).month
                                }개월`}
                          </p>
                          <span className="font-bold">
                      {item.price.toLocaleString()}원
                    </span>
                        </div>
                      </div>
                  ))}
                </div>

                {/* 결제 요약 + 버튼 */}
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
                        disabled={loading}
                        onClick={handleOrderAndPay}
                    >
                      {loading ? "결제 진행중..." : "주문하기"}
                    </Button>

                    <ClearCartButton onClick={handleReset} />
                  </div>
                </div>
              </div>
          )}
        </div>
      </>
  );
}
