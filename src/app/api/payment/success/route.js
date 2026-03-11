// src/app/api/payment/success/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await connectDB();

    // SSLCommerz ডাটা পাঠায় Form Data হিসেবে
    const formData = await req.formData();
    const tran_id = formData.get("tran_id");
    const status = formData.get("status");

    if (!tran_id || status !== "VALID") {
      return NextResponse.json({ error: "Invalid Transaction or Status" }, { status: 400 });
    }

    // অর্ডার আপডেট করা (paymentStatus: "paid" এবং escrowStatus: "hold")
    const updatedOrder = await Order.findOneAndUpdate(
      { tran_id: tran_id },
      { 
        paymentStatus: "paid",
        escrowStatus: "hold" // পেমেন্ট সফল হলে টাকা এসক্রোতে জমা হয়
      },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // ইউজারকে সাকসেস পেজে রিডাইরেক্ট করা
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    return NextResponse.redirect(`${baseUrl}/payment/success?id=${tran_id}`, 303);

  } catch (error) {
    console.error("Success Route Error:", error.message);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}