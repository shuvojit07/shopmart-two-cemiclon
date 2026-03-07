import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const tran_id = searchParams.get("id");
    if (!tran_id) {
      return NextResponse.json({ error: "Transaction ID missing" }, { status: 400 });
    }
    const updatedOrder = await Order.findOneAndUpdate(
      { tran_id: tran_id },
      { paymentStatus: "paid" },
      { new: true }
    );
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const redirectUrl = new URL(`/payment/success?tran_id=${tran_id}`, baseUrl)
    return NextResponse.redirect(redirectUrl.toString(), 303);
  } catch (error) {
    console.error("Success Route Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}