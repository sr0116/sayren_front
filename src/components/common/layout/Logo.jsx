"use client";
import Image from "next/image";
import Link from "next/link";


// Logo
// 헤더 좌측에 표시되는 로고
//variant="full" → SAYREN 풀 로고
// variant="symbol" → SAYREN 심볼 로고

export default function Logo({variant = "full"}) {
  const src = variant === "full" ? "/image/Logo.svg" : "/image/Symbol.svg";
  const sizeClass = variant === "full" ? "h-8 w-[120px]" : "h-8 w-[32px]";

  return (
      <Link href="/">
        <div
            className={`relative ${sizeClass} flex-shrink-0 flex items-center cursor-pointer`}
        >
          <Image src={src} alt="SAYREN Logo" fill priority className="object-contain"/>
        </div>
      </Link>
  );
}
