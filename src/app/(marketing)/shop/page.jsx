import ProductGrid from "@/components/shop/ProductGrid";

const products = [
  {
    name: "Sunlight Laptop Desk",
    slug: "sunlight-laptop-desk-8",
    price: 370,
    discountPrice: 330,
    category: "Gadgets",
    brand: "No Brand",
    sellerName: "Admin",
    stock: 100,
    isAvailable: true,
    img: "https://i.ibb.co.com/LXp6tmW0/imgi-33-laptop-with-sun-background.jpg",
    productDetails: "Laptop desk illuminated with sunlight background.",
    shortDescription: "Bright laptop desk",
    rating: 4.5,
  },
];

export default function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Shop</h1>

      <ProductGrid products={products} />
    </div>
  );
}