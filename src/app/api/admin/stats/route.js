import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import User from "@/models/User";
import { getServerSession } from "next-auth";
// authOptions ইমপোর্ট করতে হতে পারে আপনার প্রজেক্ট স্ট্রাকচার অনুযায়ী
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(); // প্রোডাকশনে এখানে authOptions দিন

    // নিরাপত্তা চেক
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 });
    }

    // ১. ইউজার সংখ্যা গণনা
    const totalSellers = await User.countDocuments({ role: "seller" });
    const totalBuyers = await User.countDocuments({ role: "buyer" });

    // ২. অর্ডার ডাটা
    const allOrders = await Order.find().sort({ createdAt: -1 }).limit(10);
    const totalOrdersCount = await Order.countDocuments();

    // ৩. এসক্রো ক্যালকুলেশন
    const escrowStats = await Order.aggregate([
      { $match: { escrowStatus: "hold" } },
      { $group: { _id: null, totalHold: { $sum: "$amount" } } }
    ]);

    return NextResponse.json({
      totalSellers,
      totalBuyers,
      totalOrdersCount,
      escrowBalance: escrowStats[0]?.totalHold || 0,
      recentOrders: allOrders
    }, { status: 200 });

  } catch (error) {
    console.error("Admin Stats Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}