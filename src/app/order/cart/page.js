"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import ClearCartButton from "@/components/order/ClearCartButton";
import { useCartItemsQuery } from "@/api/cartApi";

export default function Page() {
    const router = useRouter();
    const { data: items = [], isLoading, isError } = useCartItemsQuery();

    if (isLoading) return <p>로딩 중...</p>;
    if (isError) return <p>조회 실패...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">내 장바구니</h1>

            {items.length === 0 ? (
                <p className="text-gray-500">장바구니가 비어 있습니다.</p>
            ) : (
                <ul className="space-y-4">
                    {items.map((item) => (
                        <li key={item.cartItemId} className="flex justify-between border-b pb-2">
                            <span>{item.productName}</span>
                            <span>{item.price?.toLocaleString()}원</span>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-6 flex gap-3 justify-end">
                <ClearCartButton />
                {items.length > 0 && (
                    <Button
                        variant="primary"
                        onClick={() =>
                            router.push(
                                `/order/checkout/${items[0].productId}?planId=${items[0].orderPlanId}`
                            )
                        }
                    >
                        주문하기
                    </Button>
                )}
            </div>
        </div>
    );
}
