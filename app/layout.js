import "./globals.css";
import Header from "@/app/components/common/Header"
import Footer from "@/app/components/common/Footer";
import ReduxProvider from "@/app/providers/ReduxProvider";

export const metadata = {
  title: "Sayren - 구독 결제 플랫폼",
  description: "렌탈/구독 결제를 쉽게!",
};

export default function RootLayout({ children }) {
  return (
      <html lang="ko">
      <body className="flex flex-col min-h-screen font-sans">
      <ReduxProvider>
        <Header />
        <main className="flex-grow pt-24">{children}</main>
        <Footer />
      </ReduxProvider>
      </body>
      </html>
  );
}
