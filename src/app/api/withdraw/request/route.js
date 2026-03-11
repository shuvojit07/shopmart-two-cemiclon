import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Withdrawal from "@/models/Withdrawal";
import { getServerSession } from "next-auth";

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession();
    const { amount, method, accountDetails } = await req.json();

    const user = await User.findOne({ email: session.user.email });

    if (user.balance < amount) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
    }

    // ১. ব্যালেন্স আপডেট
    user.balance -= amount;
    user.pendingWithdrawal += amount;
    await user.save();

    // ২. উইথড্রয়াল রেকর্ড তৈরি
    await Withdrawal.create({
      seller: user._id,
      amount,
      method,
      accountDetails,
      status: "pending"
    });

    return NextResponse.json({ message: "Request sent" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}