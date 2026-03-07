import Product from "@/models/Product";
import { connectDB } from "@/lib/db";
import { notFound } from "next/navigation";
import ProductAction from "@/components/product/ProductAction"; // Import interactive part

export default async function ProductPage({ params }) {
  // 1. Await params (Next.js 15 requirement)
  const { id } = await params;

  // 2. Connect to DB and fetch
  await connectDB();
  const product = await Product.findOne({ slug: id }).lean();

  if (!product) {
    return notFound();
  }

  // 3. Serializing product data for safety
  const serializedProduct = JSON.parse(JSON.stringify(product));

  return (
    <div className="bg-slate-50/30 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-6 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left: Product Image */}
          <div className="sticky top-28">
            <div className="bg-white rounded-[2.5rem] p-4 shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              <img
                src={serializedProduct.img}
                alt={serializedProduct.name}
                className="w-full h-auto rounded-[2rem] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col pt-4">
            <span className="text-amber-600 font-black text-xs uppercase tracking-[0.3em] mb-4">
              Premium Collection
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              {serializedProduct.name}
            </h1>
            
            <p className="text-lg text-slate-500 font-medium mb-8 leading-relaxed">
              {serializedProduct.shortDescription}
            </p>

            <div className="flex items-center gap-4 mb-10">
              <div className="text-4xl font-black text-slate-900">
                ${serializedProduct.discountPrice || serializedProduct.price}
              </div>
              {serializedProduct.discountPrice && (
                <div className="text-xl text-slate-400 line-through font-bold">
                  ${serializedProduct.price}
                </div>
              )}
              <div className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-xs font-black uppercase">
                Free Shipping
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-[2rem] p-8 mb-10">
               <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Description</h3>
               <p className="text-slate-700 leading-8 font-medium italic">
                {serializedProduct.productDetails}
               </p>
            </div>
            
            {/* 4. Integrating the Action Button (Interaction) */}
            <ProductAction product={serializedProduct} />

          </div>
        </div>
      </div>
    </div>
  );
}