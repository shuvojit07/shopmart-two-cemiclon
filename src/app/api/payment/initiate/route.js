import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { items, customer, amount } = body;

    const transactionId = `TXN-${Date.now()}`;
    const base_url = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // SSLCommerz Form Data
    const formData = new URLSearchParams();
    formData.append("store_id", "testbox"); 
    formData.append("store_passwd", "qwerty"); 
    formData.append("total_amount", amount);
    formData.append("currency", "BDT");
    formData.append("tran_id", transactionId);
    
    // Redirect URLs
    formData.append("success_url", `${base_url}/api/payment/success?id=${transactionId}`);
    formData.append("fail_url", `${base_url}/api/payment/fail?id=${transactionId}`);
    formData.append("cancel_url", `${base_url}/api/payment/cancel?id=${transactionId}`);
    
    // Customer Info
    formData.append("cus_name", customer?.name || "Customer");
    formData.append("cus_email", customer?.email || "test@test.com");
    formData.append("cus_phone", customer?.phone || "01700000000");
    formData.append("cus_add1", "Dhaka");
    formData.append("cus_city", "Dhaka");
    formData.append("cus_country", "Bangladesh");

    // Important for displaying all methods (Bkash, Visa, etc.)
    formData.append("shipping_method", "NO");
    formData.append("product_name", "Order Item");
    formData.append("product_category", "Goods");
    formData.append("product_profile", "general");

    // API Call to SSLCommerz
    const response = await fetch("https://sandbox.sslcommerz.com/gwprocess/v4/api.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    });

    const result = await response.json();

    if (result?.status === "SUCCESS") {
      // Create Pending Order
      await Order.create({
        buyer: customer.userId || "657863f69989b53765432101", 
        seller: items[0]?.sellerId || "657863f69989b53765432102",
        product: items[0]?.productId || "657863f69989b53765432103",
        amount: parseFloat(amount),
        tran_id: transactionId,
      });

      return NextResponse.json({ url: result.GatewayPageURL });
    }

    return NextResponse.json({ error: "SSL Gateway Error" }, { status: 400 });

  } catch (error) {
    console.error("Backend Crash:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}