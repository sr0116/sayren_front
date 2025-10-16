"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "@/store/modalSlice";
import Button from "@/components/common/Button";
import AddressModal from "@/components/address/AddressModal";
import axios from "axios";
import { useCreateOrderMutation } from "@/api/orderApi";
import { calcRentalPrice } from "@/utils/CalcRentalPrice";
import PaymentButton from "@/components/payments/PaymentButton";

export default function CheckoutPage() {
  const router = useRouter();
  const { id } = useParams();
  const productId = id;
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId");
  const type = searchParams.get("type");

  const dispatch = useDispatch();

  // 배송지 상태
  const [addressId, setAddressId] = useState(null);
  const [receiverName, setReceiverName] = useState("");
  const [receiverTel, setReceiverTel] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [detail, setDetail] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [memo, setMemo] = useState("");

  // 상품 정보
  const [productInfo, setProductInfo] = useState(null);

  // 상품 정보 불러오기
  useEffect(() => {
    if (!productId) return;

    axios
        .get(`/api/product/${productId}`)
        .then((res) => setProductInfo(res.data))
        .catch((err) => console.error("상품 정보 불러오기 오류:", err));
  }, [productId]);

  // 주문 생성 (결제 모달 연동)
  const createOrderMutation = useCreateOrderMutation({
    onSuccess: (res) => {
      const order = res?.data;
      console.log("✅ 주문 생성 성공:", order);

      dispatch(
          openModal({
            content: (
                <div className="p-6 text-center">
                  <h2 className="text-lg font-bold mb-3">
                    주문이 정상적으로 생성되었습니다
                  </h2>
                  <p className="text-gray-500 mb-6">
                    바로 결제를 진행하시겠습니까?
                  </p>

                  {/*  PaymentButton 직접 연결 */}
                  <div className="flex flex-col items-center gap-3">
                    <PaymentButton
                        orderItemId={order?.orderItems?.[0]?.orderItemId}
                    />
                    <Button
                        variant="outline"
                        className="w-32"
                        onClick={() => dispatch(closeModal())}
                    >
                      닫기
                    </Button>
                  </div>
                </div>
            ),
          })
      );
    },
  });

  // 배송지 선택
  const handleSelectAddress = (addr) => {
    if (!addr) return;
    dispatch(closeModal());
    setAddressId(addr.id);
    setReceiverName(addr.name || "");
    setReceiverTel(addr.tel || "");
    setZipcode(addr.zipcode || "");
    setDetail(addr.address || "");
    setMemo(addr.memo || "");
  };

  // 주문 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!receiverName || !receiverTel || !zipcode || !detail) {
      alert("배송 정보를 모두 입력해주세요.");
      return;
    }

    createOrderMutation.mutate({
      data: {
        productId: Number(productId),
        planId: Number(planId),
        addressId,
      },
    });
  };

  // 요금제 정보
  const plans = [
    { planId: 1, month: 0 },
    { planId: 2, month: 12 },
    { planId: 3, month: 24 },
    { planId: 4, month: 36 },
  ];

  const selectedPlan = plans.find((p) => p.planId === Number(planId));
  const planType = type === "RENTAL" ? "RENTAL" : "PURCHASE";

  // 금액 계산
  const price = productInfo?.price || 0;
  const months =
      selectedPlan?.month && selectedPlan.month > 0 ? selectedPlan.month : 36;

  let rental = { monthlyFee: 0, deposit: 0, totalPrice: price };
  if (planType === "RENTAL") {
    try {
      rental = calcRentalPrice(price, months);
    } catch (e) {
      console.error("렌탈 계산 오류:", e);
    }
  }

  const buyPrice = planType === "PURCHASE" ? price : 0;
  const deposit = rental.deposit;
  const monthly = rental.monthlyFee;
  const totalPrice = planType === "PURCHASE" ? buyPrice : rental.totalPrice;

  if (!productInfo)
    return (
        <div className="text-center p-20 text-gray-500">
          상품 정보를 불러오는 중입니다...
        </div>
    );

  return (
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-8 text-center">주문 결제</h1>

        <div className="grid grid-cols-3 gap-6">
          {/* 왼쪽: 상품 + 배송지 */}
          <div className="col-span-2 space-y-8">
            {/* 주문 상품 정보 */}
            <div className="border rounded-lg shadow-sm bg-white p-5">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                주문 상품
              </h2>
              <div className="flex gap-4 items-center">
                <img
                    src={productInfo.thumbnailUrl || "/images/default-product.jpg"}
                    alt={productInfo.productName}
                    className="w-32 h-32 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-bold text-lg">{productInfo.productName}</p>
                  <p className="text-gray-600 text-sm mb-1">
                    카테고리: {productInfo.productCategory} | 모델명:{" "}
                    {productInfo.modelName}
                  </p>
                  <p className="text-gray-600">
                    요금제:{" "}
                    {planType === "PURCHASE"
                        ? "구매"
                        : `렌탈 (${selectedPlan?.month || 36}개월)`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-red-600">
                    ₩{totalPrice.toLocaleString()}
                  </p>
                  {planType === "RENTAL" && (
                      <p className="text-gray-500 text-sm">
                        월 {rental.monthlyFee.toLocaleString()}원 / 보증금{" "}
                        {rental.deposit.toLocaleString()}원
                      </p>
                  )}
                </div>
              </div>
            </div>

            {/* 배송 정보 */}
            <div className="border rounded-lg shadow-sm bg-white p-5">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                배송 정보
              </h2>
              <Button
                  variant="outline"
                  onClick={() =>
                      dispatch(
                          openModal({
                            content: <AddressModal onSelect={handleSelectAddress} />,
                          })
                      )
                  }
              >
                배송지 선택하기
              </Button>

              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <input
                    placeholder="수령인"
                    value={receiverName}
                    disabled
                    className="border rounded w-full p-2 text-gray-500 placeholder-gray-400"
                />
                <input
                    placeholder="연락처"
                    value={receiverTel}
                    disabled
                    className="border rounded w-full p-2 text-gray-500 placeholder-gray-400"
                />
                <input
                    placeholder="우편번호"
                    value={zipcode}
                    disabled
                    className="border rounded w-full p-2 text-gray-500 placeholder-gray-400"
                />
                <input
                    placeholder="주소"
                    value={detail}
                    disabled
                    className="border rounded w-full p-2 text-gray-500 placeholder-gray-400"
                />
                <input
                    placeholder="상세주소를 입력하세요"
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                    className="border rounded w-full p-2"
                />
                <input
                    placeholder="배송 메모"
                    value={memo}
                    disabled
                    className="border rounded w-full p-2 text-gray-500 placeholder-gray-400"
                />

                <Button type="submit" variant="primary" className="w-full mt-4">
                  주문하기
                </Button>
              </form>
            </div>
          </div>

          {/* 오른쪽: 결제 요약 */}
          <div className="border rounded-lg shadow-md bg-white p-5 h-fit sticky top-6">
            <h2 className="font-semibold text-lg border-b pb-2 mb-3">결제 요약</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between font-bold text-md">
                <span>구매 금액</span>
                <span>{buyPrice.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between font-bold text-md">
                <span>월 렌탈 금액</span>
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
          </div>
        </div>
      </div>
  );
}
