import PaymentPage from "@/components/payments/PaymentPage";
import PaymentButton from "@/components/payments/PaymentButton";
import ExPayment from "@/components/payments/ExPayment";
import Script from "next/script";

export default function Page(){
  return (
      <div>
        <Script
            src="https://cdn.iamport.kr/v1/iamport.js"
            strategy="afterInteractive"
        />
        <ExPayment />
        <PaymentButton />
      </div>
  )
}