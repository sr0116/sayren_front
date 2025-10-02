import ProductRegister from "@/components/product/ProductRegister";

export default function ProductNewPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">신규 상품 등록</h1>
      <ProductRegister />
    </div>
  );
}
