"use client";
import { useApiQuery } from "@/hooks/useApi";
import { usePageParams } from "@/hooks/usePageParams";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@/components/common/Button";
import Pagination from "@/components/common/Pagination";
import AdminApprovedProductDetailModal from "@/components/product/AdminApprovedProductDetailModal";


export default function ApprovedProductPage() {
    const [products, setProducts] = useState([]);

    const { pageParams } = usePageParams();

    const [selectedProduct, setSelectedProduct] = useState(null);

    // 승인 완료된 상품 목록 (페이지네이션)
    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useApiQuery(
        ["approvedProducts", pageParams.page, pageParams.size],
        "/api/admin/product/approved",
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
    useEffect(() => {
        if (data?.list) {
            setProducts(data.list);
        }
    }, [data]);

    // 삭제(비활성화)
    const handleDelete = async (id) => {
        if (!confirm("정말 삭제하시겠습니까?")) return;
        try {
            await axios.post(`/api/admin/product/cancel/${id}`);
            alert("상품이 삭제(비활성화) 되었습니다.");
            refetch();
        } catch (err) {
            console.error("삭제 중 오류:", err);
        }
    };

    if (isLoading) return <p className="p-8">로딩중...</p>;
    if (isError) return <p className="p-8 text-red-500">에러 발생!</p>;

    const productList = data?.list || [];


    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">등록 완료 상품 목록</h1>

            {products.length === 0 ? (
                <p>현재 승인된 상품이 없습니다.</p>
            ) : (
                <>
                    <div className="space-y-3">
                        {products.map((p) => (
                            <div
                                key={p.productId}
                                onClick={() => setSelectedProduct(p.productId)}  // 상세 모달창
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
                                        <h2 className="font-semibold text-base text-gray-900">
                                            {p.productName}
                                        </h2>
                                        <p className="text-gray-600 text-sm">{p.modelName}</p>
                                        <p className="text-gray-500 text-xs mt-1">
                                            카테고리: {p.productCategory}
                                        </p>
                                    </div>
                                </div>

                                {/* 오른쪽: 삭제 버튼 */}
                                <div className="flex justify-end items-center h-28">
                                    <Button
                                        variant="secondary"
                                        className="!w-[150px] !h-[44px] text-sm font-medium rounded-md"
                                        onClick={() => handleDelete(p.productId)}
                                    >
                                        상품 삭제
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 페이지네이션 */}
                    <Pagination data={data} />
                </>
            )}

            {/*상세보기 모달창*/}
            {selectedProduct && (
                <AdminApprovedProductDetailModal
                    productId={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onApprove={handleDelete}
                />
            )}
        </div>
    );
}
