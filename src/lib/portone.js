export async function requestPortOnePayment(paymentData) {
  if (!paymentData) throw new Error("결제 정보가 없습니다.");

  const IMP = window.IMP;
  if (!IMP) throw new Error("PortOne SDK가 로드되지 않았습니다.");

  //  popup 모드 유지 (리디렉션 금지)
  IMP.init(process.env.NEXT_PUBLIC_IMP_CODE, { popup: true });

  const requestData = {
    pg: "nice_v2",
    pay_method: "card",
    merchant_uid: paymentData.merchantUid,
    name: paymentData.productName || `주문번호 ${paymentData.paymentId}`,
    amount: paymentData.amount,
    buyer_email: paymentData.buyerEmail || "user@test.com",
    buyer_name: paymentData.buyerName || "테스트 사용자",
    buyer_tel: paymentData.buyerTel || "010-0000-0000",

    //  리디렉션 완전 차단
    m_redirect_url: undefined,
    redirect_url: undefined,
  };

  console.log(" PortOne 요청 데이터:", requestData);

  return new Promise((resolve) => {
    IMP.request_pay(requestData, (rsp) => {
      console.log("PortOne 응답:", rsp);
      resolve(rsp);
    });
  });
}
