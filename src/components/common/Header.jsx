"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import {useSelector} from "react-redux";
import {LogoutButton} from "@/components/common/Button";
import {authActions} from "@/store/authStore";
import {usePathname} from "next/navigation";

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
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200">
        {/* 상단 바 (PC 전용, 스크롤 전용) */}
        {!isMobile && !isScrolled && (
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 h-12 text-xs text-gray-600">
              <div className="flex items-center">
                <Link href="/" >
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
                {isAuthenticated ? (
                  <div className="space-x-5 flex">
                    <p><strong>{user?.name}님</strong> 안녕하세요</p>
                    <Link href="/mypage" >마이페이지</Link>
                    <LogoutButton>로그아웃</LogoutButton>
                  </div>
                ) : (
                  <div className="space-x-5">
                    <Link href="/member/login" >로그인</Link>
                    <Link href="/member/signup" >회원가입</Link>
                  </div>
                )}

              </div>
            </div>
        )}

        {/* 하단 바 */}
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 h-12">
          <div className="flex items-center space-x-6 h-full">
            {(isMobile || isScrolled) && (
                <div className="flex items-center">
                  <Link href="/" >
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
              <Link href="#" >Product</Link>
              <Link href="#" >Rental</Link>
              <Link href="#" >Review</Link>
              <Link href="#" >Support</Link>
              <Link href="#" >B2B</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-5 h-full">
            <Search className="w-5 h-5 text-gray-700 cursor-pointer" />
            <ShoppingCart className="w-5 h-5 text-gray-700 cursor-pointer" />
            <Link href={isAuthenticated ? "/mypage" : "/member/login"}>
              <User className="w-5 h-5 text-gray-700 cursor-pointer" />
            </Link>
            {isMobile && (
                <button
                    className="p-1.5 rounded hover:bg-gray-100 cursor-pointer"
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
              {isAuthenticated ? (
                <div className="flex flex-col gap-2">
                  <Link href="/mypage">마이페이지</Link>
                  <LogoutButton>로그아웃</LogoutButton>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/member/login" >로그인</Link>
                  <Link href="/member/signup">회원가입</Link>
                </div>
              )}
              <div className="border-b border-gray-200 my-4"/>
              <div className="flex flex-col gap-2">
                <Link href="#" >Product</Link>
                <Link href="#" >Rental</Link>
                <Link href="#" >Review</Link>
                <Link href="#" >Support</Link>
                <Link href="#" >B2B</Link>
              </div>
            </div>
        )}
      </header>
  );
}
