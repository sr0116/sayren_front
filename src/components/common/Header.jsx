"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const handleScroll = () => setIsScrolled(window.scrollY > 80);

    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200">
        {/* 상단 바 (PC 전용, 스크롤 전용) */}
        {!isMobile && !isScrolled && (
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 h-12 text-xs text-gray-600">
              <div className="flex items-center">
                <Link href="/public">
                  <div className="relative h-8 w-[120px] min-w-[120px] flex-shrink-0 flex items-center cursor-pointer">
                    <Image
                        src="/image/Logo.svg"
                        alt="SAYREN Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                  </div>
                </Link>
              </div>
              <div className="flex items-center space-x-6">
                <a href="#">회원가입</a>
                <a href="/member/login">로그인</a>
                <a href="#">로그아웃</a>
                <a href="#">마이페이지</a>
                <User className="w-4 h-4 text-gray-700" />
              </div>
            </div>
        )}

        {/* 하단 바 */}
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 h-12">
          <div className="flex items-center space-x-6 h-full">
            {(isMobile || isScrolled) && (
                <div className="flex items-center">
                  <Link href="/public">
                    {/* Symbol → scale-90 적용 */}
                    <div className="relative h-8 w-[32px] min-w-[32px] flex-shrink-0 flex items-center cursor-pointer scale-90">
                      <Image
                          src="/image/Symbol.svg"
                          alt="SAYREN Symbol"
                          fill
                          className="object-contain"
                          priority
                      />
                    </div>
                  </Link>
                </div>
            )}
            <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700 h-full items-center">
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
