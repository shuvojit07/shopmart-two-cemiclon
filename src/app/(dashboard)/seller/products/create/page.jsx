"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ProductForm from "../../components/ProductForm";
import toast from "react-hot-toast";
import Link from "next/link";

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to create product");

      toast.success("Product created successfully!");
      router.push("/seller/products");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Navigation / Back Button */}
        <Link 
          href="/seller/products" 
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-black mb-6 transition-colors group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 transition-transform group-hover:-translate-x-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Inventory
        </Link>

        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-black tracking-tight">
            Add New Product
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Enter the details to list your item in the marketplace.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white border-2 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(251,191,36,1)]">
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <span className="loading loading-spinner loading-md text-amber-500"></span>
              </div>
            )}
            
            {/* The actual ProductForm component */}
            <ProductForm onSubmit={onSubmit} isLoading={loading} />
          </div>
        </div>

        {/* Helper Footer */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-amber-600 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <p className="text-sm text-amber-800 leading-relaxed">
            <span className="font-bold">Pro Tip:</span> High-quality images and clear descriptions help products sell up to 40% faster. Make sure your stock count is accurate to avoid cancellations.
          </p>
        </div>

      </div>
    </div>
  );
}