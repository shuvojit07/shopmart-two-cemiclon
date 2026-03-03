"use client";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Heart } from "lucide-react";

const products = [
  { id: 1, name: "Premium Wireless Headphones", price: "$100", oldPrice: "$150", rating: 4.8, reviews: 124, discount: "33% OFF" },
  { id: 2, name: "Smart Watch Series 7", price: "$120", oldPrice: "$180", rating: 4.9, reviews: 89, discount: "25% OFF" },
  { id: 3, name: "Minimalist Leather Wallet", price: "$45", oldPrice: "$90", rating: 4.5, reviews: 56, discount: "50% OFF" },
  { id: 4, name: "Mechanical Gaming Keyboard", price: "$150", oldPrice: "$200", rating: 4.7, reviews: 210, discount: "20% OFF" },
];

export default function ProductPreview() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Flash Sale</h2>
            <p className="text-slate-500 mt-2">Top deals ending soon!</p>
          </div>
          <button className="text-orange-600 font-bold hover:underline">View All</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 relative"
            >
              {/* Discount Badge */}
              <div className="absolute top-4 left-4 z-10 bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                {product.discount}
              </div>

              {/* Wishlist Button */}
              <button className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-400 hover:text-red-500 transition-colors">
                <Heart size={18} />
              </button>

              {/* Image Placeholder */}
              <div className="h-56 bg-slate-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                {/* Product Image would go here */}
                <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium">
                  Image Preview
                </div>
                
                {/* Hover Add to Cart */}
                <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full bg-slate-900 text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg">
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="flex items-center gap-1 mb-2">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                  <span className="text-xs text-slate-400">({product.reviews})</span>
                </div>
                
                <h4 className="font-bold text-slate-800 mb-1 truncate group-hover:text-orange-600 transition-colors">
                  {product.name}
                </h4>
                
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-slate-900">{product.price}</span>
                  <span className="text-sm text-slate-400 line-through">{product.oldPrice}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}