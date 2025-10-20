"use client";
import Link from "next/link";

export default function RentalProductListCategory({products, selected}) {
  console.log(selected);
  const category = () => {
    const cate = new Set();
    cate.add("전체");
    products?.forEach(item => {
      cate.add(item.category)
    });
    return Array.from(cate);
  }

  const categories = category();

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories && categories.map((cat) => {
        const isActive = selected === cat;
        return (
          <Link
            key={cat}
            href={cat === "전체" ? "/rental" : `/rental?category=${cat}`}
            className={`px-4 py-2 rounded-full border text-sm transition-colors
              ${
              isActive
                ? "bg-black text-white border-black"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cat}
          </Link>
        );
      })}
    </div>
  );
}