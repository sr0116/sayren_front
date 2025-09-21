export async function preparePayment(orderItemId, paymentType) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/payments/prepare`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // 로그인 토큰
    },
    body: JSON.stringify({
      orderItemId,
      paymentType
    })
  });

  if (!response.ok) {
    throw new Error('결제 준비 요청 실패');
  }

  return response.json(); // PaymentResponseDTO 반환
}
