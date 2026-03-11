// components/dashboard/BuyerOrderCard.jsx
"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function BuyerOrderCard({ order }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const confirmReceipt = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch("/api/escrow/confirm-delivery", {
        method: "PATCH",
        body: JSON.stringify({ orderId: order._id }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        window.location.reload(); // UI রিফ্রেশ করার জন্য
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="border-2 border-black p-5 rounded-2xl bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <h4 className="font-black">{order.productName}</h4>
      <p className="text-sm text-slate-500 mb-4">Amount: ৳{order.amount}</p>
      
      {order.escrowStatus === "shipped" ? (
        <button 
          onClick={confirmReceipt}
          disabled={isUpdating}
          className="w-full bg-green-600 text-white font-black py-2 rounded-xl disabled:opacity-50"
        >
          {isUpdating ? "Processing..." : "Confirm Receipt"}
        </button>
      ) : (
        <span className="text-xs font-bold uppercase p-2 bg-slate-100 rounded-lg">
          Status: {order.escrowStatus}
        </span>
      )}
    </div>
  );
}