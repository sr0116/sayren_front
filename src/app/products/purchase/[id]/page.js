import Image from "next/image";
import Button from "@/components/common/Button";
import ProductDetail from "@/components/product/ProductDetail";

export const revalidate = false;

async function getProduct(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  data.cleanDescription = data.description;
  return data;
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
    <ProductDetail product={product}/>
//     <div className="max-w-6xl mx-auto p-6">
//       {/* 상단: 썸네일 + 상품 정보 */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12">
//         {/* 왼쪽: 대표 이미지 */}
//         <div className="w-full">
//           {product.thumbnailUrl ? (
//             <img
//               src={product.thumbnailUrl}
//               alt={product.productName}
//               width={600}
//               height={600}
//               className="rounded-lg shadow-md object-cover w-full"
//             />
//           ) : (
//             <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded">
//               No Image
//             </div>
//           )}
//         </div>
//
//         {/* 오른쪽: 상품 정보 */}
//         <div className="flex flex-col space-y-4">
//           {/* 상품명 */}
//           <h1 className="text-2xl font-bold">{product.productName}</h1>
//
//           {/* 태그 */}
//           {product.tags?.length > 0 && (
//             <p className="text-gray-400 text-sm">
//               {product.tags.map((tag, i) => (
//                 <span key={i} className="mr-2">#{tag}</span>
//               ))}
//             </p>
//           )}
//
//           {/* 카테고리 & 모델명 */}
//           <p className="text-sm text-gray-500">
//             {product.productCategory} | {product.modelName}
//           </p>
//
//           {/* 무료배송 */}
//           <div className="border-t border-b border-gray-200 py-3">
//             <span className="font-medium text-gray-700">무료배송</span>
//           </div>
//
//           {/* 총 금액 */}
//           <div className="mb-6">
//             <p className="text-lg font-semibold text-gray-800">
//               총 금액:{" "}
//               <span className="text-[#ff0066]">
//         {product.price?.toLocaleString()}원
//       </span>
//             </p>
//           </div>
//
//           {/* 버튼 영역 */}
//           <div className="flex gap-3 mt-2">
//             <Button className="bg-gray-800 text-white px-6 py-2 rounded">
//               장바구니 담기
//             </Button>
//             <Button className="bg-[#ff0066] text-white px-6 py-2 rounded">
//               바로 구매
//             </Button>
//           </div>
//         </div>
//       </div>
//
//       {/* 하단: 상세 설명 */}
//   <div>
//     {/* 구분선 */}
//     <hr className="my-8 border-t border-gray-200" />
//
//     <h2 className="text-2xl font-bold mb-6">제품 상세</h2>
//     <div
//       className="prose max-w-none"
//       dangerouslySetInnerHTML={{ __html: product.description }}
//     />
//   </div>
// </div>
  );
}
