// src/app/page.js

import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ProductPreview from "@/components/home/ProductPreview";
import ScrollyTelling from "@/components/home/ScrollyTelling";

import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export default async function HomePage() {
  // connect database
  await connectDB();

  // get products
  const products = await Product.find({}).limit(8).lean();

  const safeProducts = JSON.parse(JSON.stringify(products));

  return (
    <div className="">
      <ScrollyTelling products={safeProducts} />
      <ProductPreview products={safeProducts} />
      <HeroSection />
      <FeaturesSection />
      
    </div>
  );
}
