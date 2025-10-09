"use client";
import Image from "next/image";

export default function ProductCardRental({ product }) {
  const {
    thumbnailUrl,
    productCategory,
    productName,
    modelName,
    price,
    rentalPrice,
    tags = [],
    deposit,
  } = product || {};

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden cursor-pointer flex flex-col h-[400px]">
      {/* 이미지 */}
      <div className="relative w-full h-40 md:h-45 lg:h-60 shrink-0">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={productName}
            className="object-cover w-full h-full "
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            No Image
          </div>
        )}
        {productCategory && (
          <span className="absolute top-2 left-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-md">
            {productCategory}
          </span>
        )}
      </div>

      {/* 본문 */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {tags.length > 0 && (
            <p className="text-xs text-gray-500 mb-2">#{tags.join(" #")}</p>
          )}

          <h3 className="font-semibold text-base line-clamp-1">{productName}</h3>
          <span className="text-sm text-gray-600 mt-1">{modelName}</span>

        </div>

        <div className="mt-3">
          {/*<span className="text-gray-400 line-through text-sm">{price?.toLocaleString()}원</span>*/}
          <p className="text-lg font-bold text-[#ff0066] line-clamp-1">월 {rentalPrice?.toLocaleString()}원 </p>
        </div>
      </div>
    </div>
  );
}
