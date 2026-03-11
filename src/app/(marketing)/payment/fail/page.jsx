"use client";

import { XCircle, AlertCircle, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function PaymentFail() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-200 border border-slate-100 text-center">
        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle size={48} strokeWidth={2.5} />
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 mb-2">Payment Failed</h1>
        <p className="text-slate-500 font-medium mb-8 leading-relaxed">
          The transaction could not be completed. This might be due to insufficient funds or a network timeout.
        </p>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-8 flex gap-3 text-left">
          <AlertCircle className="text-amber-600 shrink-0" size={20} />
          <p className="text-xs text-amber-700 font-medium">
            Don't worry, your cart is still safe. You can try again using a different payment method.
          </p>
        </div>

        <Link 
          href="/checkout" 
          className="w-full bg-amber-500 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-amber-600 transition-all shadow-lg shadow-amber-100"
        >
          Try Again <RotateCcw size={18} />
        </Link>
      </div>
    </div>
  );
}