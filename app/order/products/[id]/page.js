import Image from "next/image";
import Button from "@/components/common/Button";
import AddToCartButton from "@/components/order/AddToCartButton";

export const revalidate = 0;

async function getProduct(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetailPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <p className="text-gray-500">상품 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{product.productName}</h1>
      <p className="text-lg mb-4">{product.price.toLocaleString()}원</p>

      <div className="flex gap-3">
        {/*  장바구니 버튼 */}
        <AddToCartButton productId={params.id} planId={1}/>
        <Button className="bg-[#ff0066] text-white px-6 py-2 rounded">
          바로 구매
        </Button>
      </div>
    </div>
  );
}
