"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@/components/common/Button";

export default function ApprovedProductPage() {
    const [products, setProducts] = useState([]);

    const fetchApprovedProducts = async () => {
        try {
            const res = await axios.get("/api/admin/product/approved");
            setProducts(res.data);
        } catch (err) {
            console.error("승인된 상품 불러오기 실패:", err);
        }
    };

    // 영구 삭제
    const handleDelete = async (id) => {
        if (!confirm("정말 삭제하시겠습니까?")) return;
        try {
            await axios.post(`/api/admin/product/cancel/${id}`);
            alert("상품이 삭제(비활성화) 되었습니다.");
            fetchApprovedProducts();
        } catch (err) {
            console.error("삭제 중 오류:", err);
        }
    };


    useEffect(() => {
        fetchApprovedProducts();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">등록 완료 상품 목록</h1>

            {products.length === 0 ? (
                <p>현재 승인된 상품이 없습니다.</p>
            ) : (
                products.map((p) => (
                    <div key={p.productId} className="border rounded-lg p-4 mb-3 flex justify-between items-center">
                        <div>
                            <h2 className="font-semibold text-lg">{p.productName}</h2>
                            <p className="text-gray-600">{p.modelName}</p>
                            <p className="text-sm text-gray-500">카테고리: {p.productCategory}</p>
                        </div>

                        <Button variant="secondary" onClick={() => handleDelete(p.productId)}>
                            상품 삭제
                        </Button>
                    </div>
                ))
            )}
        </div>
    );
}
