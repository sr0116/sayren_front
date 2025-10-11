"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Button from "@/components/common/Button";

export default function AdminPendingPage() {
    const [pendingProducts, setPendingProducts] = useState([]);
    const router = useRouter();

    // 승인 대기 목록 조회
    const fetchPendingProducts = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const res = await axios.get("/api/admin/product/pending", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = Array.isArray(res.data)
                ? res.data
                : Array.isArray(res.data.data)
                    ? res.data.data
                    : [];

            setPendingProducts(data);
        } catch (err) {
            console.error("승인 대기 상품 불러오기 실패:", err);
            setPendingProducts([]);
        }
    };

    // 상품 승인 처리
    const handleApprove = async (id) => {
        try {
            const token = localStorage.getItem("accessToken");

            await axios.post(
                `/api/admin/product/use/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("상품이 등록(활성화) 되었습니다");
            router.push("/admin/product/approved");
        } catch (err) {
            console.error("승인 처리 중 오류:", err);
            alert("승인 처리 실패! 다시 시도해주세요.");
        }
    };

    useEffect(() => {
        fetchPendingProducts();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">승인 대기 상품 목록</h1>

            {Array.isArray(pendingProducts) && pendingProducts.length > 0 ? (
                pendingProducts.map((p) => (
                    <div
                        key={p.productId}
                        className="border rounded-lg p-4 mb-3 flex justify-between items-center"
                    >
                        <div>
                            <h2 className="font-semibold text-lg">{p.productName}</h2>
                            <p className="text-gray-600">{p.modelName}</p>
                            <p className="text-sm text-gray-500">
                                카테고리: {p.productCategory}
                            </p>
                        </div>

                        <Button onClick={() => handleApprove(p.productId)}>
                            등록 승인
                        </Button>
                    </div>
                ))
            ) : (
                <p>현재 승인 대기 중인 상품이 없습니다.</p>
            )}
        </div>
    );
}
