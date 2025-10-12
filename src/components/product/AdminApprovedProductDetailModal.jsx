"use client";
import { useApiQuery } from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import axios from "axios";
import Button from "@/components/common/Button";


export default function AdminProductDetailViewModal({ productId, onClose, onApprove }) {
    const router = useRouter();

    const { data: product, isLoading, isError, refetch } = useApiQuery(
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

    // 삭제(비활성화)
    const handleDelete = async (id) => {
        if (!confirm("정말 삭제하시겠습니까?")) return;
        try {
            await axios.post(`/api/admin/product/cancel/${id}`);
            onClose();
            alert("상품이 삭제(비활성화) 되었습니다.");
            router.refresh();
        } catch (err) {
            console.error("삭제 중 오류:", err);
            alert("삭제 실패! 다시 시도해주세요");
        }
    };

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
                        className="!w-[100px] text-sm font-medium rounded-md"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(product.productId)}}
                    >
                        상품 삭제
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
