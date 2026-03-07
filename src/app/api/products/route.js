import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { redis } from "@/lib/redis";
import { calculateBoost } from "@/lib/boostRanking";

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

    /* CATEGORY FILTER */

    if (category) {
      query.category = category;
    }

    /* PRICE FILTER */

    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    /* SEARCH */

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

    /* BOOST RANKING */

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

    console.error("PRODUCT API ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
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

/* CLEAR CACHE */

await clearProductCache();

return NextResponse.json(product, { status: 201 });