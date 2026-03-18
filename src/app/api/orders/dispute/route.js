export async function POST(req) {
  try {
    await connectDB();
    const { orderId, buyerId, reason, details } = await req.json();

    const order = await Order.findById(orderId);
    order.escrowStatus = "disputed";
    order.disputeOpenedAt = new Date();
    order.disputeReason = reason;
    order.disputeDetails = details;
    order.escrowHistory.push({
      status: "disputed",
      changedBy: buyerId,
      note: `Buyer opened a dispute: ${reason}`
    });

    await order.save();
    return NextResponse.json({ message: "Dispute opened successfully." });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}