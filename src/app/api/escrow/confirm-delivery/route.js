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

    // 1. Order-ti khuje ber kora
    const order = await Order.findById(orderId);
    if (!order || order.buyer.toString() !== session.user.id) {
      return NextResponse.json({ error: "Order not found or unauthorized" }, { status: 404 });
    }

    if (order.escrowStatus === "released") {
      return NextResponse.json({ error: "Funds already released" }, { status: 400 });
    }

    // 2. Update Order Status
    order.escrowStatus = "released";
    await order.save();

    // 3. Add funds to Seller's Wallet
    // Amra dhore nichhi User model-e 'balance' field-ti ache
    await User.findByIdAndUpdate(order.seller, {
      $inc: { balance: order.amount }
    });

    return NextResponse.json({ message: "Funds released to seller successfully!" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}