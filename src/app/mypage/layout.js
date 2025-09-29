"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MyMenu from "@/components/member/MyMenu";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import SectionLoader from "@/components/common/loading/SectionLoader";

export default function Layout({ children }) {
  return (
      <div className="w-full flex flex-col md:flex-row gap-6 px-6">
        <aside className="w-full md:w-60 shrink-0">
          <h2 className="text-xl font-bold mb-6 text-gray-800">마이페이지</h2>
          <MyMenu />
        </aside>

        {/* 공통 로딩 적용 */}
        <section className="flex-grow border border-gray-200 rounded-lg bg-white shadow-sm relative">
          <SectionLoader>
            {children}
          </SectionLoader>
        </section>
      </div>
  );
}
