"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  const router = useRouter();
  const { data: session } = useSession();

  const { name, slug, price, discountPrice, img, category, rating, isAvailable } = product;
  const finalPrice = discountPrice || price;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!session) {
      alert("Please login to add items to cart!");
      router.push("/login");
      return;
    }
    // Add to cart logic here
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Image Section */}
      <div 
        className="relative h-64 overflow-hidden cursor-pointer"
        onClick={() => router.push(`/product/${slug}`)}
      >
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {!isAvailable && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-white text-slate-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Sold Out
            </span>
          </div>
        )}
      </div> 

      {/* Content Section */}   
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
          className="font-bold text-slate-900 text-lg leading-snug mb-3 cursor-pointer hover:text-amber-600 transition-colors line-clamp-1"
          onClick={() => router.push(`/product/${slug}`)}
        >
          {name}
        </h3>

        <div className="flex items-center gap-3 mb-5">
          <span className="text-2xl font-black text-slate-900">${finalPrice}</span>
          {discountPrice && (
            <span className="text-sm text-slate-400 line-through font-medium">
              ${price}
            </span>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={handleAddToCart}
          disabled={!isAvailable}
          className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${
            isAvailable 
              ? "bg-amber-500 text-white shadow-lg shadow-amber-200 hover:bg-amber-600" 
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          {isAvailable ? (
            <>
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
            </>
          ) : (
            "Not Available"
          )}
        </button>
      </div>
    </motion.div>
  );
}