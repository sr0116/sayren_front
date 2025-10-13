import Link from "next/link";

export default function ProductListCategory({selected}) {

    const categories = [
        "전체",
        "정수기",
        "냉장고",
        "프로젝터",
        "신발관리기",
        "가습기",
        "스탠바이미",
        "와인셀러",
        "스타일러",
        "맥주제조기",
    ];

    return (
        <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((cat) => {
                const isActive = selected === cat || (!selected && cat === "전체");
                return (
                    <Link
                        key={cat}
                        href={cat === "전체" ? "/product" : `/product?category=${cat}`}
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