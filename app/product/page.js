import ProductList from "@/src/components/product/ProductList";

export const revalidate = false;

export default async function ProductListPage({ searchParams }) {
  // ✅ SSR 환경 감지 후 자동 분기
  const baseUrl =
      typeof window === "undefined"
          ? process.env.NEXT_SERVER_API_BASE_URL // SSR (Next 서버)
          : process.env.NEXT_PUBLIC_API_BASE_URL; // CSR (브라우저)

  console.log("🧩 ProductList SSR fetch →", baseUrl);

  try {
    const res = await fetch(`${baseUrl}/api/user/product`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const products = await res.json();
    return (
        <div>
          <ProductList products={products} searchParams={searchParams} />
        </div>
    );
  } catch (err) {
    console.error("❌ Fetch 실패:", err.message);
    return (
        <div className="text-center mt-20">
          <h1 className="text-2xl font-semibold mb-4">문제가 발생했습니다.</h1>
          <p className="text-gray-500">서버 연결에 실패했습니다.</p>
        </div>
    );
  }
}
