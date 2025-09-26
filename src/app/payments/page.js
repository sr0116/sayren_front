
import Script from "next/script";
import PaymentPage from "@/components/payments/PaymentPage";

export default function Page(){
  return (
      <div>
        <Script
            src="https://cdn.iamport.kr/v1/iamport.js"
            strategy="afterInteractive"
        />
        <PaymentPage />
      </div>
  )
}
