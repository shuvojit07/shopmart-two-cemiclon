import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Withdrawal from "@/models/Withdrawal";
import User from "@/models/User";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession();

    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await User.findOne({ email: session.user.email });
    
    // সেলারের সব উইথড্রয়াল ডাটা নিয়ে আসা
    const payouts = await Withdrawal.find({ seller: user._id }).sort({ createdAt: -1 });

    return NextResponse.json(payouts);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}