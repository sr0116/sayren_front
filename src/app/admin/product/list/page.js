import AdminProductList from "@/components/product/AdminProductList";
import AdminProductState from "@/components/product/AdminProductState";

export const revalidate = false;

export default async function ProductListPage({ searchParams }) {
    // 상품 목록 불러오기 (기존)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product`);
    if (!res.ok) {
        return (
            <div>
                <h1 className="text-center mb-16 font-semibold text-2xl">서버 에러가 발생했습니다.</h1>
                <p>상품을 가져올 수 없습니다.</p>
            </div>
        );
    }

    const products = await res.json();

    if (!products) {
        return <div>불러오는 중...</div>;
    }

    // 카테고리 목록도 SSR로 미리 불러오기
    const categoryRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/product/category`,
        {
            cache: "no-store",
        }
    );

    const rawCategories = categoryRes.ok ? await categoryRes.json() : [];
    const categories = Array.isArray(rawCategories)
        ? rawCategories
        : rawCategories.data || [];
    return (
        <div>
            <AdminProductState />
            {/* 상품 + 카테고리 함께 props로 전달 */}
            <AdminProductList
                products={products}
                categories={categories}
                searchParams={searchParams}
            />
        </div>
    );
}
