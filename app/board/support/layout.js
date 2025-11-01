"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FaqPage from "@/app/board/support/faq/page";

export default function SupportLayout({ children }) {
  const pathname = usePathname();

  // 사이드바 메뉴 정의
  const menus = [
    { name: "자주 묻는 질문", path: "/board/support/faq" },
    { name: "문의하기", path: "/board/support/qna" },
    { name: "공지사항", path: "/board/support/notice" },
  ];

  return (
    <div className="flex max-w-6xl mx-auto py-8">
      {/* 사이드바 */}
      <aside className="w-48 pr-6 pl-3 text-center">
        <h2 className="text-2xl font-bold mb-6">고객지원</h2>
        <nav className="space-y-2">
          {menus.map((menu) => (
            <Link
              key={menu.path}
              href={menu.path}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                pathname.startsWith(menu.path)
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {menu.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 pl-6">{children}</main>
    </div>
  );
}
