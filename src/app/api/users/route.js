import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  await connectDB();

  const users = await User.find();

  return Response.json(users);
}

export async function PUT(req) {
  await connectDB();

  const { userId, role } = await req.json();

  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true }
  );

  return Response.json(user);
}