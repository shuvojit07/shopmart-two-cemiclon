import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import User from "@/models/User";

export async function PATCH(req) {
  try {
    await connectDB();
    const { orderId, adminId } = await req.json();

    const order = await Order.findById(orderId);
    if (order.escrowStatus === "released") {
      return NextResponse.json({ error: "Funds already released" }, { status: 400 });
    }

    // ১. অর্ডারের স্ট্যাটাস আপডেট
    order.escrowStatus = "released";
    order.escrowHistory.push({
      status: "released",
      changedBy: adminId,
      note: "Admin approved and released funds to seller wallet."
    });
    await order.save();

    // ২. সেলারের ওয়ালেটে টাকা যোগ করা (Platform Fee বাদে)
    await User.findByIdAndUpdate(order.seller, {
      $inc: { wallet: order.netSellerAmount }
    });

    return NextResponse.json({ message: "Funds released to seller wallet successfully!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}