"use client";

export default function CategoryTabs({ categories, selected, onSelect }) {
  return (
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
            <button
                key={cat}
                onClick={() => onSelect(cat)}
                className={`px-4 py-2 rounded-full border text-sm ${
                    selected === cat
                        ? "bg-black text-white"
                        : "bg-white text-gray-700 border-gray-300"
                }`}
            >
              {cat}
            </button>
        ))}
      </div>
  );
}