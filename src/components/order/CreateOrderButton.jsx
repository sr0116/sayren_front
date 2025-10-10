"use client";

import Button from "@/components/common/Button";
import { useCreateOrderMutation } from "@/api/orderApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "@/store/modalSlice";

export default function CreateOrderButton({ addressId }) {
    const router = useRouter();
    const dispatch = useDispatch();

    const createOrderMutation = useCreateOrderMutation({
        onSuccess: (data) => {
            dispatch(openModal({
                content: (
                    <div className="flex flex-col justify-center items-center gap-4">
                        <p>주문이 성공적으로 생성되었습니다!</p>
                        <Button variant="primary" onClick={() => {
                            dispatch(closeModal());
                            router.push(`/order/history/${data.orderId}`);
                        }}>
                            주문 내역 보기
                        </Button>
                    </div>
                )
            }));
        },
        onError: (err) => {
            dispatch(openModal({
                content: (
                    <div className="flex flex-col justify-center items-center gap-4">
                        <p>주문 생성 실패</p>
                        <p>잠시 후 다시 시도해주세요.</p>
                        <Button variant="primary" onClick={() => dispatch(closeModal())}>
                            확인
                        </Button>
                    </div>
                )
            }));
        },
    });

    const handleClick = () => {
        createOrderMutation.mutate({ params: { addressId } });
    };

    return (
        <Button
            variant="primary"
            onClick={handleClick}
            disabled={createOrderMutation.isLoading}
        >
            {createOrderMutation.isLoading ? "처리 중..." : "바로 구매"}
        </Button>
    );
}
