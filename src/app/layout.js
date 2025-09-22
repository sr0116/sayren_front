import "./globals.css";
import Frame from "@/components/common/layout/Frame";
import ProvidersList from "@/app/providers/ProvidersList";

export const metadata = {
  title: "Sayren - 세상 이쁜 렌탈, 세이렌",
  description: "렌탈/구독 결제를 쉽게!",
};

export default function RootLayout({ children }) {
  return (
      <html lang="ko">
      <body>
      <ProvidersList>
        <Frame>{children}</Frame>
      </ProvidersList>
      </body>
      </html>
  );
}
