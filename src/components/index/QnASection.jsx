export default function QnASection() {
  const qnas = [
    { q: "렌탈 계약은 최소 몇 개월인가요?", a: "기본 12개월 이상부터 가능합니다." },
    { q: "중도 해지 시 위약금이 있나요?", a: "계약 조건에 따라 위약금이 발생할 수 있습니다." },
  ];

  return (
      <section className="py-12 ">
        <h2 className="text-2xl font-bold mb-8">자주 묻는 질문</h2>
        <div className="space-y-6">
          {qnas.map((item, i) => (
              <div key={i}>
                <p className="font-semibold">Q. {item.q}</p>
                <p className="text-gray-600">A. {item.a}</p>
              </div>
          ))}
        </div>
      </section>
  );
}
