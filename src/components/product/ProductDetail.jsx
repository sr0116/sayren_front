import ProductCartOrBuy from "@/components/product/ProductCartOrBuy";
import ProductDetailDescription from "@/components/product/ProductDetailDescription";

export default function ProductDetail({product , type}){
  return(
    <div className="max-w-6xl mx-auto p-6">
      {/* 상품 이미지 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12">
        <div className="w-full">
          {product.thumbnailUrl ? (
            <img
              src={product.thumbnailUrl}
              alt={product.productName}
              width={600}
              height={600}
              className="rounded-lg shadow-md object-cover w-full"
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded">
              No Image
            </div>
          )}
        </div>

        {/* 상품 상세 */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold">{product.productName}</h1>
          <p className="text-sm text-gray-500">
            카테고리: {product.productCategory} | 모델명: {product.modelName}
          </p>

          {/* 가격 표시 */}
          <ProductCartOrBuy productId={product.productId} type={type} price={product.price} />
        </div>
      </div>

      {/* 상세 설명 */}
      {product.description && <ProductDetailDescription html={product.description} />}
    </div>
  )
}