"use client";

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { ShoppingBag, ShieldCheck } from "lucide-react";
import { useState } from "react";

/**
 * ProductAction Component
 * @param {Object} product - The serialized product data from the server component
 */
export default function ProductAction({ product }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);

  const handleBuyNow = async () => {
    setIsAdding(true);
    
    try {
      // 1. Add product to the global cart state/localStorage
      await addToCart(product);
      
      // 2. Redirect to checkout page for address and payment
      router.push("/checkout");
    } catch (error) {
      console.error("Cart error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Buy Button */}
      <button
        onClick={handleBuyNow}
        disabled={isAdding}
        className="w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-white font-black py-5 px-8 rounded-2xl transition-all shadow-lg shadow-amber-100 flex items-center justify-center gap-3 group disabled:opacity-70"
      >
        {isAdding ? (
          <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <ShoppingBag size={22} className="group-hover:animate-bounce" />
            <span className="text-lg">Buy Now & Secure Escrow</span>
          </>
        )}
      </button>

      {/* Escrow Badge - Reassures user safety */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl">
        <ShieldCheck className="text-green-600" size={20} />
        <div>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">
            Safe Payment
          </p>
          <p className="text-xs font-bold text-slate-700">
            Money held in Escrow until delivery
          </p>
        </div>
      </div>
    </div>
  );
}