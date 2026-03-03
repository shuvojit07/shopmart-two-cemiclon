"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProductsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status !== "authenticated" || session?.user?.role !== "seller")
      return;

    async function fetchProducts() {
      try {
        const res = await fetch("/api/products?seller=true");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [status, session, router]);

  if (loading || status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-2">
          <span className="loading loading-spinner loading-lg text-amber-500"></span>
          <p className="text-sm font-medium text-slate-400">Loading Inventory...</p>
        </div>
      </div>
    );
  }

  if (session?.user?.role !== "seller") {
    return (
      <div className="flex min-h-screen items-center justify-center text-black font-semibold">
        Access Denied: Seller Account Required
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-black tracking-tight">
              Inventory
            </h1>
            <p className="text-slate-500 mt-2 text-lg">
              Manage and monitor your store products
            </p>
          </div>
          <Link 
            href="/seller/products/create" 
            className="bg-amber-400 hover:bg-amber-500 text-black px-6 py-3 rounded-lg font-bold transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none border-2 border-black flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Product
          </Link>
        </div>

        {/* Product Table Card */}
        <div className="bg-white border-2 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]">
          {products.length === 0 ? (
            <div className="py-20 text-center">
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-slate-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10.125 2.25h3.75m-3.75 0a1.125 1.125 0 01-1.125 1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-5.625c0-.621-.504-1.125-1.125-1.125z" />
                </svg>
              </div>
              <h3 className="text-black font-bold text-xl">No products yet</h3>
              <p className="text-slate-500 mb-6">Your inventory is currently empty.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-black bg-slate-50">
                    <th className="py-4 px-6 text-black font-bold uppercase text-xs tracking-widest">Product Name</th>
                    <th className="text-black font-bold uppercase text-xs tracking-widest">Price</th>
                    <th className="text-black font-bold uppercase text-xs tracking-widest">Stock Level</th>
                    <th className="text-black font-bold uppercase text-xs tracking-widest">Status</th>
                    <th className="text-black font-bold uppercase text-xs tracking-widest text-right px-6">Manage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((p) => (
                    <tr key={p._id} className="hover:bg-amber-50/50 transition-colors group">
                      <td className="py-5 px-6">
                        <span className="font-bold text-black group-hover:text-amber-600 transition-colors">{p.name}</span>
                      </td>
                      <td className="font-medium text-slate-600">
                        ${Number(p.price).toLocaleString()}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${p.stock > 0 ? 'bg-amber-400' : 'bg-red-500'}`}></span>
                          <span className="font-medium text-slate-700">{p.stock} units</span>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`inline-block px-3 py-1 text-[10px] font-black uppercase tracking-tighter border-2 ${
                            p.isAvailable 
                              ? "bg-black text-amber-400 border-black" 
                              : "bg-white text-slate-400 border-slate-200"
                          }`}
                        >
                          {p.isAvailable ? "Active" : "Hidden"}
                        </span>
                      </td>
                      <td className="text-right px-6">
                        <Link
                          href={`/seller/products/${p._id}`}
                          className="inline-flex items-center font-bold text-sm text-black hover:bg-black hover:text-white border-2 border-black px-4 py-1.5 rounded transition-all active:scale-90"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* Footer Info */}
        <p className="mt-6 text-center text-slate-400 text-sm">
          Showing {products.length} products in your store.
        </p>
      </div>
    </div>
  );
}