import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession();
    
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // ১. এই সেলারের সব অর্ডার খুঁজে বের করা
    const orders = await Order.find({ seller: session.user.id }).sort({ createdAt: -1 });

    // ২. ব্যালেন্স ক্যালকুলেট করা
    const totalEarnings = orders
      .filter(order => order.escrowStatus === "released")
      .reduce((sum, order) => sum + order.amount, 0);

    const pendingEscrow = orders
      .filter(order => order.escrowStatus === "hold")
      .reduce((sum, order) => sum + order.amount, 0);

    return NextResponse.json({ 
      orders, 
      totalEarnings, 
      pendingEscrow,
      totalSales: orders.length 
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}