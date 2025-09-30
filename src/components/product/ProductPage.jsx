import ProductGrid from "@/components/product/ProductGrid";

export default function ProductPage() {
  const products = [
    { id: 1, name: "LG QNED TV (벽걸이형)" },
    { id: 2, name: "LG 올레드 TV (스탠드형)" },
    { id: 3, name: "LG 울트라 HD TV" },
    { id: 4, name: "SAYREN OLED TV" },
  ];

  return <ProductGrid products={products} />;
}
