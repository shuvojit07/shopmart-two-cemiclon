"use client";
import { Package, Clock, CheckCircle } from "lucide-react";

export default function SellerDashboard({ sales }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Seller Sales Monitoring</h2>
      <div className="grid gap-4">
        {sales.map((order) => (
          <div key={order._id} className="bg-white p-5 rounded-2xl border flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-500">Order ID: {order.tran_id}</p>
              <h4 className="font-bold text-slate-900 text-lg">{order.product.name}</h4>
              <p className="font-bold text-amber-600">${order.amount}</p>
            </div>

            <div className="text-right">
              <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${
                order.escrowStatus === "released" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
              }`}>
                {order.escrowStatus === "released" ? "Paid to You" : "In Escrow"}
              </span>
              <p className="text-[10px] text-slate-400 mt-2">
                Buyer Status: {order.isDelivered ? "Received" : "Waiting for Delivery"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}