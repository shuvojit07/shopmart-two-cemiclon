import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { redis } from "@/lib/redis";
import { calculateBoost } from "@/lib/boostRanking";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import slugify from "slugify";
import mongoose from "mongoose";


async function clearProductCache() {
  try {
    const keys = await redis.keys("products:*");
    if (keys.length > 0) {
      await redis.del(keys);
    }
  } catch (error) {
    console.error("Redis Cache Clear Error:", error);
  }
}

// --- GET: Fetch All Products with Filtering & Caching ---
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 12;
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const search = searchParams.get("search");

 
    const cacheKey = `products:${page}:${limit}:${category}:${minPrice}:${maxPrice}:${search}`;

 
    const cached = await redis.get(cacheKey);
    if (cached) {
      return NextResponse.json(JSON.parse(cached));
    }

    const query = {};

   
    if (category) {
      query.category = category;
    }

 
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

  
    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    const skip = (page - 1) * limit;

  
    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .lean();


    const rankedProducts = products
      .map((p) => ({
        ...p,
        boost: calculateBoost(p),
      }))
      .sort((a, b) => b.boost - a.boost);

    const total = await Product.countDocuments(query);

    const result = {
      products: rankedProducts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };

 
    await redis.set(
      cacheKey,
      JSON.stringify(result),
      "EX",
      60
    );

    return NextResponse.json(result);

  } catch (error) {
    console.error("PRODUCT GET API ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// --- POST: Create New Product (Seller Only) ---
export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);


    if (!session || session.user.role?.toLowerCase() !== "seller") {
      return NextResponse.json({ error: "Only sellers can add products" }, { status: 401 });
    }

    const body = await req.json();


    const product = await Product.create({
      name: body.name,
      slug: slugify(body.name + "-" + Date.now(), {
        lower: true,
        strict: true,
      }),
      price: Number(body.price),
      discountPrice: body.discountPrice ? Number(body.discountPrice) : null,
      category: body.category,
      stock: Number(body.stock),
      isAvailable: body.isAvailable ?? true,
      img: body.img,
      productDetails: body.description, 
      shortDescription: body.shortDescription || "",
      sellerName: session.user.name || session.user.email.split("@")[0],
      sellerId: new mongoose.Types.ObjectId(session.user.id),
    });

   
    await clearProductCache();

    return NextResponse.json(product, { status: 201 });

  } catch (error) {
    console.error("PRODUCT POST API ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}