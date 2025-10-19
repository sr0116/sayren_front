"use client";

import Link from "next/link";

export default function CategorySection() {
  const categories = [
    { name: "정수기",img: "https://kiylab-bucket.s3.ap-northeast-2.amazonaws.com/2025/10/13/c7a482b0-1b76-49a4-a0dc-76ff68cab556.webp", href: "/product?category=정수기" },
    { name: "청소기", img: "https://kiylab-bucket.s3.ap-northeast-2.amazonaws.com/2025/10/13/841f62c3-0d20-4c1a-a269-780321fbc66b.webp", href: "/product?category=청소기" },
    { name: "의류건조기", img: "https://kiylab-bucket.s3.ap-northeast-2.amazonaws.com/2025/10/13/d5872fb3-526d-4ab1-9952-030ac8806d60.webp", href: "/product?category=의류건조기"},
    { name: "에어컨", img: "https://kiylab-bucket.s3.ap-northeast-2.amazonaws.com/2025/10/13/3a1f29a7-0b90-459c-b4e5-d59e5b014b03.webp", href: "/product?category=에어컨" },
    { name: "세탁기", img: "https://kiylab-bucket.s3.ap-northeast-2.amazonaws.com/2025/10/13/783d632f-2654-4606-afa8-523f218d7bb4.webp", href: "/product?category=세탁기" },
    { name: "냉장고", img: "https://kiylab-bucket.s3.ap-northeast-2.amazonaws.com/2025/10/13/fcdbd16b-1787-404d-ac79-654bcc5cec42.webp", href: "/product?category=냉장고" },
    { name: "TV", img: "https://kiylab-bucket.s3.ap-northeast-2.amazonaws.com/2025/10/14/a70eb502-20e5-4fe1-92ba-9fffff03c701.webp", href: "/product?category=TV" },
    { name: "노트북", img: "https://kiylab-bucket.s3.ap-northeast-2.amazonaws.com/2025/10/14/18d829ae-f9ca-446d-b8e4-77f9d6ae009b.webp", href: "/product?category=노트북" },
  ];

  return (
      <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-8">
              {categories.map((cat, i) => (
                  <Link
                      key={i}
                      href={cat.href ?? "#"}
                      className="flex flex-col items-center text-center cursor-pointer group"
                  >
                      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
                          <img
                              src={cat.img}
                              alt={cat.name}
                              className="w-full h-full object-cover"
                          />
                      </div>
                      <span className="mt-2 text-sm text-gray-800 group-hover:text-[#ff0066] transition-colors">
              {cat.name}
            </span>
                  </Link>
              ))}
          </div>
      </section>
  );
}
