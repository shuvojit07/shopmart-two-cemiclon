import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession();

    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await User.findOne({ email: session.user.email }).select("balance pendingWithdrawal");

    return NextResponse.json({
      balance: user.balance || 0,
      pendingWithdrawal: user.pendingWithdrawal || 0
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}