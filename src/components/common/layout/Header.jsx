"use client";

import {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import AuthNav from "@/components/common/layout/AuthNav";
import Logo from "@/components/common/layout/Logo";
import NavMenu from "@/components/common/layout/NavMenu";
import IconGroup from "@/components/common/layout/IconGroup";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // 리덕스에서 인증 상태와 사용자 정보 가져오기
  const {isAuthenticated, user} = useSelector((state) => state.auth);

  useEffect(() => {
    // 화면 크기 기준 모바일 여부 체크
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    // 스크롤 위치 기준으로 헤더 상태 업데이트
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    // 초기 실행
    checkMobile();

    // 이벤트 실행
    window.addEventListener("resize", checkMobile);
    window.addEventListener("scroll", handleScroll);

    // 언마운트 시 이벤트 해제
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200">
        {/* 상단바 (PC + 스크롤 전) */}
        {!isMobile && !isScrolled && (
            <div
                className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 h-12 text-xs text-gray-600">
              <Logo variant="full"/>
              <AuthNav isAuthenticated={isAuthenticated} user={user}/>
            </div>
        )}

        {/* 하단바 (PC/모바일 공통) */}
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 h-12">
          <div className="flex items-center space-x-6 h-full">
            {(isMobile || isScrolled) && <Logo variant="symbol"/>}
            <NavMenu layout="horizontal" />
          </div>
          <IconGroup
              isMobile={isMobile}
              isAuthenticated={isAuthenticated}
              onToggle={() => setIsOpen(!isOpen)}
          />
        </div>

        {/* 모바일 드롭다운 */}
        {isOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-2 text-sm">
              <AuthNav isAuthenticated={isAuthenticated} user={user}/>
              <div className="border-b"/>
              <NavMenu layout="vertical"  />
            </div>
        )}
      </header>
  );
}