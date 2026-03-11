"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ProductCard({ product }) {
  const router = useRouter();
  const { data: session } = useSession();

  const {
    name,
    slug,
    price,
    discountPrice,
    img,
    category,
    rating,
    isAvailable,
  } = product;

  const finalPrice = discountPrice || price;

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (!session) {
      alert("Please login to add items to cart!");
      router.push("/login");
      return;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >

      {/* Image */}
      <div
        className="relative h-64 overflow-hidden cursor-pointer"
        onClick={() => router.push(`/product/${slug}`)}
      >
        <Image
          src={img}
          alt={name}
          width={500}
          height={500}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {!isAvailable && (
          <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
            <span className="bg-white text-slate-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">

        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
            {category}
          </span>

          <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
            <Star size={14} fill="currentColor" />
            <span className="text-slate-700">{rating || "5.0"}</span>
          </div>
        </div>

        <h3
          className="font-bold text-slate-900 text-lg mb-3 cursor-pointer hover:text-amber-600 transition-colors"
          onClick={() => router.push(`/product/${slug}`)}
        >
          {name}
        </h3>

        <div className="flex items-center gap-3 mb-5">
          <span className="text-2xl font-black text-slate-900">
            ${finalPrice}
          </span>

          {discountPrice && (
            <span className="text-sm text-slate-400 line-through font-medium">
              ${price}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!isAvailable}
          className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
            isAvailable
              ? "bg-amber-500 text-white hover:bg-amber-600"
              : "bg-slate-100 text-slate-400"
          }`}
        >
          {isAvailable ? (
            <>
              <ShoppingCart size={18} />
              Add to Cart
            </>
          ) : (
            "Not Available"
          )}
        </button>

      </div>
    </motion.div>
  );
}