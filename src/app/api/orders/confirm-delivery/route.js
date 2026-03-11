import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function PATCH(req) {
  try {
    await connectDB();
    const { orderId } = await req.json();

    // অর্ডার আপডেট করুন: paymentStatus 'paid' এবং escrowStatus 'released'
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { 
        isDelivered: true, 
        escrowStatus: "released",
        paymentStatus: "paid" 
      },
      { new: true }
    );

    return NextResponse.json({ message: "Delivery confirmed and funds released!", order: updatedOrder });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}