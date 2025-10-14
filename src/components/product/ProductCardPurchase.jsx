"use client";

export default function ProductCardPurchase({ product }) {
  const {
    thumbnailUrl,
    productName,
    price,
    modelName,
    tags,
    category,
  } = product || {};

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden cursor-pointer flex flex-col h-[430px]">
      {/* 이미지 */}
      <div className="relative w-full h-45 md:h-50 lg:h-65 shrink-0">
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
        {category && (
          <span className="absolute top-2 left-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-md">
            {category}
          </span>
        )}
      </div>

      {/* 본문 */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
          {tags.length > 0 && tags.map((tag, i) => (
              <p key={`${tag}-${i}`}
                 className="text-xs text-gray-500">
                #{tag.split("#")[1]}
              </p>
            )
          )}
          </div>

          <h3 className="font-semibold text-base line-clamp-1">{productName}</h3>
          <span className=" text-sm text-gray-600 mt-1">{modelName}</span>
        </div>

        <div className="mt-2">
          <p className="text-lg font-bold text-[#ff0066] line-clamp-1">
            {price?.toLocaleString()}원
          </p>
        </div>
      </div>
    </div>
  );
}
