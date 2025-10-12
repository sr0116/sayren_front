"use client";
import { useState } from "react";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

export default function ProductPreviewModal({ product }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                variant="outline"
                className="!w-[120px]"
                onClick={() => setOpen(true)}
            >
                상세보기
            </Button>

            {open && (
                <Modal onClose={() => setOpen(false)} title="상품 상세 미리보기">
                    <div className="p-4 space-y-4">
                        <img
                            src={product.thumbnailUrl}
                            alt={product.productName}
                            className="w-full h-[400px] object-cover rounded-lg shadow"
                        />

                        <div>
                            <h2 className="text-xl font-bold">{product.productName}</h2>
                            <p className="text-gray-600">{product.modelName}</p>
                            <p className="text-gray-500">
                                카테고리: {product.productCategory}
                            </p>
                            <p className="mt-4 whitespace-pre-wrap text-sm text-gray-700">
                                {product.description}
                            </p>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <Button
                                variant="secondary"
                                onClick={() => setOpen(false)}
                            >
                                닫기
                            </Button>
                            <Button
                                onClick={() => handleApprove(product.productId)}
                                className="bg-gray-800 text-white hover:bg-gray-900"
                            >
                                등록 승인
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}
