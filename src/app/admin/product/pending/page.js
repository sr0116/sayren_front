"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@/components/common/Button";

export default function AdminPendingPage() {
    // const [pendingProducts, setPendingProducts] = useState([]);
    //
    // // 승인 대기 상품 목록 불러오기
    // const fetchPendingProducts = async () => {
    //     try {
    //         const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/products}`);
    //         setPendingProducts(res.data);
    //     } catch (err) {
    //         console.error("승인 대기 상품 불러오기 실패:", err);
    //     }
    // };
    //
    // // 승인 버튼 클릭 시
    // const handleApprove = async (id) => {
    //     try {
    //         await axios.post(`/api/admin/products/use/${id}`);
    //         alert("상품이 승인(사용 가능) 상태로 전환되었습니다!");
    //
    //         // 목록에서 승인된 상품 제거
    //         setPendingProducts((prev) => prev.filter((p) => p.productId !== id));
    //     } catch (err) {
    //         console.error("승인 처리 중 오류 발생:", err);
    //         alert("승인 처리 중 오류 발생!");
    //     }
    // };
    //
    // useEffect(() => {
    //     fetchPendingProducts();
    // }, []);
    //
    // return (
    //   <div className="p-8">
    //       <h1 className="text-2xl font-bold mb-6">승인 대기 상품 목록</h1>
    //
    //       {pendingProducts.length === 0 ? (
    //         <p>현재 승인 대기 중인 상품이 없습니다.</p>
    //       ) : (
    //         pendingProducts.map((p) => (
    //           <div
    //             key={p.productId}
    //             className="border rounded-lg p-4 mb-3 flex justify-between items-center"
    //           >
    //               <div>
    //                   <h2 className="font-semibold text-lg">{p.productName}</h2>
    //                   <p className="text-gray-600">{p.modelName}</p>
    //                   <p className="text-sm text-gray-500">
    //                       카테고리: {p.productCategory}
    //                   </p>
    //               </div>
    //               <Button onClick={() => handleApprove(p.productId)}>
    //                   등록 승인
    //               </Button>
    //           </div>
    //         ))
    //       )}
    //   </div>
    // );
}
