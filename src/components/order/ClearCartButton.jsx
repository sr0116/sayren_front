"use client";

import Button from "@/components/common/Button";
import { useClearCartMutation } from "@/api/cartApi";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "@/store/modalSlice";
import { queryClient } from "@/lib/queryClient";

export default function ClearCartButton() {
    const dispatch = useDispatch();

    const clearCartMutation = useClearCartMutation({
        onSuccess: (res) => {

            const status = res?.status;
            const data = res?.data;

            // 204 or 빈 data 도 성공으로 간주
            if (status === 204 || !data || data === "") {
                queryClient.invalidateQueries(["cart"]);
                dispatch(
                    openModal({
                        content: (
                            <div className="flex flex-col justify-center items-center gap-4">
                                <p>장바구니를 모두 비웠습니다.</p>
                                <Button variant="primary" onClick={() => dispatch(closeModal())}>
                                    확인
                                </Button>
                            </div>
                        ),
                    })
                );
                return;
            }


            if (data?.message === "success") {
                queryClient.invalidateQueries(["cart"]);
                dispatch(
                    openModal({
                        content: (
                            <div className="flex flex-col justify-center items-center gap-4">
                                <p>장바구니를 모두 비웠습니다.</p>
                                <Button variant="primary" onClick={() => dispatch(closeModal())}>
                                    확인
                                </Button>
                            </div>
                        ),
                    })
                );
            }
        },

        onError: (err) => {
            console.error("장바구니 비우기 오류:", err);
            dispatch(
                openModal({
                    content: (
                        <div className="flex flex-col justify-center items-center gap-4">
                            <p>장바구니 비우기에 실패했습니다.</p>
                            <p>잠시 후 다시 시도해주세요.</p>
                            <Button variant="primary" onClick={() => dispatch(closeModal())}>
                                확인
                            </Button>
                        </div>
                    ),
                })
            );
        },
    });

    const handleClearCart = (e) => {
        e.preventDefault();
        clearCartMutation.mutate(); // body 없음 → 그대로 호출
    };

    return (
        <Button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleClearCart}
            variant="primary"
        >
            장바구니 비우기
        </Button>
    );
}
