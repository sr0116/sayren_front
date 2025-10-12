"use client";

import { useApiQuery } from "@/hooks/useApi";
import {useState} from "react";
import Pagination from "@/components/common/Pagination";
import { usePageParams } from "@/hooks/usePageParams";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import AdminPendingProductDetailModal from "@/components/product/AdminPendingProductDetailModal";

export default function AdminPendingPage() {
    const { pageParams } = usePageParams();
    const router = useRouter();

    const [selectedProduct, setSelectedProduct] = useState(null);


    // axios 대신 useApiQuery로 데이터 호출
    const { data: pendingProducts, isLoading, isError } = useApiQuery(
        ["pendingProducts", pageParams.page, pageParams.size],
        "/api/admin/product/pending",
        {
            params: pageParams,
            options: {
                keepPreviousData: true,
                staleTime: 0,
                cacheTime: 0,
                refetchOnWindowFocus: false,
                refetchOnReconnect: false,
            },
        }
    );

    // 로딩 및 에러 처리
    if (isLoading) return <p className="p-8">로딩중...</p>;
    if (isError) return <p className="p-8 text-red-500">에러 발생!</p>;


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

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">승인 대기 상품 목록</h1>

            {pendingProducts?.list?.length > 0 ? (
                <>
                    {/* 상품 목록 */}
                    <div className="space-y-3">
                        {pendingProducts.list.map((p) => (
                            <div
                                key={p.productId}
                                onClick={() => setSelectedProduct(p.productId)}  // 상품 모달 창
                                className="border rounded-lg p-4 flex items-center justify-between"
                            >
                                {/* 왼쪽: 썸네일 + 정보 */}
                                <div className="flex items-center gap-6">
                                    {/* 썸네일 이미지 */}
                                    <div className="w-28 h-28 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 shadow-sm">
                                        {p.thumbnailUrl ? (
                                            <img
                                                src={p.thumbnailUrl}
                                                alt={p.productName}
                                                className="w-full h-full object-cover block"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center w-full h-full text-xs text-gray-400">
                                                No Image
                                            </div>
                                        )}
                                    </div>

                                    {/* 텍스트 정보 */}
                                    <div className="flex flex-col">
                                        <h2 className="font-semibold text-base text-gray-900">{p.productName}</h2>
                                        <p className="text-gray-600 text-sm">{p.modelName}</p>
                                        <p className="text-gray-500 text-xs mt-1">
                                            카테고리: {p.productCategory}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-end items-center h-28">
                                    <Button
                                        className="!w-[150px] !h-[44px] text-sm font-medium rounded-md bg-gray-800 hover:bg-gray-900 text-white"
                                        onClick={() => handleApprove(p.productId)}
                                    >
                                        등록 승인
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 페이지네이션 */}
                    <Pagination data={pendingProducts} />
                </>
            ) : (
                <p>현재 승인 대기 중인 상품이 없습니다.</p>
            )}

            {/*상세보기 모달창*/}
            {selectedProduct && (
                <AdminPendingProductDetailModal
                    productId={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onApprove={handleApprove}
                />
            )}
        </div>

    );
}
