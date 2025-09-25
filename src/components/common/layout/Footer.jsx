"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  const [open, setOpen] = useState(false);

  return (
    <footer className="bg-neutral-900 text-neutral-200 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:px-8 gap-8">
        {/* 상단 */}
        <div className="flex items-start justify-between w-full">
          <div className="w-full">
            <Image src="/image/whiteLogo.svg" alt="SAYREN Logo" width={120} height={120} className="mb-8"/>
            {/* 사업자 정보 */}
            <div className="mt-2">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full text-left font-semibold md:hidden cursor-pointer"
              >
                <span>세이렌 사업자 정보</span>
                <span>{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
              </button>

              <div
                className={`mt-2 text-sm space-y-1 ${
                  open ? "block" : "hidden md:block"
                }`}
              >
                <p>상호: 주식회사 세이렌 / 대표: 세이렌 팀</p>
                <p>주소: 서울특별시 강남구 테헤란로 123, 10층 (역삼동)</p>
                <p>사업자등록번호: 123-45-67890 / 통신판매번호: 제2025-서울강남-12345호</p>
                <p>이메일: sayren2025@gmail.com / 대표전화: 0000-0000</p>
              </div>
            </div>
          </div>

          {/* PC 전용 */}
          <div className="hidden md:flex items-center gap-4 text-neutral-400">
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <FaGithub className="w-7 h-7 hover:text-white" />
            </a>
          </div>
        </div>

        {/* 메뉴 링크 */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/about" className="hover:underline">회사소개</Link>
          <Link href="/notice" className="hover:underline">공지사항</Link>
          <Link href="/terms/service" className="hover:underline">이용약관</Link>
          <Link href="/terms/privacy" className="hover:underline font-semibold">
            개인정보 처리방침
          </Link>
          <Link href="/support" className="hover:underline">고객센터</Link>
        </div>

        {/* 하단 */}
        <div className="flex flex-col md:block gap-2">
          <div className="flex md:hidden justify-start text-neutral-400">
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <FaGithub className="w-7 h-7 hover:text-white" />
            </a>
          </div>

          {/* 카피라이트 */}
          <div className="text-left text-xs text-neutral-400 mt-4">
            © 2025 SAYREN All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
