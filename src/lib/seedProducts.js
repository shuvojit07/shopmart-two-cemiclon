import { connectDB } from "./db";
import Product from "@/models/Product";

export async function seedProducts() {
  await connectDB();

  const existing = await Product.countDocuments();
  if (existing > 0) {
    console.log("Data already exists");
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
    productDetails: "Premium quality product",
    rating: Number((Math.random() * 2 + 3).toFixed(1)),
  }));

  await Product.insertMany(dummyData);

  console.log("1000 products seeded successfully");
}