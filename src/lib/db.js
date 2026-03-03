import mongoose from "mongoose";
import dns from "dns";
import Product from "@/models/Product"; 

try {
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
  console.log(" DNS Servers configured: 1.1.1.1, 8.8.8.8");
} catch (error) {
  console.error(" DNS Setup Error:", error);
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env file");
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, 
      dbName: "shopmart",
    };

    console.log(" Connecting to MongoDB Atlas...");
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log(" MongoDB Connected Successfully!");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("❌ MongoDB Connection Failed:", e.message);
    throw e;
  }
  return cached.conn;
}

export async function seedProducts() {
  await connectDB();
  

  const existingCount = await Product.countDocuments();
  if (existingCount > 0) {
    console.log(" Data already exists. Skipping seeding.");
    return;
  }

  const categories = ["Electronics", "Fashion", "Home Decor", "Beauty", "Sports"];
  const sellers = ["Daraz Store", "Gadget BD", "Style Zone", "Apple BD"];

  const dummyData = Array.from({ length: 1000 }, (_, i) => ({
    name: `${categories[i % 5]} Item #${i + 1}`,
    price: Math.floor(Math.random() * 5000) + 500,
    category: categories[i % 5],
    sellerName: sellers[i % 4],
    img: `https://picsum.photos/seed/${i + 1}/400/400`,
    productDetails: "This is a premium product with exclusive features and high-quality build.",
    rating: (Math.random() * (5 - 3) + 3).toFixed(1)
  }));

  try {
    await Product.insertMany(dummyData);
    console.log(" 1000 products added to MongoDB successfully!");
  } catch (err) {
    console.error(" Error seeding data:", err);
  }
}