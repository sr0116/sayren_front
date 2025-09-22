"use client";

import Header from "@/components/common/layout/Header";
import Footer from "@/components/common/layout/Footer";
import GlobalModal from "@/components/common/GlobalModal";

// Frame
// - Header, Footer, GlobalModal 같은 레이아웃 구성 요소 포함
// - main 영역에 페이지 children을 출력
export default function Frame({ children }) {
  return (
      <div className="flex flex-col min-h-screen font-sans">
        <Header />
        <main className="flex-grow pt-24">{children}</main>
        <GlobalModal />
        <Footer />
      </div>
  );
}
