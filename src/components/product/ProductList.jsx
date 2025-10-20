"use client";

import {useEffect, useState} from "react";
import {usePageParams} from "@/hooks/usePageParams";
import ProductListCategory from "@/components/product/ProductListCategory";
import ProductTagFilter from "@/components/product/ProductTagFilter";
import SearchBar from "@/components/common/SearchBar";
import Link from "next/link";
import ProductCardPurchase from "@/components/product/ProductCardPurchase";
import { useRouter } from "next/navigation";

export default function ProductList({products, searchParams}) {
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

  // 검색 후 초기화

  const router = useRouter();
  const handleResetAll = () => {
    setTags([]);
    setCate(products);
    setProductList(products);
    router.replace("/product");
  };

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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col justify-between items-center mb-6 gap-4">
        {/* 카테고리 필터 */}
        <ProductListCategory
          products={products}
          selected={category}
        />
        {/* 검색 입력창 */}
        <div className="flex items-center gap-2 w-full">
          <SearchBar keyword={keyword} onReset={handleResetAll}/>
        </div>
        {/*상세검색 태그 필터*/}
        <ProductTagFilter productList={cate} onTagSelect={onTagSelect} onReset={handleResetAll} />
      </div>
{/*<pre>{JSON.stringify(productList, null, 2)}</pre>*/}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {productList?.map((p) => (

            <ProductCardPurchase product={p}/>

        ))}
      </div>
    </div>
  )
}