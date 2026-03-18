import { NextResponse } from "next/server";
import Order from "@/models/Order";
import { connectDB } from "@/lib/db";

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();
    const status = formData.get("status");
    const tran_id = formData.get("tran_id");

    if (status === "VALID" || status === "VALIDATED") {
      await Order.findOneAndUpdate(
        { tran_id: tran_id },
        { paymentStatus: "paid", escrowStatus: "hold" }
      );
    }

    return NextResponse.json({ message: "IPN Received" });
  } catch (err) {
    return NextResponse.json({ error: "IPN failed" }, { status: 500 });
  }
}