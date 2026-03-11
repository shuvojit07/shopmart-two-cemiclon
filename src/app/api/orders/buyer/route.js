import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth"; // অথবা আপনার সেশন হ্যান্ডলার

export async function GET(req) {
  try {
    await connectDB();
    
    // ১. বর্তমানে লগইন করা ইউজারের ইমেইল বা আইডি সেশন থেকে নিন
    const session = await getServerSession(); 
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // ২. শুধুমাত্র এই বায়ারের অর্ডারগুলো খুজুন
    const orders = await Order.find({ buyer: session.user.id })
                             .sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}