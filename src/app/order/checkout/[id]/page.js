"use client";

import {useEffect, useState} from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "@/store/modalSlice";
import { queryClient } from "@/lib/queryClient";
import Button from "@/components/common/Button";
import {useCreateOrderMutation, useDirectOrderMutation} from "@/api/orderApi";
import AddressModal from "@/components/address/AddressModal";
import axios from "axios";
import {useAddCartItemMutation} from "@/api/cartApi";

export default function CheckoutPage() {
  // planid, productid 있으면 cartitem 등록
  // 성공응답으로 아이디 받아와서 카트아이템 리스트에 추가
  // 리스트 를 기반으로 주문서 업데이트
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId");
  const productId = searchParams.get("productId");



  const cartItems = searchParams.getAll("cartitems");
  const cartItemList = cartItems.map(Number);

  const plans = [
    {planId: 2, month: 12}, {planId: 3, month: 24}, {planId: 4, month: 36}
  ]

  const addCartItemMutation = useAddCartItemMutation({
    onSuccess: (data) => {

    },
    onError: (error) => {

    }
  });


  const createOrderMutation = useCreateOrderMutation({
    onSuccess: (data) => {

    },
    onError: (err) => {

    }
  })

  const dispatch = useDispatch();

  // 배송지 입력 상태
  const [addressId, setAddressId] = useState(null);
  const [receiverName, setReceiverName] = useState(null);
  const [receiverTel, setReceiverTel] = useState(null);
  const [zipcode, setZipcode] = useState(null);
  const [detail, setDetail] = useState(null);
  const [memo, setMemo] = useState(null);

  // 상품 요약 (임시)
  const [productInfo] = useState({
    thumbnailUrl: "/images/default-product.jpg",
    productName: "LG 퓨리케어 360° 공기청정기",
    planType: planId === "1" ? "구매" : "렌탈",
    originalPrice: 2100000,
    discountedPrice: 1254000,
  });

  const [products, setProducts] = useState({});

  useEffect(() => {
    axios.get(`/api/product`).then(
      res => setProducts(res.data))
    console.log(products);
  },[])






  // 주소 선택 모달 핸들러
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

  // 주문 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!receiverName || !receiverTel || !zipcode || !detail) {
      alert("배송 정보를 모두 입력해주세요.");
      return;
    }

    createOrderMutation.mutate({
      data: {
        // 카트 아이템 사용 시
        cartItemIds: cartItemList,

        // 배송지
        addressId
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
                  disabled
                  onChange={(e) => setReceiverName(e.target.value)}
                  className="border rounded w-full p-2 mt-1"
                />
              </div>

              <div>
                <label>연락처 *</label>
                <input
                  value={receiverTel}
                  disabled
                  onChange={(e) => setReceiverTel(e.target.value)}
                  className="border rounded w-full p-2 mt-1"
                />
              </div>

              <div>
                <label>우편번호 *</label>
                <input
                  value={zipcode}
                  disabled
                  onChange={(e) => setZipcode(e.target.value)}
                  className="border rounded w-full p-2 mt-1"
                />
              </div>

              <div>
                <label>상세 주소 *</label>
                <input
                  value={detail}
                  disabled
                  onChange={(e) => setDetail(e.target.value)}
                  className="border rounded w-full p-2 mt-1"
                />
              </div>

              <div>
                <label>배송 메모</label>
                <input
                  value={memo}
                  disabled
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
                  주문하기
              </Button>
            </form>
          </div>
        </div>

        {/* 오른쪽: 금액 요약 */}
        <div className="border rounded-lg shadow-md bg-white p-5 h-fit sticky top-6">
          <h2 className="font-semibold text-lg border-b pb-2 mb-3">결제 요약</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between font-bold text-md">
              <span>구매 금액</span>
              <span>{productInfo.originalPrice.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between font-bold text-md">
              <span>렌탈 금액</span>
              <span className="text-gray-700">
                -
                {(
                  productInfo.originalPrice - productInfo.discountedPrice
                ).toLocaleString()}
                원
              </span>
            </div>
            <div className="flex justify-between font-bold text-md">
              <span>보증금</span>
              <span className="text-gray-700">
                -
                {(
                  productInfo.originalPrice - productInfo.discountedPrice
                ).toLocaleString()}
                원
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2">
              <span>총 주문금액</span>
              <span>{productInfo.discountedPrice.toLocaleString()}원</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
