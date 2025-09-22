import "./globals.css";
import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer";
import ReduxProvider from "@/app/providers/ReduxProvider";
import GlobalModal from "@/components/common/GlobalModal";
import ReactQueryProvider from "@/app/providers/ReactQueryProvider";
import AuthInitializer from "@/app/providers/AuthInitializer";
import {ScrollToTop} from "@/components/common/ScrollToTop";


export const metadata = {
  title: "Sayren - 세상 이쁜 렌탈, 세이렌",
  description: "렌탈/구독 결제를 쉽게!",
};

export default function RootLayout({ children }) {
  return (
      <html lang="ko">
      <body className="flex flex-col min-h-screen font-sans">
      <ReduxProvider>
        <ReactQueryProvider>
          <AuthInitializer />
          <ScrollToTop/>
          <Header />
          <main className="flex-grow pt-24">{children}</main>
          <GlobalModal/>
          <Footer />
        </ReactQueryProvider>
      </ReduxProvider>
      </body>
      </html>
  );
}
