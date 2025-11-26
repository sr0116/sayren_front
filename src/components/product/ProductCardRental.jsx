"use client";
import Image from "next/image";
import {useToggleLikeMutation} from "@/api/likeApi";
import {useState} from "react";
import {Heart} from "lucide-react";
import Link from "next/link";
import {calcRentalPrice} from "@/utils/CalcRentalPrice";

export default function ProductCardRental({product}) {
  const {
    thumbnailUrl,
    productName,
    price,
    modelName,
    tags = [],
    category,
    boardId,
    likeCount = 0,
    liked = false,
  } = product || {};

  const DEFAULT_MONTH = 36;
  const {monthlyFee} = calcRentalPrice(price, DEFAULT_MONTH);

  const [isLiked, setIsLiked] = useState(liked);
  const [count, setCount] = useState(likeCount);

  const {mutate: toggleLike} = useToggleLikeMutation({
    onSuccess: (data) => {
      setIsLiked(data.liked ?? !isLiked);
      setCount(data.likeCount);
    },
    onError: () => alert("로그인이 필요합니다."),
  });

  const handleLikeClick = (e) => {
    e.stopPropagation();
    toggleLike({data: {boardId}});
  };

  return (
      <div
          className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 cursor-pointer flex flex-col h-[430px] relative">

        {/* 이미지 */}
        <div className="relative w-full h-45 md:h-50 lg:h-65 shrink-0 overflow-hidden rounded-t-2xl">
          {thumbnailUrl ? (
              <img
                  src={thumbnailUrl}
                  alt={productName}
                  className="object-cover w-full h-full"
              />
          ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                No Image
              </div>
          )}

          {/* 카테고리 태그 */}
          {category && (
              <span
                  className="
              absolute top-2 left-2
              bg-black/70 text-white text-xs font-medium
              px-2 py-1 rounded-md
              max-w-[150px] block
              line-clamp-1
            "
              >
            {category}
          </span>
          )}

          {/* 찜 버튼 */}
          <button
              onClick={handleLikeClick}
              className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full
            bg-black/30 hover:bg-black/50 transition text-white z-20"
          >
            <Heart
                size={20}
                fill={isLiked ? "#ff0066" : "none"}
                stroke={isLiked ? "#ff0066" : "#fff"}
                strokeWidth={2}
            />
          </button>
        </div>

        {/* 본문 */}
        <div className="p-4 flex-1 flex flex-col justify-between overflow-visible">

          {/* TAG 영역 */}
          <div className="relative group mb-2">

            {/* 기본 2줄 + ... */}
            <div
                className="
      text-xs text-gray-500 leading-4
      overflow-hidden line-clamp-2
      max-h-[38px]
      cursor-pointer
    "
            >
              {tags.map((tag, i) => (
                  <span key={i} className="mr-2 whitespace-nowrap">
        #{tag.split("#")[1] ?? tag}
      </span>
              ))}
            </div>

            {/* ⭐ 툴팁 (Hover 시 등장) */}
            <div
                className="
      absolute left-0 mt-1
      hidden group-hover:block
      z-50

      bg-white text-gray-800 text-xs
      border border-gray-300
      shadow-lg rounded-md
      p-2
      w-max max-w-[260px]

      whitespace-normal
    "
            >
              {tags.map((tag, i) => (
                  <span key={i} className="mr-2 whitespace-nowrap">
        #{tag.split("#")[1] ?? tag}
      </span>
              ))}
            </div>
          </div>


          {/* 제품명 영역 전체를 group으로 감싼다 */}
          <div className="relative group">
            <Link key={product.productId} href={`/rental/${product.productId}`}>
              {/* 기본: 1줄 + ... */}
              <h3 className="font-semibold text-base line-clamp-1 cursor-pointer">
                {productName}
              </h3>
            </Link>

            {/* ⭐ Hover Tooltip */}
            <div
                className="
      absolute left-0 mt-1
      hidden group-hover:block
      z-50

      bg-white text-gray-800 text-xs
      border border-gray-300
      shadow-lg rounded-md
      p-2
      w-max max-w-[260px]

      whitespace-normal
    "
            >
              {productName}
            </div>
          </div>


          <span className="text-sm text-gray-600">{modelName}</span>

          <div className="mt-2">
            <p className="text-lg font-bold text-[#ff0066] line-clamp-1">
              월 {monthlyFee.toLocaleString()}원
            </p>
            <p className="text-gray-400 text-xs">36개월 기준</p>
          </div>
        </div>
      </div>
  );
}
