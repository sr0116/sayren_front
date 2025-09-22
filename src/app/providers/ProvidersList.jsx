"use client";

import ReduxProvider from "@/app/providers/ReduxProvider";
import ReactQueryProvider from "@/app/providers/ReactQueryProvider";
import AuthInitializer from "@/app/providers/AuthInitializer";
import SocialAuthHandler from "@/app/providers/SocialAuthHandler";

// Providers
// - 프로젝트 전역에서 필요한 상태 관리, 초기화, 인증 핸들러 등을 한 번에 처리
// 나중에 더 추가될 수도 있음
export default function ProvidersList({ children }) {
  return (
      <ReduxProvider>
        <ReactQueryProvider>
          {children}
          <AuthInitializer />
          <SocialAuthHandler />
        </ReactQueryProvider>
      </ReduxProvider>
  );
}
