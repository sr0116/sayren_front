"use client";

export default function RentalHighlight() {
  const products = [
    {
      id: 1,
      rank: 1,
      name: "SAYREN 스타일러 오브제컬렉션 (NEW)",
      model: "SC5GMR80A",
      price: "45,500",
      salePrice: "19,500",
      img: "https://placehold.co/300x500?text=1",
    },
    {
      id: 2,
      rank: 2,
      name: "SAYREN 스타일러 오브제컬렉션 (NEW)",
      model: "SC5MBR80A",
      price: "45,400",
      salePrice: "19,400",
      img: "https://placehold.co/300x500?text=2",
    },
    {
      id: 3,
      rank: 3,
      name: "SAYREN 스타일러 오브제컬렉션 (NEW)",
      model: "SC5GMR60B",
      price: "41,400",
      salePrice: "15,400",
      img: "https://placehold.co/300x500?text=3",
    },
  ];

  return (
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold mb-6">구독 인기상품</h2>

        <div className="flex flex-wrap gap-6">
          {products.map((p) => (
              <div
                  key={p.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02]
                       transition border border-gray-100 relative flex flex-col
                       w-full sm:w-[48%] lg:w-[32%] p-6"
              >
                <div className="absolute top-3 left-3 bg-black text-white text-xs rounded px-2 py-1">
                  {p.rank}
                </div>

                <div className="h-64 flex items-center justify-center">
                  <img
                      src={p.img}
                      alt={p.name}
                      className="h-full object-contain"
                  />
                </div>

                <div className="mt-4">
                  <h3 className="font-bold text-gray-900">{p.name}</h3>
                  <p className="text-sm text-gray-500">{p.model}</p>

                  <p className="mt-2 text-lg font-semibold text-gray-900">
                    월 {p.price}원
                  </p>
                  <p className="text-sm text-red-500">
                    최대혜택가 월 {p.salePrice}원
                  </p>
                </div>
              </div>
          ))}
        </div>
      </section>
  );
}
