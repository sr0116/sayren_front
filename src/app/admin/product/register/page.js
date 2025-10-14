// import AdminProductRegister from "@/components/product/AdminProductRegister";
//
// export default function RegisterPage() {
//     return (
//         <div className="max-w-7xl mx-auto py-10 px-6">
//             <h1 className="text-2xl font-bold mb-8">상품 등록</h1>
//             <AdminProductRegister />
//         </div>
//     );
// }

import AdminProductRegisterList from "@/components/product/AdminProductRegisterList";

export const revalidate = false;
export default async function ProductListPage({searchParams}) {
    try {
        // 관리자용 승인 대기(= 등록 전) 상품만 가져옴
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SPRING_API_BASE_URL}/api/admin/product/pending`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            throw new Error("상품을 불러오는 데 실패했습니다.");
        }

        const data = await res.json();
        const products = data.list || data; // PageResponseDTO 구조 대응

        // 데이터 유효성 확인
        if (!products || products.length === 0) {
            return (
                <div className="p-10 text-center text-gray-500">
                    <h1 className="text-2xl font-bold mb-2">등록할 상품이 없습니다.</h1>
                    <p>현재 승인 대기 중인 상품이 없습니다.</p>
                </div>
            );
        }

        return (
            <div>
                <AdminProductRegisterList products={products} searchParams={searchParams} />
            </div>
        );
    } catch (err) {
        console.error("상품 목록 불러오기 실패:", err);
        return (
            <div className="p-10 text-center text-red-500">
                <h1 className="text-2xl font-bold mb-2">서버 오류</h1>
                <p>상품 목록을 불러오는 중 문제가 발생했습니다.</p>
            </div>
        );
    }
}
