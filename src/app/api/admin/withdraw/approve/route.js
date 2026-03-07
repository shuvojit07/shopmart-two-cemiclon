export async function PATCH(req) {
  await connectDB();
  const { requestId, action } = await req.json(); // action = 'approved' or 'rejected'

  const request = await Withdrawal.findByIdAndUpdate(
    requestId,
    { status: action },
    { new: true }
  );

  return NextResponse.json({ message: `Request ${action} successfully.` });
}