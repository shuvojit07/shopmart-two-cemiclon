"use client";

import { useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Package, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccess() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const tranId = searchParams.get("id");

  // Payment success hole cart khali kore deya bhalo
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-200 border border-slate-100 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={48} strokeWidth={2.5} />
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 mb-2">Payment Received!</h1>
        <p className="text-slate-500 font-medium mb-8">
          Your funds are now safely held in <span className="text-amber-600 font-bold text-sm">Escrow</span>. 
          The seller will be notified to ship your product.
        </p>

        <div className="bg-slate-50 rounded-2xl p-4 mb-8 text-left border border-slate-100">
          <div className="flex justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Transaction ID</span>
            <span className="text-xs font-black text-slate-900">{tranId || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2 text-green-700 font-bold text-xs uppercase bg-green-50 px-3 py-1 rounded-lg w-fit">
            <ShieldCheck size={14} /> Verified by SSLCommerz
          </div>
        </div>

        <div className="space-y-3">
          <Link 
            href="/buyer/orders" 
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-amber-600 transition-all"
          >
            Track My Order <Package size={18} />
          </Link>
          <Link 
            href="/shop" 
            className="w-full bg-white text-slate-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
          >
            Continue Shopping <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}