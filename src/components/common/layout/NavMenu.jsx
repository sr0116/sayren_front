"use client";
import Link from "next/link";


// 상단 메뉴 (Product, Rental, Review, Support, B2B)
// layout="horizontal" → PC용
// layout="vertical" → 모바일 드롭다운용

const navItems = [
  { label: "Product", href: "/product", hasMegaMenu: true },
  { label: "Rental", href: "/rental", hasMegaMenu: true },
  { label: "Review", href: "/board/review" },
  { label: "Support", href: "/board/support" },
  // { label: "B2B", href: "#" },
];

export default function NavMenu({layout = "horizontal"}) {
  const base =
      layout === "horizontal"
          ? "hidden md:flex space-x-6 text-sm font-medium text-gray-700 h-full items-center"
          : "space-y-2 text-sm";

  return (
      <nav className={base}>
        {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="block">
              {item.label}
            </Link>
        ))}
      </nav>
  );
}
