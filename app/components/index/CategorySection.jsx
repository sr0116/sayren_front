"use client";

export default function CategorySection() {
  const categories = [
    { name: "정수기", img: "https://placehold.co/80x80?text=WATER" },
    { name: "TV", img: "https://placehold.co/80x80?text=TV" },
    { name: "에어컨", img: "https://placehold.co/80x80?text=AIRCON" },
    { name: "냉장고", img: "https://placehold.co/80x80?text=FRIDGE" },
    { name: "세탁기", img: "https://placehold.co/80x80?text=WASH" },
    { name: "의류건조기", img: "https://placehold.co/80x80?text=DRYER" },
    { name: "청소기", img: "https://placehold.co/80x80?text=CLEAN" },
    { name: "PC", img: "https://placehold.co/80x80?text=PC" },
  ];

  return (
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-8">
          {categories.map((cat, i) => (
              <div
                  key={i}
                  className="flex flex-col items-center text-center cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
                  <img
                      src={cat.img}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                  />
                </div>
                <span className="mt-2 text-sm text-gray-800">{cat.name}</span>
              </div>
          ))}
        </div>
      </section>
  );
}
