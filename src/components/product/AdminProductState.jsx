"use client";

import { Package, ShoppingBag, AlertTriangle, Trash2 } from "lucide-react";
import { useMemo } from "react";

/**
 * 관리자 상품 현황 카드 (상단 대시보드)
 */
export default function AdminProductState({ products = [] }) {
  const safeProducts = Array.isArray(products) ? products : [];

  const stats = useMemo(() => {
    if (!safeProducts.length) {
      return { total: 0, active: 0, soldOut: 0, deleted: 0 };
    }

    const total = safeProducts.length;
    const active = safeProducts.filter((p) => p.isUse === true).length;
    const soldOut = safeProducts.filter(
      (p) => p.stockCount === 0 || p.status === "SOLD_OUT"
    ).length;
    const deleted = safeProducts.filter((p) => p.isDeleted === true).length;

    return { total, active, soldOut, deleted };
  }, [safeProducts]);

  const cards = [
    {
      title: "전체 등록 상품",
      value: `${stats.total}개`,
      sub: "",
      color: "bg-blue-50",
    },
    {
      title: "판매 중인 상품",
      value: `${stats.active}개`,
      sub: "",
      color: "bg-green-50",
    },
    {
      title: "품절 상품",
      value: `${stats.soldOut}개`,
      sub: `품목 ${stats.soldOut}개`,
      color: "bg-red-50",
    },
    {
      title: "삭제 상품",
      value: `${stats.deleted}개`,
      sub: "",
      color: "bg-gray-50",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-5">상품 현황</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div
            key={i}
            className={`${c.color} border border-gray-200 rounded-xl p-4 flex items-center justify-between transition hover:shadow-sm hover:bg-gray-100`}
          >
            <div>
              <p className="text-sm text-gray-500">{c.title}</p>
              <p className="text-lg font-semibold text-gray-900">{c.value}</p>
              {c.sub && (
                <p className="text-xs text-red-500 mt-1 font-medium">{c.sub}</p>
              )}
            </div>
            <div className="p-2 rounded-lg bg-white shadow-sm">{c.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
