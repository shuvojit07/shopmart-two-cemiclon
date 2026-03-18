import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function PATCH(req) {
  try {
    await connectDB();
    const { orderId, trackingNumber, sellerId } = await req.json();

    const order = await Order.findById(orderId);
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    order.escrowStatus = "shipped";
    order.trackingNumber = trackingNumber;
    order.escrowHistory.push({
      status: "shipped",
      changedBy: sellerId,
      note: `Seller shipped the product. Tracking: ${trackingNumber}`
    });

    await order.save();
    return NextResponse.json({ message: "Order marked as shipped!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}