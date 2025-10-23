"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import MegaMenuPanel from "@/components/test_components/MegaMenuPanel";

const navItems = [
  { label: "Product", href: "/product", hasMegaMenu: true },
  { label: "Rental", href: "#" },
  { label: "Review", href: "/board/review" },
  { label: "Support", href: "/board/support" },
  { label: "B2B", href: "#" },
];

export default function NavMenu({ layout = "horizontal", isMobile, isScrolled }) {
  const [hoverItem, setHoverItem] = useState(null);
  const timeoutRef = useRef(null);

  const handleEnter = (label) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoverItem(label);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setHoverItem(null), 200);
  };

  const base =
      layout === "horizontal"
          ? "hidden md:flex gap-8 text-sm font-medium text-gray-700 items-center relative"
          : "space-y-2 text-sm";

  return (
      <nav className={base}>
        {navItems.map((item) => (
            <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.hasMegaMenu && handleEnter(item.label)}
                onMouseLeave={() => item.hasMegaMenu && handleLeave()}
            >
              <Link href={item.href} className="block py-3 hover:text-black">
                {item.label}
              </Link>

              {/* MegaMenu Panel (PC 전용) */}
              {!isMobile && item.hasMegaMenu && hoverItem === item.label && (
                  <div
                      className={`fixed left-0 ${
                          isScrolled ? "top-[49px]" : "top-[96px]"
                      } w-screen z-40`}
                      onMouseEnter={() => handleEnter(item.label)}
                      onMouseLeave={handleLeave}
                  >
                    <div className="bg-white shadow-md w-full">
                      <div className="max-w-7xl mx-auto px-6 py-8">
                        <MegaMenuPanel />
                      </div>
                    </div>
                  </div>
              )}
            </div>
        ))}
      </nav>
  );
}
