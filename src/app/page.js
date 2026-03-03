// src/app/page.js   (or page.tsx)
import HeroSection      from "@/components/home/HeroSection";
import FeaturesSection   from "@/components/home/FeaturesSection";
import ProductPreview    from "@/components/home/ProductPreview";
import ScrollyTelling    from "@/components/home/ScrollyTelling";  
 // ← capital T here

export default function HomePage() {
  return (
    <>
      
      {/* <ScrollyTelling /> */}
      <HeroSection />
      <FeaturesSection />
      <ProductPreview />
    </>
  );
}