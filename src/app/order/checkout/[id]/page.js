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
  const { id } = useParams(); // 상품 ID
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId");
  const dispatch = useDispatch();

  // 배송지 입력 상태
  const [receiverName, setReceiverName] = useState("");
  const [receiverTel, setReceiverTel] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [detail, setDetail] = useState("");
  const [memo, setMemo] = useState("");

  // 상품 요약 정보 (추후 백엔드 연동 시 API에서 받아오면 교체 가능)
  const [productInfo] = useState({
    thumbnailUrl: "/images/default-product.jpg", // 백엔드 썸네일 들어오면 교체
    productName: "LG 퓨리케어 360° 공기청정기",
    planType: planId === "1" ? "구매" : "렌탈",
    originalPrice: 2100000,
    discountedPrice: 1254000,
  });

  // 배송지 선택 시 자동 입력 처리
  const handleSelectAddress = (addr) => {
    if (!addr) return;
    dispatch(closeModal());
    setReceiverName(addr.name || "");
    setReceiverTel(addr.tel || "");
    setZipcode(addr.zipcode || "");
    setDetail(addr.address || "");
    setMemo(addr.memo || "");
  };

  // 바로구매 주문 생성
  const createOrderMutation = useDirectOrderMutation({
    onSuccess: (res) => {
      // 주문 생성 성공 → 주문 요약 + 결제 버튼 모달 표시
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

              {/* 결제 버튼 */}
              <Button
                variant="primary"
                className="w-full max-w-md py-3 text-lg font-semibold"
                onClick={() => {
                  dispatch(closeModal());
                  router.push(`/payment/prepare?orderId=${res.orderId}`);
                }}
              >
                결제 진행하기 →
              </Button>

              <Button
                variant="outline"
                className="w-full max-w-md py-3"
                onClick={() => {
                  dispatch(closeModal());
                  router.push(`/order/history/${res.orderId}`);
                }}
              >
                주문 내역 보기
              </Button>
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
              <Button
                variant="primary"
                onClick={() => dispatch(closeModal())}
              >
                확인
              </Button>
            </div>
          ),
        })
      );
    },
  });

  // 주문하기 버튼 클릭 핸들러
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
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">주문 결제</h1>

      {/* 상품 요약 섹션 */}
      <section className="border-b pb-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">주문 제품</h2>
        <div className="flex gap-4 items-center border rounded-lg p-4 bg-white shadow-sm">
          <img
            src={productInfo.thumbnailUrl}
            alt="상품 이미지"
            className="w-28 h-28 object-cover rounded"
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
      </section>

      {/* 배송지 선택 */}
      <div className="mb-6">
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            dispatch(
              openModal({
                content: <AddressModal onSelect={handleSelectAddress} />,
              })
            )
          }
        >
          배송지를 선택해주세요
        </Button>
      </div>

      {/* 주문 폼 */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>수령인 *</label>
          <input
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            className="border rounded w-full p-2"
          />
        </div>

        <div>
          <label>연락처 *</label>
          <input
            value={receiverTel}
            onChange={(e) => setReceiverTel(e.target.value)}
            className="border rounded w-full p-2"
          />
        </div>

        <div>
          <label>우편번호 *</label>
          <input
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            className="border rounded w-full p-2"
          />
        </div>

        <div>
          <label>상세 주소 *</label>
          <input
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            className="border rounded w-full p-2"
          />
        </div>

        <div>
          <label>배송 메모</label>
          <input
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="border rounded w-full p-2"
          />
        </div>

        <div className="mt-8 border-t pt-6">
          <Button
            type="submit"
            variant="primary"
            disabled={createOrderMutation.isLoading}
            className="w-full py-3 text-lg font-semibold"
          >
            {createOrderMutation.isLoading
              ? "주문 처리 중..."
              : `₩${productInfo.discountedPrice.toLocaleString()} 결제하기`}
          </Button>
        </div>
      </form>
    </div>
  );
}
