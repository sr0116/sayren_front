"use client";
import Link from "next/link";


// 상단 메뉴 (Product, Rental, Review, Support, B2B)
// layout="horizontal" → PC용
// layout="vertical" → 모바일 드롭다운용

const navItems = [
  {label: "Product", href: "#"},
  {label: "Rental", href: "#"},
  {label: "Review", href: "#"},
  {label: "Support", href: "#"},
  {label: "B2B", href: "#"},
];

export default function NavMenu({layout = "horizontal"}) {
  const base =
      layout === "horizontal"
          ? "hidden md:flex gap-8 text-sm font-medium text-gray-700 items-center"
          : "space-y-2 text-sm";

  return (
      <nav className={base}>
        {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="block py-3">
              {item.label}
            </Link>
        ))}
      </nav>
  );
}
