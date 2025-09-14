"use client";

import { useState, useEffect } from "react";
import { Search, ShoppingCart, User, Menu } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
      <header className="w-full sticky top-0 z-50 bg-white border-b border-gray-200">
        {/* 상단 바 (PC 전용, 스크롤 전ㅇ[만) */}
        {!isMobile && !isScrolled && (
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 h-12 text-xs text-gray-600">
              <div className="text-lg font-extrabold tracking-tight text-gray-900">
                SAYREN
              </div>
              <div className="flex items-center space-x-6">
                <a href="#">회원가입</a>
                <a href="#">로그인</a>
                <a href="#">로그아웃</a>
                <a href="#">마이페이지</a>
                <User className="w-4 h-4 text-gray-700" />
              </div>
            </div>
        )}

        {/* 하단 바 */}
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 h-12">
          <div className="flex items-center space-x-8 h-full">
            {(isMobile || isScrolled) && (
                <div className="text-lg font-extrabold tracking-tight text-gray-900">
                  SAYREN
                </div>
            )}
            {/* 카테고리  */}
            <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-700 h-full items-center">
              <a href="#">Product</a>
              <a href="#">Rental</a>
              <a href="#">Review</a>
              <a href="#">Support</a>
              <a href="#">B2B</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4 h-full">
            <Search className="w-5 h-5 text-gray-700" />
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            {isMobile && (
                <button
                    className="p-1.5 rounded hover:bg-gray-100"
                    onClick={() => setIsOpen(!isOpen)}
                >
                  <Menu className="w-5 h-5 text-gray-700" />
                </button>
            )}
          </div>
        </div>

        {/* 모바일 드롭다운 */}
        {isOpen && (
            <div className="md:hidden bg-white border-t px-4 py-3 space-y-2 text-sm">
              <a href="#" className="block">Product</a>
              <a href="#" className="block">Rental</a>
              <a href="#" className="block">Review</a>
              <a href="#" className="block">Support</a>
              <a href="#" className="block">B2B</a>
              <hr />
              <a href="#" className="block">회원가입</a>
              <a href="#" className="block">로그인</a>
              <a href="#" className="block">마이페이지</a>
            </div>
        )}
      </header>
  );
}
