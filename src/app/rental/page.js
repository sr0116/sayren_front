import RentalList from "@/components/product/RentalList";

export const revalidate = false;
export default async function RentalListPage({ searchParams }) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product`, {
    // cache: "no-store"  // 캐시 막는
  });


  if (!res.ok) {
    return (
      <div>
        <h1 className="text-center mb-16 font-semibold text-2xl">서버 에러가 발생했습니다.</h1>
        <p>상품을 가져올 수 없습니다.</p>
      </div>
    );
  }

  const products = await res.json();


  if(products === null || products === undefined) {
    return (<div>불러오는 중</div>)
  }

  return (
    <div>
      <RentalList products={products} searchParams={searchParams} />
    </div>
  );
}