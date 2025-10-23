"use client";
import Button from "@/components/common/Button";
import AddToCartButton from "@/components/order/AddToCartButton";

export default function ProductDetail({ product, productId }) {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* 상단: 썸네일 + 상품 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12">
        {/* 왼쪽: 대표 이미지 */}
        <div className="w-full">
          {product.thumbnailUrl ? (
            <img
              src={product.thumbnailUrl}
              alt={product.productName}
              width={600}
              height={600}
              className="rounded-lg shadow-md object-cover w-full"
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded">
              No Image
            </div>
          )}
        </div>

        {/* 오른쪽: 상품 정보 */}
        <div className="flex flex-col space-y-4">
          {/* 상품명 */}
          <h1 className="text-2xl font-bold">{product.productName}</h1>

          {/* 태그 */}
          {product.tags?.length > 0 && (
            <p className="text-gray-400 text-sm">
              {product.tags.map((tag, i) => (
                <span key={i} className="mr-2">#{tag}</span>
              ))}
            </p>
          )}

          {/* 카테고리 & 모델명 */}
          <p className="text-sm text-gray-500">
            {product.productCategory} | {product.modelName}
          </p>

          {/* 계약기간 */}
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">계약기간</p>
            <div className="flex gap-2">
              {[24, 36, 48].map((m) => (
                <button
                  key={m}
                  onClick={() => setContractMonths(m)}
                  className={`px-4 py-2 border rounded 
                    ${contractMonths === m ? "border-black font-bold" : "border-gray-300"}`}
                >
                  {m}개월
                </button>
              ))}
            </div>
          </div>


          {/* 렌탈 금액 */}
          <div className="mt-3">
            <span className="text-gray-400 line-through text-sm">{price?.toLocaleString()}원</span>
            <p className="text-lg font-bold text-[#ff0066] line-clamp-1">월 {rentalPrice?.toLocaleString()}원 (24개월)</p>
          </div>

          {/* 총 금액 */}
          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-800">
              총 금액:{" "}
              <span className="text-[#ff0066]">
                {product.price?.toLocaleString()}원
              </span>
            </p>
          </div>

          {/* 버튼 영역 */}
          <div className="flex gap-3 mt-2">
            <AddToCartButton productId={product.productId} planId={1}/>
            <Button className="bg-gray-800 text-white px-6 py-2 rounded">
              장바구니 담기
            </Button>
            <Button className="bg-[#ff0066] text-white px-6 py-2 rounded">
              구독 신청
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}
