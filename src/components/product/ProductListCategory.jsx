import Link from "next/link";

export default function ProductListCategory({selected}) {

const categories = [
    "전체",
    "정수기",
    "TV",
    "에어컨",
    "냉장고",
    "워시타워",
    "공기청정기",
    "의류건조기",
    "식기세척기",
    "세탁기",
    "스타일러",
];

    return (
        <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((cat) => {
                const isActive = selected === cat || (!selected && cat === "전체");
                return (
                    <Link
                        key={cat}
                        href={cat === "전체" ? "/products" : `/products?category=${cat}`}
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