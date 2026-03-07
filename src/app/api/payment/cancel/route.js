import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  await connectDB();

  const body = await req.json();
  const { tran_id } = body;

  await Order.findOneAndUpdate(
    { tran_id },
    { paymentStatus: "cancelled" }
  );

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`
  );
}