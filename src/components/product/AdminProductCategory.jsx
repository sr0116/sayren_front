export default function AdminProductCategory({ products, selected, onSelect }) {
    const category = () => {
        const cate = new Set();
        cate.add("전체");
        products?.forEach((item) => {
            cate.add(item.category);
        });
        return Array.from(cate);
    };

    const categories = category();

    return (
        <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((cat) => {
                const isActive = selected === cat;
                return (
                    <button
                        key={cat}
                        onClick={() => onSelect(cat)}
                        className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                            isActive
                                ? "bg-pink-600 text-white border-pink-600"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                    >
                        {cat}
                    </button>
                );
            })}
        </div>
    );
}
