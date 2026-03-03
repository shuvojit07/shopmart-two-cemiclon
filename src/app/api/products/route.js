import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Product from "@/models/Product";
import { connectDB } from "@/lib/db";
import slugify from "slugify";
import mongoose from "mongoose";

/* ==========================
   GET PRODUCTS
========================== */
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const seller = searchParams.get("seller");

    if (seller === "true") {
      const session = await getServerSession(authOptions);
      console.log("Session in API:", JSON.stringify(session, null, 2));           // ← add
      console.log("User ID:", session?.user?.id);                                 // ← add

      if (!session?.user || session.user.role !== "seller") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const sellerObjectId = new mongoose.Types.ObjectId(session.user.id);
      console.log("Querying sellerId:", sellerObjectId.toString());               // ← add

      const products = await Product.find({
        sellerId: sellerObjectId,
      }).sort({ createdAt: -1 });

      console.log("Found products count:", products.length);                      // ← add
      console.log("First product:", products[0]);                                 // ← add (if any)

      return NextResponse.json(products);
    }

    // ... rest of code
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

/* ==========================
   POST PRODUCT
========================== */
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "seller") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();

    const product = await Product.create({
      name: body.name,
      slug: slugify(body.name + "-" + Date.now(), {
        lower: true,
        strict: true,
      }),

      price: body.price,
      discountPrice: body.discountPrice || null,

      category: body.category,
      stock: body.stock,
      isAvailable: body.isAvailable ?? true,

      img: body.img,

      productDetails: body.description,
      shortDescription: body.shortDescription || "",

      sellerName:
        session.user.name || session.user.email.split("@")[0],

      sellerId: new mongoose.Types.ObjectId(session.user.id),
    });

    return NextResponse.json(product, { status: 201 });

  } catch (error) {
    console.error("PRODUCT CREATE ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}