"use client";

import { useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "@/store/modalSlice";
import { queryClient } from "@/lib/queryClient";
import Button from "@/components/common/Button";
import { useDirectOrderMutation } from "@/api/orderApi";
import AddressModal from "@/components/address/AddressModal";

export default function CheckoutPage() {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId");
  const dispatch = useDispatch();

  // 배송지 입력 상태
  const [receiverName, setReceiverName] = useState("");
  const [receiverTel, setReceiverTel] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [detail, setDetail] = useState("");
  const [memo, setMemo] = useState("");

  // 상품 요약 (임시)
  const [productInfo] = useState({
    thumbnailUrl: "/images/default-product.jpg",
    productName: "LG 퓨리케어 360° 공기청정기",
    planType: planId === "1" ? "구매" : "렌탈",
    originalPrice: 2100000,
    discountedPrice: 1254000,
  });

  // 주소 선택 모달 핸들러
  const handleSelectAddress = (addr) => {
    if (!addr) return;
    dispatch(closeModal());
    setReceiverName(addr.name || "");
    setReceiverTel(addr.tel || "");
    setZipcode(addr.zipcode || "");
    setDetail(addr.address || "");
    setMemo(addr.memo || "");
  };

  // 주문 생성 API
  const createOrderMutation = useDirectOrderMutation({
    onSuccess: (res) => {
      dispatch(
        openModal({
          content: (
            <div className="flex flex-col items-center text-center gap-6 p-6">
              <h2 className="text-xl font-bold text-green-600">
                주문이 정상적으로 생성되었습니다!
              </h2>

              {/* 주문 요약 카드 */}
              <div className="border rounded-lg p-4 w-full max-w-md bg-white shadow-sm">
                <div className="flex items-center gap-4">
                  <img
                    src={productInfo.thumbnailUrl}
                    alt="상품 이미지"
                    className="w-24 h-24 rounded object-cover border"
                  />
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-lg text-gray-800">
                      {productInfo.productName}
                    </p>
                    <p className="text-gray-500 text-sm">
                      요금제: {productInfo.planType}
                    </p>
                    <p className="text-red-600 font-bold mt-1">
                      ₩{productInfo.discountedPrice.toLocaleString()}
                    </p>
                    <p className="text-gray-400 line-through text-sm">
                      ₩{productInfo.originalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/*  버튼 영역 */}
              <div className="flex flex-col gap-3 w-full max-w-md">
                {/* 기존 결제 버튼 */}
                <Button
                  variant="primary"
                  className="w-full py-3 text-lg font-semibold"
                  onClick={() => {
                    dispatch(closeModal());
                    router.push(`/payment/prepare?orderId=${res.orderId}`);
                  }}
                >
                  결제 진행하기 →
                </Button>

                {/* 주문내역 보기 버튼 (주문상세 연결) */}
                <Button
                  variant="secondary"
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded hover:bg-gray-300"
                  onClick={() => {
                    dispatch(closeModal());
                    router.push(`/order/history/${res.orderId}`);
                  }}
                >
                  주문내역 보기
                </Button>
              </div>
            </div>
          ),
        })
      );
      queryClient.invalidateQueries(["orders"]);
    },
    onError: (err) => {
      console.error("주문 생성 실패:", err);
      dispatch(
        openModal({
          content: (
            <div className="flex flex-col justify-center items-center gap-4">
              <p className="text-red-500 font-semibold">주문 생성에 실패했습니다.</p>
              <Button variant="primary" onClick={() => dispatch(closeModal())}>
                확인
              </Button>
            </div>
          ),
        })
      );
    },
  });

  // 주문 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!receiverName || !receiverTel || !zipcode || !detail) {
      alert("배송 정보를 모두 입력해주세요.");
      return;
    }

    createOrderMutation.mutate({
      data: {
        productId: id,
        planId,
        receiverName,
        receiverTel,
        zipcode,
        detail,
        memo,
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">주문 결제</h1>

      <div className="grid grid-cols-3 gap-6">
        {/* 왼쪽: 상품정보 + 배송지입력 */}
        <div className="col-span-2 space-y-8">
          {/* 상품 카드 */}
          <div className="border rounded-lg shadow-sm bg-white p-5">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">주문 상품</h2>
            <div className="flex gap-4 items-center">
              <img
                src={productInfo.thumbnailUrl}
                alt="상품 이미지"
                className="w-28 h-28 object-cover rounded border"
              />
              <div className="flex-1">
                <p className="font-bold text-lg">{productInfo.productName}</p>
                <p className="text-gray-600">요금제: {productInfo.planType}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-red-600">
                  ₩{productInfo.discountedPrice.toLocaleString()}
                </p>
                <p className="text-gray-400 line-through text-sm">
                  ₩{productInfo.originalPrice.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* 배송지 입력 */}
          <div className="border rounded-lg shadow-sm bg-white p-5">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">배송 정보</h2>
            <div className="mb-4">
              <Button
                type="button"
                variant="outline"
                className="border-gray-400"
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
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label>수령인 *</label>
                <input
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  className="border rounded w-full p-2 mt-1"
                />
              </div>

              <div>
                <label>연락처 *</label>
                <input
                  value={receiverTel}
                  onChange={(e) => setReceiverTel(e.target.value)}
                  className="border rounded w-full p-2 mt-1"
                />
              </div>

              <div>
                <label>우편번호 *</label>
                <input
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  className="border rounded w-full p-2 mt-1"
                />
              </div>

              <div>
                <label>상세 주소 *</label>
                <input
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  className="border rounded w-full p-2 mt-1"
                />
              </div>

              <div>
                <label>배송 메모</label>
                <input
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className="border rounded w-full p-2 mt-1"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full bg-blue-600 text-white py-3 mt-6 rounded"
                disabled={createOrderMutation.isLoading}
              >
                {createOrderMutation.isLoading
                  ? "주문 처리 중..."
                  : `₩${productInfo.discountedPrice.toLocaleString()} 결제하기`}
              </Button>
            </form>
          </div>
        </div>

        {/* 오른쪽: 금액 요약 */}
        <div className="border rounded-lg shadow-md bg-white p-5 h-fit sticky top-6">
          <h2 className="font-semibold text-lg border-b pb-2 mb-3">결제 요약</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between font-bold text-md">
              <span>상품 금액</span>
              <span>{productInfo.originalPrice.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between font-bold text-md">
              <span>할인 금액</span>
              <span className="text-red-500">
                -
                {(
                  productInfo.originalPrice - productInfo.discountedPrice
                ).toLocaleString()}
                원
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2">
              <span>총 결제금액</span>
              <span>{productInfo.discountedPrice.toLocaleString()}원</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Button
              variant="primary"
              className="w-full bg-blue-600 text-white py-3 rounded"
              onClick={handleSubmit}
            >
              결제하기
            </Button>
            <Button
              variant="secondary"
              className="w-full bg-red-500 text-white py-3 rounded"
              onClick={() => router.push("/order/cart")}
            >
              장바구니로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
