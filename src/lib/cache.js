import { redis } from "./redis";

export async function clearProductCache() {

  const keys = await redis.keys("products*");

  if (keys.length > 0) {
    await redis.del(keys);
  }

}