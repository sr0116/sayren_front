"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const menuGroups = [
  {
    items: [
      { name: "대시보드", href: "/mypage" },
    ],
  },
  {
    title: "회원",
    items: [
      { name: "이메일 인증", href: "/mypage/emailverify" },
      { name: "휴대폰 번호 수정", href: "/mypage/telmodify" },
      { name: "소셜 연동 관리", href: "/mypage/sociallink" },
      { name: "회원정보 수정", href: "/mypage/usermodify" },
    ],
  },
  {
    title: "구독 / 결제",
    items: [
      { name: "주문 내역", href: "/mypage/orders" },
      { name: "포인트/쿠폰", href: "/mypage/benefits" },
    ],
  },
  {
    title: "문의 / 댓글",
    items: [
      { name: "문의 내역", href: "/mypage/posts" },
      { name: "내 댓글", href: "/mypage/replies" },
    ],
  },
];

export default function MyMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const renderLinks = () =>
    menuGroups.map((group, i) => (
      <div key={i} className="mb-4">
        <h3 className="text-sm font-bold text-gray-500 mb-3">{group.title}</h3>
        <div className="flex flex-col ">
          {group.items.map((menu) => {
            const isActive = pathname === menu.href;
            return (
              <Link
                key={menu.href}
                href={menu.href}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-gray-900 text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setOpen(false)}
              >
                {menu.name}
              </Link>
            );
          })}
        </div>
      </div>
    ));

  return (
    <div>
      {/* 모바일 전용 버튼 */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg w-full justify-between text-gray-700 cursor-pointer"
        >
          <span>메뉴</span>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* 데스크탑 메뉴 */}
      <nav className="hidden md:block">{renderLinks()}</nav>

      {/* 모바일 드롭다운 */}
      {open && (
        <nav className="flex flex-col mt-2 md:hidden border rounded-lg p-4 bg-white shadow">
          {renderLinks()}
        </nav>
      )}
    </div>
  );
}
