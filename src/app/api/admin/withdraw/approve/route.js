export async function PATCH(req) {
  try {
    await connectDB();
    const { requestId, adminNote } = await req.json();

    const withdrawal = await Withdrawal.findById(requestId);
    if (withdrawal.status !== "pending") {
      return NextResponse.json({ error: "Already processed" }, { status: 400 });
    }

    // ১. উইথড্র স্ট্যাটাস আপডেট
    withdrawal.status = "approved";
    withdrawal.adminNote = adminNote;
    await withdrawal.save();

    // ২. ইউজারের পেন্ডিং ব্যালেন্স ক্লিয়ার করা
    await User.findByIdAndUpdate(withdrawal.seller, {
      $inc: { pendingWithdrawal: -withdrawal.amount }
    });

    return NextResponse.json({ message: "Withdrawal approved successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}