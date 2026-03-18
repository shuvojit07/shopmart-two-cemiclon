import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();
    const tran_id = formData.get("tran_id");

    if (tran_id) {
      await Order.findOneAndUpdate(
        { tran_id: tran_id },
        { paymentStatus: "cancelled" }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    // ইউজার ক্যান্সেল করলে তাকে সরাসরি ড্যাশবোর্ডে ব্যাক করানো ভালো
    return NextResponse.redirect(`${baseUrl}/dashboard`, 303);
  } catch (err) {
    console.error("Cancel Route Error:", err.message);
    return NextResponse.json({ error: "Failed to process cancel route" }, { status: 500 });
  }
}