export default function ReviewSection() {
  const reviews = [
    { user: "지유", text: "공기청정기 구독 중인데 만족도가 높아요!" },
    { user: "파트", text: "정수기 설치도 빠르고 편리했어요." },
  ];

  return (
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-8">고객 후기</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((r, i) => (
              <div key={i} className="border rounded-lg p-6 shadow-sm flex gap-4">
                <img
                    src="https://via.placeholder.com/100"
                    alt={r.user}
                    className="w-16 h-16 rounded-full"
                />
                <div>
                  <p className="text-gray-700">"{r.text}"</p>
                  <span className="text-sm text-gray-500">- {r.user}</span>
                </div>
              </div>
          ))}
        </div>
      </section>
  );
}
