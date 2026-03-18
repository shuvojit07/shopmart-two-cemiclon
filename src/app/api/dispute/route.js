import { NextResponse } from "next/server";
import Order from "@/models/Order";
import { connectDB } from "@/lib/db";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
  try {
    await connectDB();
    const token = await getToken({ req });
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { orderId, reason, details } = await req.json();

    // Order update: escrow status 'disputed' kora
    const order = await Order.findOneAndUpdate(
      { _id: orderId, buyer: token.id },
      { 
        escrowStatus: "disputed",
        disputeReason: reason, // New field needed in Schema
        disputeDetails: details 
      },
      { new: true }
    );

    return NextResponse.json({ message: "Dispute filed. Admin will review." });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}