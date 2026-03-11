// src/app/api/escrow/confirm-delivery/route.js
import { NextResponse } from "next/server";
import Order from "@/models/Order";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { orderId } = await req.json();

    
    const order = await Order.findById(orderId);
    
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    
    if (order.buyer.toString() !== session.user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    if (order.escrowStatus !== "shipped") {
      return NextResponse.json({ error: "Order status must be 'shipped' to release funds" }, { status: 400 });
    }

    
    const payoutAmount = order.netSellerAmount || order.amount;

  
    order.escrowStatus = "released";
    order.status = "Completed";
    order.deliveredAt = Date.now();
    
    
    order.escrowHistory.push({
      status: "released",
      message: "Buyer confirmed delivery. Funds released to seller.",
      timestamp: Date.now()
    });

    await order.save();

   
    const updatedSeller = await User.findByIdAndUpdate(
      order.seller,
      { $inc: { balance: payoutAmount } },
      { new: true }
    );

    if (!updatedSeller) throw new Error("Failed to update seller balance");

    return NextResponse.json({ 
      success: true,
      message: `৳${payoutAmount} released to seller successfully!` 
    });

  } catch (err) {
    console.error("ESCROW_RELEASE_ERROR:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}