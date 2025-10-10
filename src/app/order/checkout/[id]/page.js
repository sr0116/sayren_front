"use client";

import { useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "@/store/modalSlice";
import { queryClient } from "@/lib/queryClient";
import Button from "@/components/common/Button";
import { useCreateOrderMutation } from "@/api/orderApi";

export default function CheckoutPage() {
    const router = useRouter();
    const { id } = useParams(); // 상품 ID
    const searchParams = useSearchParams();
    const planId = searchParams.get("planId");

    const dispatch = useDispatch();

    // 배송 입력값
    const [receiverName, setReceiverName] = useState("");
    const [receiverTel, setReceiverTel] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [detail, setDetail] = useState("");
    const [memo, setMemo] = useState("");

    // 주문 생성 Mutation
    const createOrderMutation = useCreateOrderMutation({
        onSuccess: (res) => {
            dispatch(openModal({
                content: (
                    <div className="flex flex-col justify-center items-center gap-4">
                        <p>주문이 정상적으로 생성되었습니다.</p>
                        <Button variant="primary" onClick={() => {
                            dispatch(closeModal());
                            router.push(`/order/history/${res.orderId}`);
                        }}>
                            주문 내역 보기
                        </Button>
                    </div>
                )
            }));
            queryClient.invalidateQueries(["orders"]);
        },
        onError: (err) => {
            console.error("주문 생성 실패:", err);
            dispatch(openModal({
                content: (
                    <div className="flex flex-col justify-center items-center gap-4">
                        <p>주문 생성에 실패했습니다.</p>
                        <Button variant="primary" onClick={() => dispatch(closeModal())}>
                            확인
                        </Button>
                    </div>
                )
            }));
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!receiverName || !receiverTel || !zipcode || !detail) {
            alert("배송 정보를 모두 입력해주세요.");
            return;
        }

        createOrderMutation.mutate({
            data: {
                addressId: 1, // 기본주소 (나중에 선택 UI 연동)
                receiverName,
                receiverTel,
                zipcode,
                detail,
                memo,
                productId: id,
                planId,
            },
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">주문/결제</h1>

            <div className="border rounded p-4 mb-6">
                <p>상품번호: {id}</p>
                <p>요금제: {planId === "1" ? "구매" : "렌탈"}</p>
            </div>

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

                <Button
                    type="submit"
                    variant="primary"
                    disabled={createOrderMutation.isLoading}
                >
                    {createOrderMutation.isLoading ? "주문 처리 중..." : "주문하기"}
                </Button>
            </form>
        </div>
    );
}
