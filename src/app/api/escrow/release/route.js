import { NextResponse } from "next/server";
import Order from "@/models/Order";
import { connectDB } from "@/lib/db";

export async function PATCH(req) {
  try {
    await connectDB();
    const { orderId, userId } = await req.json();

    const order = await Order.findById(orderId);

    // Only the buyer can confirm receipt
    if (order.buyer.toString() !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    order.escrowStatus = "released";
    order.isDelivered = true;
    await order.save();

    return NextResponse.json({ message: "Funds released to seller!" });
  } catch (err) {
    return NextResponse.json({ error: "Escrow failed" }, { status: 500 });
  }
}