import { NextResponse } from "next/server";
import SSLCommerzPayment from "sslcommerz-lts";
import Order from "@/models/Order";
import { connectDB } from "@/lib/db";

export async function POST(req) {
  await connectDB();
  const { productId, amount, userId, sellerId } = await req.json();
  const tran_id = `TXN_${Date.now()}`;

  const data = {
    total_amount: amount,
    currency: "BDT",
    tran_id: tran_id,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/success?id=${tran_id}`,
    fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/fail`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/cancel`,
    product_name: "Escrow Purchase",
    cus_name: "Buyer Name",
    cus_email: "buyer@example.com",
    shipping_method: "NO",
  };

  // Create pending order in DB
  await Order.create({
    buyer: userId,
    seller: sellerId,
    product: productId,
    amount: amount,
    tran_id: tran_id,
    paymentStatus: "pending",
    escrowStatus: "hold"
  });

  const sslcz = new SSLCommerzPayment(
    process.env.STORE_ID,
    process.env.STORE_PASS,
    false // true for live
  );

  const apiRes = await sslcz.init(data);
  return NextResponse.json({ url: apiRes.GatewayPageURL });
}