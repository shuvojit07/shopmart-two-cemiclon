import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}