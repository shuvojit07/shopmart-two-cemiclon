import { redis } from "./redis";
import Product from "@/models/Product";

export async function getCachedProducts() {

  const cached = await redis.get("products");

  if (cached) {
    console.log("Redis cache hit");
    return JSON.parse(cached);
  }

  console.log("Redis cache miss → MongoDB");

  const products = await Product.find().sort({ createdAt: -1 });

  await redis.set(
    "products",
    JSON.stringify(products),
    "EX",
    60
  );

  return products;
}