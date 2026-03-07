import ProductCard from "../shop/ProductCard";

export default function RelatedProducts({ products }) {

  if (!products.length) return null;

  return (
    <div className="mt-16">

      <h2 className="text-2xl font-bold mb-6">
        You may also like
      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        {products.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
          />
        ))}

      </div>

    </div>
  );
}