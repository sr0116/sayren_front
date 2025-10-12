
export async function requestPortOnePayment(paymentData) {
  if (!paymentData) throw new Error("결제 정보가 없습니다.");

  const payMethod =
      paymentData.payMethod ||
      (paymentData.paymentType === "CARD"
          ? "card"
          : paymentData.paymentType?.toLowerCase()) ||
      "card";
  // SDK 로드 확인
  const IMP = window.IMP;
  if (!IMP) throw new Error("PortOne SDK가 로드되지 않았습니다.");
  IMP.init(process.env.NEXT_PUBLIC_IMP_CODE);

  // PortOne 결제 요청 정보 구성
  const requestData = {
    pg: "nice_v2", // 테스트 모드용
    pay_method: payMethod,
    merchant_uid: paymentData.merchantUid,
    name: paymentData.productName ||
        `주문번호 ${paymentData.paymentId}`,
    amount: paymentData.amount,
    buyer_email:  paymentData.buyerEmail || "user@test.com",
    buyer_name: paymentData.buyerName  || "알수 없는 유저",
    buyer_tel: paymentData.buyerTel || "010-0000-0000",
  };

  return new Promise((resolve, reject) => {
    IMP.request_pay(requestData, (rsp) => {
      console.log("PortOne 응답:", rsp);

      if (rsp.imp_uid) {
        resolve(rsp);
      } else {
        reject(
            new Error(
                rsp.error_msg || "결제 실패: 알 수 없는 오류가 발생했습니다."
            )
        );
      }
    });
  });
}
