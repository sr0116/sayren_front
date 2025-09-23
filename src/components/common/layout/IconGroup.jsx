"use client";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import Link from "next/link";
import Button from "@/components/common/Button";


// IconGroup
// 헤더 우측 아이콘 모음 (검색, 장바구니, 유저, 햄버거)
// isMobile=true → 햄버거 버튼 표시

export default function IconGroup({ isMobile, onToggle, isAuthenticated }) {
  return (
      <div className="flex items-center">
        {/* 검색 아이콘 */}
        <Link href={"/"} className="p-3">
          <Search className="w-5 h-5 text-gray-700 cursor-pointer" />
        </Link>
        {/* 장바구니 아이콘 */}
        <Link href={"/"} className="p-3">
          <ShoppingCart className="w-5 h-5 text-gray-700 cursor-pointer" />
        </Link>
        {/* 유저 아이콘 (로그인 여부에 따라 링크 분기) */}
        <Link href={isAuthenticated ? "/mypage" : "/member/login"} className="p-3">
          <User className="w-5 h-5 text-gray-700 cursor-pointer" />
        </Link>

        {/* 모바일 전용 햄버거 버튼 */}
        {isMobile && (
            <Button
                type="button"
                variant="none"
                className="flex items-center justify-center px-3"
                onClick={onToggle}
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </Button>
        )}
      </div>
  );
}
