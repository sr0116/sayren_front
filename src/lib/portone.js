export async function requestPortOnePayment(paymentData) {
  if (!paymentData) throw new Error("결제 정보가 없습니다.");

  const payMethod =
      paymentData.payMethod ||
      (paymentData.paymentType === "CARD"
          ? "card"
          : paymentData.paymentType?.toLowerCase()) ||
      "card";

  const IMP = window.IMP;
  if (!IMP) throw new Error("PortOne SDK가 로드되지 않았습니다.");
  IMP.init(process.env.NEXT_PUBLIC_IMP_CODE);

  const requestData = {
    pg: "nice_v2",
    pay_method: payMethod,
    merchant_uid: paymentData.merchantUid,
    name: paymentData.productName || `주문번호 ${paymentData.paymentId}`,
    amount: paymentData.amount,
    buyer_email: paymentData.buyerEmail || "user@test.com",
    buyer_name: paymentData.buyerName || "테스트 사용자",
    buyer_tel: paymentData.buyerTel || "010-0000-0000",
  };

  // 성공이든 실패든 모두 resolve → PaymentButton에서 직접 분기
  return new Promise((resolve) => {
    IMP.request_pay(requestData, (rsp) => {
      console.log("PortOne 응답:", rsp);
      resolve(rsp);
    });
  });
}
