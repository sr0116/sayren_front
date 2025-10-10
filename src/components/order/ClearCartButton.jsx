"use client";

import Button from "@/components/common/Button";
import { useClearCartMutation } from "@/api/cartApi";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "@/store/modalSlice";
import { queryClient } from "@/lib/queryClient";

export default function ClearCartButton() {
    const dispatch = useDispatch();

    const clearCartMutation = useClearCartMutation({
        onSuccess: () => {
            dispatch(openModal({
                content: (
                    <div className="flex flex-col justify-center items-center gap-4">
                        <p>장바구니를 모두 비웠습니다.</p>
                        <Button variant="primary" onClick={() => dispatch(closeModal())}>
                            확인
                        </Button>
                    </div>
                )
            }));
            queryClient.invalidateQueries(["cart"]); //  캐시 갱신
        },
        onError: () => {
            dispatch(openModal({
                content: (
                    <div className="flex flex-col justify-center items-center gap-4">
                        <p>장바구니 비우기에 실패했습니다.</p>
                        <p>잠시 후 다시 시도해주세요.</p>
                        <Button variant="primary" onClick={() => dispatch(closeModal())}>
                            확인
                        </Button>
                    </div>
                )
            }));
        }
    });

    const handleClearCart = (e) => {
        e.preventDefault();
        clearCartMutation.mutate(); //  data 안 필요
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
