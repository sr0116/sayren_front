"use client";

import { useState, useEffect } from "react";
import Button from "@/components/common/Button";
import Link from "next/link";

export default function AdminProductList({ products = [], categories = [] }) {
  const [productList, setProductList] = useState([]);
  const [filter, setFilter] = useState("ALL");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 카테고리 리스트 초기화 (SSR로 전달받은 props)
  const [categoryList, setCategoryList] = useState([]
  );

  // 상품 리스트 초기화
  useEffect(() => {
    if (Array.isArray(products)) {
      setProductList(products);
    }
  }, [products]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // const token = localStorage.getItem("accessToken");
        const token =
            "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJBRE1JTiIsIlVTRVIiXSwic3RhdHVzIjoiQUNUSVZFIiwic3ViIjoiMSIsImlhdCI6MTc2MDU1OTI0MCwiZXhwIjoxNzYwNTYxMDQwfQ.wGhBgOm3WJO-7-ouCYD0XAH_O6v01Ygui_5qE7dEPeA";

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/product/category`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        );

        if (!res.ok) throw new Error("카테고리 요청 실패");
        const data = await res.json();

        console.log("카테고리 응답:", data);
        setCategoryList(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error("카테고리 불러오기 실패:", err);
        setCategoryList([]);
      }
    };

    fetchCategories();
  }, []);

  // 상태별 필터링
  const filteredProducts = productList.filter((p) => {
    if (filter === "ALL") return true;
    if (filter === "VISIBLE") return p.isUse === true;
    if (filter === "HIDDEN") return p.isUse === false && !p.isDeleted;
    if (filter === "DELETED") return p.isDeleted === true;
    return true;
  });

  // 모달 열기
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setSelectedCategory("");
  };

  // 게시글 등록 요청
  const handleRegisterProduct = async () => {
    if (!selectedCategory) {
      alert("카테고리를 선택해주세요.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");

      const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/product/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // 토큰 직접 전달
            },
            body: JSON.stringify({
              productId: selectedProduct.productId,
              categoryId: Number(selectedCategory), // 카테고리 id
            }),
          }
      );

      if (!res.ok) throw new Error("등록 실패");
      alert("상품이 게시글로 등록되었습니다!");
      handleCloseModal();
      window.location.reload();
    } catch (err) {
      console.error("게시글 등록 실패:", err);
      alert("등록 실패! 다시 시도해주세요.");
    }
  };

  return (
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        {/*<pre>{JSON.stringify(categoryList, null, 2)}</pre>*/}
        {/* 필터 버튼 */}
        <div className="flex flex-wrap items-center gap-2 border border-gray-200 rounded-md p-3 bg-gray-50">
          <button
              onClick={() => setFilter("ALL")}
              className={`px-4 py-1.5 text-sm rounded-md border transition ${
                  filter === "ALL"
                      ? "bg-gray-800 text-white border-gray-800"
                      : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
          >
            전체
          </button>

          <button
              onClick={() => setFilter("HIDDEN")}
              className={`px-4 py-1.5 text-sm rounded-md border transition ${
                  filter === "HIDDEN"
                      ? "bg-yellow-500 text-white border-yellow-500"
                      : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
          >
            노출안함
          </button>

          <button
              onClick={() => setFilter("DELETED")}
              className={`px-4 py-1.5 text-sm rounded-md border transition ${
                  filter === "DELETED"
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
          >
            삭제
          </button>

          <Link
              href="/admin/product/register"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            상품 등록
          </Link>
        </div>

        {/* 상품 목록 테이블 */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg mt-10 overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800">상품 목록</h3>
            <p className="text-sm text-gray-500">총 {productList?.length || 0}개</p>
          </div>

          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left w-12">
                <input type="checkbox" />
              </th>
              <th className="px-4 py-3 text-left">번호</th>
              <th className="px-4 py-3 text-left">상품 구분</th>
              <th className="px-4 py-3 text-left">썸네일</th>
              <th className="px-4 py-3 text-left">상품명</th>
              <th className="px-4 py-3 text-right">일반구매가</th>
              <th className="px-4 py-3 text-center">상태</th>
              <th className="px-4 py-3 text-center">관리</th>
            </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
            {filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts.map((p, i) => (
                    <tr key={p.productId} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <input type="checkbox" />
                      </td>
                      <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                      <td className="px-4 py-3">{p.category}</td>
                      <td className="px-4 py-3">
                        {p.thumbnailUrl ? (
                            <img
                                src={p.thumbnailUrl}
                                alt={p.productName}
                                width={70}
                                height={70}
                                className="rounded-md border border-gray-200 object-cover w-[60px] h-[60px]"
                            />
                        ) : (
                            <div className="w-[60px] h-[60px] bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 rounded-md shrink-0">
                              No Image
                            </div>
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {p.productName}
                      </td>

                      <td className="px-4 py-3 text-right text-gray-600">
                        {p.purchasePrice
                            ? `${p.purchasePrice.toLocaleString()}원`
                            : "-"}
                      </td>

                      <td className="px-4 py-3 text-center">
                        {p.isDeleted ? (
                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-500 rounded">
                        삭제됨
                      </span>
                        ) : p.isUse ? (
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">
                        노출중
                      </span>
                        ) : (
                            <div>
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded">
                          노출안함
                        </span>
                              <Button
                                  size="xs"
                                  variant="outline"
                                  onClick={() => handleOpenModal(p)}
                              >
                                노출함
                              </Button>
                            </div>
                        )}
                      </td>

                      <td className="px-4 py-3 text-center space-x-2">
                        {/*<Button size="xs" variant="outline">*/}
                        {/*  수정*/}
                        {/*</Button>*/}
                        <Button size="xs" variant="danger">
                          삭제
                        </Button>
                      </td>
                    </tr>
                ))
            ) : (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-gray-400 text-sm">
                    등록된 상품이 없습니다.
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>

        {/* 카테고리 선택 모달 */}
        {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                <h2 className="text-lg font-bold mb-4 text-gray-800">카테고리 선택</h2>

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border w-full p-2 rounded mb-4"
                >
                  <option value="">카테고리를 선택하세요</option>
                  {categoryList.length > 0 ? (
                      categoryList.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                      ))
                  ) : (
                      <option disabled>카테고리 없음</option>
                  )}
                </select>

                <div className="flex justify-end gap-2">
                  <button
                      onClick={handleCloseModal}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                  >
                    취소
                  </button>
                  <button
                      onClick={handleRegisterProduct}
                      className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded text-sm"
                  >
                    등록
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}