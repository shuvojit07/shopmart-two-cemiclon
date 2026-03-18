import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order"; 

export async function POST(req) {
  try {
    await connectDB();
    
  
    const body = await req.json();
    const { items, customer, amount } = body;

   
    if (!items || !customer || !amount) {
      return NextResponse.json({ error: "Missing required data" }, { status: 400 });
    }

    const transactionId = `TXN-${Date.now()}`;
    const base_url = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

   
    const formData = new URLSearchParams();
    formData.append("store_id", "testbox"); 
    formData.append("store_passwd", "qwerty"); 
    formData.append("total_amount", amount.toString());
    formData.append("currency", "BDT");
    formData.append("tran_id", transactionId);
    
    formData.append("success_url", `${base_url}/api/payment/success?id=${transactionId}`);
    formData.append("fail_url", `${base_url}/api/payment/fail?id=${transactionId}`);
    formData.append("cancel_url", `${base_url}/api/payment/cancel?id=${transactionId}`);
    
    formData.append("cus_name", customer?.name || "Customer");
    formData.append("cus_email", customer?.email || "test@test.com");
    formData.append("cus_phone", customer?.phone || "01700000000");
    formData.append("cus_add1", customer?.address || "Dhaka");
    formData.append("cus_city", "Dhaka");
    formData.append("cus_country", "Bangladesh");

    formData.append("shipping_method", "NO");
    formData.append("num_of_item", items.length.toString());
    formData.append("product_name", items[0]?.name || "Order Item");
    formData.append("product_category", "Goods");
    formData.append("product_profile", "general");

    const response = await fetch("https://sandbox.sslcommerz.com/gwprocess/v4/api.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    const result = await response.json();

    if (result?.status === "SUCCESS") {
     
      try {
        await Order.create({
          buyer: customer.userId || "657863f69989b53765432101", 
          seller: items[0]?.sellerId || "657863f69989b53765432102",
          product: items[0]?.productId || "657863f69989b53765432103",
          amount: parseFloat(amount),
          tran_id: transactionId,
          status: "pending",
        });
      } catch (dbError) {
        console.error("Database Order Creation Failed:", dbError);
        
      }

      return NextResponse.json({ url: result.GatewayPageURL });
    }

    return NextResponse.json({ error: result?.failedreason || "Gateway Error" }, { status: 400 });

  } catch (error) {
    
    console.error("SERVER_ERROR_DETAIL:", error); 
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}