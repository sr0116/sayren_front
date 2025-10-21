"use client";

import {useEffect, useState} from "react";
import {usePageParams} from "@/hooks/usePageParams";
import ProductListCategory from "@/components/product/ProductListCategory";
import ProductTagFilter from "@/components/product/ProductTagFilter";
import SearchBar from "@/components/common/SearchBar";
import Link from "next/link";
import ProductCardPurchase from "@/components/product/ProductCardPurchase";
import Button from "@/components/common/Button";

export default function AdminProductRegisterList({products, searchParams}) {
  const [cate, setCate] = useState(null);
  // 필터링된 상품
  const [productList, setProductList] = useState(null);

  const {
    page,
    size,
    keyword,
    sortBy,
    direction,
  } = usePageParams();

  const category = searchParams?.category || "전체";
  console.log(category);

  const [tags, setTags] = useState([]);

  function filterCategories() {
    const filtered = products?.filter((item) => {
      const categoryMatch = category === "전체" || item.category === category;
      return categoryMatch;
    });
    setCate(filtered);
    return filtered;
  }

  function filterProducts(products) {
    let filtered = products?.filter((item) => {
      const safeKeyword = keyword?.trim() || "";
      const keywordMatch =
          safeKeyword.length === 0 ||
          item.productName?.toLowerCase().includes(safeKeyword.toLowerCase()) ||
          item.modelName?.toLowerCase().includes(safeKeyword.toLowerCase());

      console.log("keyword", keywordMatch);
      // 태그 필터
      const tagMatch =
          tags.length === 0 || tags.some((t) => item.tags?.includes(t));
      console.log("tag", tagMatch);
      // status 필터
      const statusMatch = item.status === "ACTIVE";


      // 각 조건 모두 통과해야 true 반환
      return keywordMatch && tagMatch && statusMatch;
    })

    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        const valA = a[sortBy];
        const valB = b[sortBy];

        // null/undefined 방어
        if (valA == null || valB == null) return 0;

        // 숫자형 정렬 (price, deposit 등)
        if (typeof valA === "number" && typeof valB === "number") {
          return direction === "desc" ? valB - valA : valA - valB;
        }

        // 날짜형 정렬 (createdAt 등)
        if (!isNaN(Date.parse(valA)) && !isNaN(Date.parse(valB))) {
          return direction === "desc"
              ? new Date(valB) - new Date(valA)
              : new Date(valA) - new Date(valB);
        }

        // 문자열 정렬 (productName, modelName 등)
        if (typeof valA === "string" && typeof valB === "string") {
          return direction === "desc"
              ? valB.localeCompare(valA)
              : valA.localeCompare(valB);
        }

        // 기타 자료형은 그대로
        return 0;
      });
    }

    return filtered;
  }

  const onTagSelect = (data) => {
    setTags(data);
  }

  // 필터
  useEffect(() => {
    if (products !== null) {
      setProductList(filterProducts(filterCategories(products)));
    }
  }, [
    category,
    page,
    size,
    tags,
    keyword,
    sortBy,
    direction,
    products
  ]);


  return (
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        {/* 상단 필터 */}
        <div className="flex flex-col justify-between items-center mb-6 gap-4">
          <ProductListCategory products={products} selected={category} />
          <div className="flex items-center gap-2 w-full">
            <SearchBar keyword={keyword} />
          </div>
          <ProductTagFilter productList={cate} onTagSelect={onTagSelect} />
        </div>

        {/* 관리자 스타일 테이블 */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800">상품 목록</h3>
            <p className="text-sm text-gray-500">
              총 {productList?.length || 0}개
            </p>
          </div>

          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left w-12">번호</th>
              <th className="px-4 py-3 text-left">카테고리</th>
              <th className="px-4 py-3 text-left">썸네일</th>
              <th className="px-4 py-3 text-left">상품명</th>
              <th className="px-4 py-3 text-right">가격</th>
              <th className="px-4 py-3 text-center">상태</th>
              <th className="px-4 py-3 text-center w-36">관리</th>
            </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
            {productList && productList.length > 0 ? (
                productList.map((p, i) => (
                    <tr key={p.productId} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                      <td className="px-4 py-3">{p.category}</td>
                      <td className="px-4 py-3">
                        {p.thumbnailUrl ? (
                            <img
                                src={p.thumbnailUrl}
                                alt={p.productName}
                                width={60}
                                height={60}
                                className="rounded-md border border-gray-200 object-cover w-[60px] h-[60px]"
                            />
                        ) : (
                            <div className="w-[60px] h-[60px] bg-gray-100 flex items-center justify-center text-xs text-gray-400 rounded-md">
                              No Image
                            </div>
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {p.productName}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-600">
                        {p.price ? `${p.price.toLocaleString()}원` : "-"}
                      </td>
                      <td className="px-4 py-3 text-center">
                    <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                            p.isUse
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {p.isUse ? "노출중" : "비활성화"}
                    </span>
                      </td>
                      <td className="px-4 py-3 text-center space-x-2">
                        <Link href={`/admin/product/register/${p.productId}`}>
                          <Button size="xs" variant="outline">
                            수정
                          </Button>
                        </Link>
                        <Button size="xs" variant="danger">
                          삭제
                        </Button>
                      </td>
                    </tr>
                ))
            ) : (
                <tr>
                  <td
                      colSpan="7"
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