"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ProductPreview({ products }) {
  const router = useRouter();
  const { data: session } = useSession();

  const handleAddToCart = (e, product) => {
    // 1. e.stopPropagation use kora hoyeche jate image-er link kaj na kore
    e.stopPropagation();
    e.preventDefault();

    if (!session) {
      alert("Please login first to add items to cart!");
      router.push("/login");
      return;
    }

    // Login thakle cart logic ekhane hobe
    console.log("Adding to cart:", product.name);
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-10">
          Flash <span className="text-amber-500">Sale</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              {/* --- IMAGE AREA (Click korle details e jabe) --- */}
              <Link href={`/product/${product.slug}`}>
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                </div>
              </Link>

              {/* --- CONTENT AREA --- */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded uppercase">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-bold text-slate-700">{product.rating || 0}</span>
                  </div>
                </div>

                <Link href={`/product/${product.slug}`}>
                  <h4 className="font-bold text-slate-900 text-lg hover:text-amber-600 transition-colors truncate">
                    {product.name}
                  </h4>
                </Link>

                <div className="mt-3 mb-6">
                  <span className="text-2xl font-black text-slate-900">
                    ${product.discountPrice || product.price}
                  </span>
                  {product.discountPrice && (
                    <span className="ml-2 text-sm text-slate-400 line-through">
                      ${product.price}
                    </span>
                  )}
                </div>

                {/* --- ADD TO CART BUTTON (Click korle page-e thakbe) --- */}
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-amber-200"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}