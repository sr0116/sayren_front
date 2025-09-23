import Script from "next/script";
import PaymentButton from "@/components/payments/PaymentButton";

export default function PaymentPage() {
  return (
      <>
        {/* PortOne SDK 로드 */}
        <Script
            src="https://cdn.iamport.kr/v1/iamport.js"
            strategy="afterInteractive"
        />
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">결제 테스트 페이지</h1>
          {/* 결제 버튼 */}
          <PaymentButton />
        </div>
      </>
  );
}
