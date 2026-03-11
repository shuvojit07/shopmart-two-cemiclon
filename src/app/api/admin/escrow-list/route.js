import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET() {
  try {
    await connectDB();

    const pendingReleases = await Order.find({ 
      isDelivered: true, 
      escrowStatus: "hold" 
    }).sort({ updatedAt: -1 });

    return NextResponse.json(pendingReleases);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}