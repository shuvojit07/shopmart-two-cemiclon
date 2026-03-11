import { NextResponse } from "next/server";
import Order from "@/models/Order";
import { connectDB } from "@/lib/db";

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();
    const tran_id = formData.get("tran_id");

    await Order.findOneAndUpdate(
      { tran_id: tran_id },
      { paymentStatus: "failed" }
    );

    return NextResponse.redirect(
      new URL(`/buyer/orders?status=failed`, req.url),
      303
    );
  } catch (err) {
    return NextResponse.json({ error: "Failed to process failure route" });
  }
}