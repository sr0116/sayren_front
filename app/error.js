"use client";

import Link from "next/link";

export default function Error() {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-3xl font-bold mb-4">문제가 발생했습니다.</h1>
        <Link href="/" className="text-primary underline">
          메인으로 돌아가기
        </Link>
      </div>
  );
}
