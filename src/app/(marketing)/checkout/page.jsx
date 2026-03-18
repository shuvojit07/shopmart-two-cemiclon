"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Truck, CreditCard, User, Phone, MapPin } from "lucide-react";

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Cart theke total calculate kora
  const total = cart.reduce((sum, item) => sum + (item.discountPrice || item.price), 0);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Your bag is empty!");

    setLoading(true);
    const formData = new FormData(e.target);
    // handlePayment function-er vitorer nicher change-tuku korun:

const paymentData = {
  amount: total, // Backend 'amount' destruct korche, tai totalAmount er jaygay amount din
  items: cart.map(item => ({
    name: item.name,
    price: item.discountPrice || item.price,
    productId: item._id
  })),
  customer: {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
  },
};


    try {
      const res = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // SSLCommerz URL-e redirect
      }
    } catch (error) {
      console.error("Payment failed", error);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-black text-slate-900 mb-4">Your bag is empty</h2>
        <button onClick={() => router.push("/shop")} className="bg-amber-500 text-white px-8 py-3 rounded-xl font-bold">Return to Shop</button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
        
        {/* Left Side: Shipping Form */}
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-slate-100">
          <h2 className="text-3xl font-black text-slate-900 mb-8">Shipping Info</h2>
          <form onSubmit={handlePayment} className="space-y-5">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input name="name" type="text" placeholder="Full Name" required className="checkout-field pl-12" />
            </div>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input name="phone" type="text" placeholder="Phone Number" required className="checkout-field pl-12" />
            </div>
            <input name="email" type="email" placeholder="Email Address" required className="checkout-field" />
            <div className="relative">
              <MapPin className="absolute left-4 top-4 text-slate-400" size={18} />
              <textarea name="address" placeholder="Full Address" required className="checkout-field pl-12 h-32 pt-4" />
            </div>

            <button 
              disabled={loading}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-amber-600 transition-all flex items-center justify-center gap-3"
            >
              {loading ? "Redirecting..." : <><CreditCard /> Pay & Secure Funds</>}
            </button>
          </form>
        </div>

        {/* Right Side: Order Summary */}
        <div className="space-y-6">
          <div className="bg-amber-500 p-8 rounded-[3rem] text-white">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck size={28} />
              <h3 className="text-xl font-black uppercase tracking-tight">Escrow Protected</h3>
            </div>
            <p className="text-amber-50 font-medium text-sm leading-relaxed">
              Your payment will be held securely. The seller only receives the money after you confirm delivery.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="font-black text-slate-900 text-xl mb-6">Order Summary</h3>
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center mb-4">
                <div className="flex gap-4 items-center">
                  <img src={item.img} className="w-16 h-16 rounded-xl object-cover" />
                  <p className="font-bold text-slate-700">{item.name}</p>
                </div>
                <p className="font-black text-slate-900">${item.discountPrice || item.price}</p>
              </div>
            ))}
            <div className="border-t border-slate-100 mt-6 pt-6 flex justify-between items-center">
              <span className="text-slate-500 font-bold">Total Amount</span>
              <span className="text-3xl font-black text-amber-600">${total}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}