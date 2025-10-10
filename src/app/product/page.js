import Link from "next/link";
import ProductCardPurchase from "@/components/product/ProductCardPurchase";
import ProductListCategory from "@/components/product/ProductListCategory";

async function getProducts() {
    // type 고정: PURCHASE
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?type=PURCHASE`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
}

const categoryMap = {
    "청소기": "가전",
    "공기청정기": "가전",
    "세탁기": "가전제품",
    "스타일러": "신발관리기",
};

export default async function ProductListPage({ searchParams }) {
    const category = searchParams?.category || null;
    const products = await getProducts();

    const filtered =
        category && category !== "전체"
            ? products.filter((p) => {
                const mapped = categoryMap[category] || category;
                return p.productCategory === mapped;
            })
            : products;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-6">
                <div className="inline-flex flex-wrap items-center gap-2">
                    <ProductListCategory selected={category} />
                </div>
            </div>

            {filtered.length === 0 ? (
                <p className="p-6">상품이 없습니다.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {filtered.map((p) => (
                        <Link key={p.productId} href={`/product/${p.productId}`}>
                            <ProductCardPurchase product={p} />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
