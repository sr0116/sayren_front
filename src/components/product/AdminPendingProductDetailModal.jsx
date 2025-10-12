"use client";
import { useApiQuery } from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import axios from "axios";
import Button from "@/components/common/Button";


export default function AdminProductDetailViewModal({ productId, onClose, onApprove }) {
    const router = useRouter();

    const { data: product, isLoading, isError } = useApiQuery(
        ["adminProductDetail", productId],
        `/api/admin/product/${productId}`
    );

    if (isLoading) return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[600px]">로딩중...</div>
        </div>
    );
    if (isError) return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[600px]">데이터 불러오기 실패</div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-[600px] max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">상품 상세 보기</h2>

                {/* 썸네일 */}
                <div className="w-full h-[250px] rounded-lg overflow-hidden bg-gray-100 mb-4">
                    {product.thumbnailUrl ? (
                        <img
                            src={product.thumbnailUrl}
                            alt={product.productName}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full text-gray-400">
                            No Image
                        </div>
                    )}
                </div>

                {/* 상품 정보 */}
                <div className="space-y-2 text-sm">
                    <p><strong>상품명:</strong> {product.productName}</p>
                    <p><strong>모델명:</strong> {product.modelName}</p>
                    <p><strong>카테고리:</strong> {product.productCategory}</p>
                    <p><strong>가격:</strong> {product.price?.toLocaleString()}원</p>
                    <div
                        className="text-gray-700 whitespace-pre-wrap mt-2"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                </div>

                {/* 버튼 구역 */}
                <div className="flex justify-end gap-3 mt-6">
                    <Button
                        variant="secondary"
                        className="!w-[120px]"
                        onClick={() => router.push(`/admin/product/${productId}/edit`)} // 수정 페이지 이동
                    >
                        수정하기
                    </Button>

                    <Button
                        variant="primary"
                        className="!w-[120px]"
                        onClick={(e) => {
                            e.stopPropagation();
                            onApprove(productId)}}
                    >
                        승인하기
                    </Button>

                    <Button
                        variant="outline"
                        className="!w-[100px]"
                        onClick={onClose}
                    >
                        닫기
                    </Button>
                </div>
            </div>
        </div>
    );
}
