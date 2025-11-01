import PaymentList from "@/components/payments/PaymentList";
import PaymentSummaryCard from "@/components/payments/PaymentSummaryCard";

export default function PaymentPage(){
  return (
    <div>
      {/*/!*최근 결제 내역*!/*/}
      {/*<PaymentSummaryCard/>*/}
      {/*리스트 조회*/}
      <PaymentList />
    </div>
  )
}