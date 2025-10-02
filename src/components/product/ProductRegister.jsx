"use client";
import { useState, useEffect } from "react";

const categories = ["정수기", "TV", "에어컨", "냉장고", "공기청정기", "의류건조기", "식기세척기", "세탁기", "스타일러",]

export default function ProductNewPage() {
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);

  // 카테고리 바뀌면 상품 목록 로드
  useEffect(() => {
    if (!category) return;
    fetch(`/api/crawled-products?category=${encodeURIComponent(category)}`)
      .then((res) => res.json())
      .then((data) => setProducts(data || []));
  }, [category]);

  const handleRegister = async () => {
    if (!selected) return alert("상품을 선택하세요!");

    const res = await fetch("/api/products/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: selected }),
    });

    if (res.ok) {
      alert("등록 성공!");
      window.location.href = "/products"; // 리스트로 이동
    } else {
      alert("등록 실패");
    }
  };

  return (
    <div className="flex max-w-6xl mx-auto p-6 gap-6">
      {/* 왼쪽: 카테고리 선택 */}
      <div className="w-1/4">
        <h2 className="font-bold mb-4">카테고리 선택</h2>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="">-- 선택 --</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* 오른쪽: 상품 리스트 */}
      <div className="w-3/4">
        <h2 className="font-bold mb-4">상품 리스트</h2>
        {category ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                className={`border rounded p-4 ${
                  selected === p.id ? "border-pink-500" : "border-gray-200"
                }`}
              >
                <div className="h-40 bg-gray-100 mb-2 flex items-center justify-center">
                  {p.thumbnailUrl ? (
                    <img
                      src={p.thumbnailUrl}
                      alt={p.productName}
                      className="object-cover h-full w-full"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
                <h3 className="font-semibold text-sm">{p.productName}</h3>
                <p className="text-xs text-gray-500">{p.modelName}</p>
                <p className="text-pink-600 font-bold text-sm">
                  {p.price.toLocaleString()}원
                </p>
                <button
                  onClick={() => setSelected(p.id)}
                  className={`mt-2 w-full px-3 py-1 rounded ${
                    selected === p.id
                      ? "bg-pink-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {selected === p.id ? "선택됨" : "선택하기"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">카테고리를 먼저 선택하세요.</p>
        )}
      </div>

      {/* 등록 버튼 */}
      {selected && (
        <button
          onClick={handleRegister}
          className="absolute bottom-6 right-6 bg-black text-white px-6 py-2 rounded"
        >
          등록하기
        </button>
      )}
    </div>
  );
}
