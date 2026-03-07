import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectDB } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    await connectDB();

    // 2. Await the params object here as well
    const { id } = await params;

    const product = await Product.findOne({
      slug: id // Searching by the slug/id provided in URL
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}