import { NextResponse } from "next/server";
import Order from "@/models/Order";
import Withdrawal from "@/models/Withdrawal";
import { connectDB } from "@/lib/db";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
  try {
    await connectDB();
    const token = await getToken({ req });
    if (!token || token.role !== "seller") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount, method, accountDetails } = await req.json();

    // 1. Calculate Available Balance (Released status orders)
    const releasedOrders = await Order.find({
      seller: token.id,
      escrowStatus: "released",
      paymentStatus: "paid"
    });

    const totalReleased = releasedOrders.reduce((sum, order) => sum + order.amount, 0);

    // 2. Already withdrawn amount check
    const previousWithdrawals = await Withdrawal.find({ 
      seller: token.id, 
      status: { $in: ["pending", "approved"] } 
    });
    const totalWithdrawn = previousWithdrawals.reduce((sum, w) => sum + w.amount, 0);

    const availableBalance = totalReleased - totalWithdrawn;

    if (amount > availableBalance) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
    }

    // 3. Create Withdrawal Request
    const newRequest = await Withdrawal.create({
      seller: token.id,
      amount,
      method,
      accountDetails,
      status: "pending"
    });

    return NextResponse.json(newRequest, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}