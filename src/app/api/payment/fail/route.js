import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData(); // SSLCommerz formData পাঠায়
    const tran_id = formData.get("tran_id");

    if (tran_id) {
      await Order.findOneAndUpdate(
        { tran_id: tran_id },
        { paymentStatus: "failed" }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    // ইউজারকে ড্যাশবোর্ডে পাঠানো হচ্ছে যাতে সে আবার চেষ্টা করতে পারে
    return NextResponse.redirect(`${baseUrl}/dashboard?status=failed`, 303);
  } catch (err) {
    console.error("Fail Route Error:", err.message);
    return NextResponse.json({ error: "Failed to process failure route" }, { status: 500 });
  }
}