import { NextResponse } from "next/server";
import Order from "@/models/Order";
import User from "@/models/User"; 
import { connectDB } from "@/lib/db";
import { sendEmail } from "@/lib/mail";

export async function PATCH(req) {
  try {
    await connectDB();
    const { orderId, action } = await req.json(); 

    const order = await Order.findById(orderId).populate("buyer seller product");
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    if (action === "released") {
      
      await User.findByIdAndUpdate(order.seller._id, {
        $inc: { balance: order.amount }
      });
      order.status = "Completed";
    } else if (action === "refunded") {

      await User.findByIdAndUpdate(order.buyer._id, {
        $inc: { balance: order.amount }
      });
      order.status = "Refunded";
    }

   
    order.escrowStatus = action; 
    order.resolution = action;
    await order.save();

    
    const resultMessage = action === "released" 
      ? `The dispute for Order #${order.tran_id} has been resolved in favor of the Seller. Funds (৳${order.amount}) have been released to the seller's wallet.`
      : `The dispute for Order #${order.tran_id} has been resolved in favor of the Buyer. A refund of ৳${order.amount} has been added to the buyer's wallet.`;

    
    try {
      await sendEmail(order.buyer.email, `Dispute Resolution: #${order.tran_id}`, resultMessage);
      await sendEmail(order.seller.email, `Escrow Update: #${order.tran_id}`, resultMessage);
    } catch (emailErr) {
      console.error("Email failed but DB updated:", emailErr);
    }

    return NextResponse.json({ 
      success: true, 
      message: `Dispute resolved as ${action}. Funds moved successfully.` 
    });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}