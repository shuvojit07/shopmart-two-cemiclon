"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ProductForm from "../../components/ProductForm";
import toast from "react-hot-toast";
import Link from "next/link";

export default function EditProduct() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        toast.error("Product not found");
        router.push("/seller/products");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id, router]);

  const onSubmit = async (data) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      toast.success("Changes saved successfully!");
      router.push("/seller/products");
    } catch (err) {
      toast.error("Update failed. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-ring loading-lg text-amber-500"></span>
          <p className="text-black font-black uppercase tracking-widest text-xs">
            Retrieving Data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] py-12 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/seller/products"
            className="group flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-black transition-colors"
          >
            Cancel Changes
          </Link>

          <span className="text-[10px] font-black bg-black text-amber-400 px-3 py-1 rounded-full uppercase tracking-tighter">
            Product ID: {id.slice(-6)}
          </span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-black tracking-tight uppercase">
            Edit Listing
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Updating:{" "}
            <span className="text-black font-bold">{product?.name}</span>
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white border-2 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">

          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {isUpdating && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center rounded-xl">
                <span className="loading loading-bars loading-md text-black"></span>
                <p className="text-xs font-black mt-2 uppercase">
                  Saving...
                </p>
              </div>
            )}

            <ProductForm
              defaultValues={product}
              onSubmit={onSubmit}
              isLoading={isUpdating}
            />
          </div>
        </div>
      </div>
    </div>
  );
}