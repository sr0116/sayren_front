export default function PlanOverview() {
  const plans = [
    { name: "일회성 구매", desc: "바로 구매하러 가기" },
    { name: "월 구독", desc: "매월 정기 결제, 구독 상품 보러가기" }
  ];

  return (
      <section className="py-12 ">
        <h2 className="text-2xl font-bold mb-8">플랜 안내</h2>
        <div className=" flex justify-between grid grid-cols-2 gap-2">
          {plans.map((plan, i) => (
              <div key={i} className="border rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="mt-2 text-gray-600">{plan.desc}</p>
              </div>
          ))}
        </div>
      </section>
  );
}
