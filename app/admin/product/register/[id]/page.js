// app/admin/product/register/[id]/page.jsx

"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "@/components/common/Button";

export default function AdminProductRegisterForm() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await axios.get(`/api/admin/product/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error("상품 상세 불러오기 실패:", err);
            }
        };
        fetchDetail();
    }, [id]);

    const handleSubmit = async () => {
        try {
            await axios.put(`/api/admin/product/${id}/approve`, product);
            alert("상품 등록 완료!");
        } catch (err) {
            console.error("등록 실패:", err);
            alert("등록 중 오류 발생!");
        }
    };

    if (!product) return <p>로딩 중...</p>;

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold mb-6">상품 등록 폼</h1>
            <input
                className="border rounded-md px-3 py-2 w-full"
                value={product.productName}
                onChange={(e) => setProduct({ ...product, productName: e.target.value })}
            />
            <textarea
                className="border rounded-md px-3 py-2 w-full h-32"
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
            />
            <Button
                onClick={handleSubmit}
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-md"
            >
                등록 완료
            </Button>
        </div>
    );
}
