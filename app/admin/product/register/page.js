"use client";
import { useState } from "react";
import AdminProductRegister from "@/components/product/AdminProductRegister";
import axios from "axios";

export default function AdminProductRegisterForm() {
    // 비어있는 초기 상태 (값 들어가는지 테스트용)
    const [product, setProduct] = useState({
        productName: "",
        description: "",
        price: "",
        productCategory: "",
        modelName: "",
        stock: "",
        tags: {},
        attach: null,
        attachList: [],
    });

    const handleSubmit = async () => {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_SPRING_API_BASE_URL;
            const token = localStorage.getItem("accessToken");

            // 가격, 재고 숫자로 변환
            const payload = {
                ...product,
                price: Number(product.price),
                stock: Number(product.stock),
            };

            console.log("상품 등록 요청 데이터 ↓↓↓");
            console.log(JSON.stringify(payload, null, 2));

            const res = await axios.post(`${baseUrl}/api/admin/product`, payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("상품 등록 완료!");
            console.log("등록 성공:", res.data);

        } catch (err) {
            console.error("상품 등록 실패:", err);
            alert("상품 등록에 실패했습니다");
        }
    };

    return (
      <div className="p-4">

          {/* AdminProductRegister에 전달 */}
          <AdminProductRegister
            product={product}
            handleSubmit={handleSubmit}
            setProduct={setProduct}
          />
      </div>
    );
}
