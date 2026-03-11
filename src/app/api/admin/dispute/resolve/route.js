import { NextResponse } from "next/server";
import Order from "@/models/Order";
import { connectDB } from "@/lib/db";
import { sendEmail } from "@/lib/mail"; // Email utility function

export async function PATCH(req) {
  try {
    await connectDB();
    const { orderId, action } = await req.json(); // action: 'released' OR 'refunded'

    const order = await Order.findById(orderId).populate("buyer seller product");

    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    // 1. Update Status
    order.escrowStatus = action; 
    order.resolution = action;
    await order.save();

    // 2. Notify Both Parties via Email
    const buyerSubject = `Dispute Resolution for Order #${order.tran_id}`;
    const sellerSubject = `Escrow Update: Dispute Resolved`;

    const message = action === "released" 
      ? `The dispute has been resolved in favor of the Seller. Funds have been released.`
      : `The dispute has been resolved in favor of the Buyer. A refund has been initiated.`;

    // Send to Buyer
    await sendEmail(order.buyer.email, buyerSubject, message);
    // Send to Seller
    await sendEmail(order.seller.email, sellerSubject, message);

    return NextResponse.json({ message: `Dispute resolved as ${action}` });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}