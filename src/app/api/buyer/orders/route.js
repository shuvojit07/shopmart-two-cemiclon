import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession();

    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // ইউজারের নিজের অর্ডারগুলো খুঁজে বের করা (পপুলেট সহ)
    const orders = await Order.find({ buyer: session.user.id })
      .sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}