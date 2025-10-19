"use client";
import Image from "next/image";
import {useToggleLikeMutation} from "@/api/likeApi";
import {useState} from "react";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function ProductCardRental({ product }) {
  const {
    thumbnailUrl,
    productName,
    price,
    modelName,
    tags,
    category,
    boardId,
    likeCount,
    liked = false,
  } = product || {};

  const monthlyPrice = Math.round(price / 36 * 1.005);

  const [isLiked, setIsLiked] = useState(liked);
  const [count, setCount] = useState(likeCount);

  const { mutate: toggleLike } = useToggleLikeMutation({
    onSuccess: (data) => {
      console.log("❤️ 좋아요 성공:", data);
      setIsLiked(data.liked ?? !isLiked);
      setCount(data.likeCount);
    },
    onError: (err) => {
      console.error("좋아요 실패:", err);
      alert("로그인이 필요합니다.");
    },
  });

  const handleLikeClick = (e) => {
    e.stopPropagation(); // 상품 상세로 넘어가는 클릭 막기
    toggleLike({ data: { boardId } });
  };

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


        {/* 카테고리 태그 */}
        {category && (
            <span className="absolute top-2 left-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-md">
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

          <Link key={product.productId} href={`/rental/${product.productId}`}>
            <h3 className="font-semibold text-base line-clamp-1">
              {productName}
            </h3>
          </Link>

          <span className=" text-sm text-gray-600 mt-1">{modelName}</span>
        </div>

        <div className="mt-2">
          <p className="text-lg font-bold text-[#ff0066] line-clamp-1">
            월 {monthlyPrice.toLocaleString()}원
          </p>
          <p className="text-gray-400">36개월 기준</p>
        </div>
      </div>
    </div>
  );
}
