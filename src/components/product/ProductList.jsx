import ProductGrid from "@/components/product/ProductGrid";

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`, {
    cache: "no-store", // 항상 최신
    // next: { revalidate: 60 } // ISR 원하면 이걸로
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function ProductList({ searchParams }) {
  const category = searchParams?.category || null;
  const products = await getProducts();

  const filtered = category
    ? products.filter((p) => p.productCategory === category)
    : products;

  return <ProductGrid products={filtered} />;
}
