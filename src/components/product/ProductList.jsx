"use client";

import { useState, useEffect } from "react";
import AdminProductState from "@/components/product/AdminProductState";
import Image from "next/image";
import Button from "@/components/common/Button";

export default function AdminProductListPage({ products = [] }) {
  const [productList, setProductList] = useState([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    if (Array.isArray(products)) {
      setProductList(products);
    }
  }, [products]);

  // 상태별 필터링
  const filteredProducts = productList.filter((p) => {
    if (filter === "ALL") return true;
    if (filter === "VISIBLE") return p.isUse === true;
    if (filter === "HIDDEN") return p.isUse === false && !p.isDeleted;
    if (filter === "DELETED") return p.isDeleted === true;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
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
          onClick={() => setFilter("VISIBLE")}
          className={`px-4 py-1.5 text-sm rounded-md border transition ${
            filter === "VISIBLE"
              ? "bg-green-600 text-white border-green-600"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          노출함
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
        <Button
          as="link"
          href="/admin/product/register"
          className="text-sm px-4 py-2"
        >
          상품 등록
        </Button>
      </div>

      {/*등록버튼*/}
      <div className="flex justify-between items-center">
      </div>

      {/* 상품 목록 테이블 */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg mt-10 overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">상품 목록</h3>
          <p className="text-sm text-gray-500">
            총 {productList?.length || 0}개
          </p>
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
            <th className="px-4 py-3 text-right">월 구독가</th>
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
                <td className="px-4 py-3 text-right text-gray-600">
                  {p.rentalPrice
                    ? `${p.rentalPrice.toLocaleString()}원`
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
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded">
                        노출안함
                      </span>
                  )}
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  <Button size="xs" variant="outline">
                    수정
                  </Button>
                  <Button size="xs" variant="danger">
                    삭제
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="9"
                className="py-8 text-center text-gray-400 text-sm"
              >
                등록된 상품이 없습니다.
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
