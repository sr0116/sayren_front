"use client";
import dynamic from "next/dynamic";
import { useCallback } from "react";

// SSR 방지용 동적 import
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function AdminProductRegister({ product, setProduct, handleSubmit }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Quill에서 내용 변경될 때 description 업데이트
  const handleDescriptionChange = useCallback(
    (value) => {
      setProduct((prev) => ({
        ...prev,
        description: value, // HTML로 저장됨
      }));
    },
    [setProduct]
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex flex-col gap-4 max-w-2xl"
    >
      <input
        name="productName"
        value={product.productName}
        onChange={handleChange}
        placeholder="상품명"
        className="border rounded p-2"
      />

      {/* React Quill Editor (상품 설명) */}
      <div>
        <label className="block font-semibold mb-1">상품 설명</label>
        <ReactQuill
          theme="snow"
          value={product.description || ""}
          onChange={handleDescriptionChange}
          placeholder="상품 설명을 입력하세요..."
          style={{ height: "300px", marginBottom: "40px" }}
        />
      </div>

      <input
        name="price"
        type="number"
        value={product.price}
        onChange={handleChange}
        placeholder="가격"
        className="border rounded p-2"
      />
      <select
        name="productCategory"
        value={product.productCategory}
        onChange={(e) => setProduct(prev => ({ ...prev, productCategory: e.target.value }))}
        className="border rounded p-2"
      >
        <option value="">카테고리 선택</option>
        <option value="가전">가전</option>
        <option value="프로젝터">프로젝터</option>
        <option value="맥주제조기">맥주제조기</option>
        <option value="안마의자">안마의자</option>
        <option value="와인셀러">와인셀러</option>
      </select>
      <input
        name="modelName"
        value={product.modelName}
        onChange={handleChange}
        placeholder="모델명"
        className="border rounded p-2"
      />
      <input
        name="stock"
        type="number"
        value={product.stock}
        onChange={handleChange}
        placeholder="재고 수량"
        className="border rounded p-2"
      />

      <button
        type="submit"
        className="bg-pink-500 text-white font-semibold py-2 rounded hover:bg-pink-600 transition"
      >
        상품 등록
      </button>
    </form>
  );
}
