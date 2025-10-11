import "./globals.css";
import ReduxProvider from "@/app/providers/ReduxProvider";
import GlobalModal from "@/components/common/GlobalModal";
import ReactQueryProvider from "@/app/providers/ReactQueryProvider";
import AuthInitializer from "@/app/providers/AuthInitializer";
import {ScrollToTop} from "@/components/common/ScrollToTop";
import Footer from "@/components/common/layout/Footer";
import ToastContainer from "@/components/common/layout/ToastContainer";
import Header from "@/components/common/layout/Header";
import GlobalLoader from "@/components/common/loading/GlobalLoader";
import Script from "next/script";
import "react-quill/dist/quill.snow.css";


export const metadata = {
  title: "Sayren - 세상 이쁜 렌탈, 세이렌",
  description: "렌탈/구독 결제를 쉽게!",
};

export default function RootLayout({ children }) {
  return (
      <html lang="ko">

      <head>
          {/*카카오 주소 API */}
          <Script
              src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
              strategy="beforeInteractive"
          />
      </head>
      <body className="flex flex-col min-h-screen font-sans">
      <ReduxProvider>
        <ReactQueryProvider>
          <AuthInitializer />
          <ScrollToTop/>
          <Header />
          <main className="flex-grow pt-24 md:pt-40  px-6 md:px-8 mb-28 max-w-7xl mx-auto w-full">{children}</main>
          <GlobalModal/>
          <Footer />
          <ToastContainer />
        </ReactQueryProvider>
      </ReduxProvider>
      </body>
      </html>
  );
}
