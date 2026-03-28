'use client';

import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { FaSearch, FaStar, FaShoppingCart, FaTag, FaEye, FaFilter } from 'react-icons/fa';
import { ShoppingBag, ShieldCheck } from "lucide-react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";

export default function BeautyPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(null); // Track specific product loading
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const itemsPerPage = 8;

  // Fetch Data from Mongoose API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/products?category=Beauty'); // Beauty category filter
        const result = await res.json();
        
        // Handling different API response structures
        const data = Array.isArray(result) ? result : (result.data || result.products || []);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    AOS.init({
      duration: 1200,
      once: false,
      offset: 100,
      easing: 'ease-in-out-quad',
    });
  }, []);

  // Buy Now Logic
  const handleBuyNow = async (product) => {
    setIsAdding(product._id);
    try {
      await addToCart(product);
      router.push("/checkout");
    } catch (error) {
      console.error("Cart error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsAdding(null);
    }
  };

  // Safe Filtering logic
  const allProducts = Array.isArray(products) ? products : [];
  const filteredProducts = allProducts
    .filter(product => product.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(product => filterCategory === 'All' || product.category === filterCategory)
    .sort((a, b) => {
      const priceA = a.discountPrice || a.price || 0;
      const priceB = b.discountPrice || b.price || 0;
      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const categories = ['All', ...new Set(allProducts.map(p => p.category))];

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[45vh] flex items-center justify-center bg-gradient-to-br from-pink-900 to-purple-900 dark:from-slate-950 dark:to-purple-950 overflow-hidden">
        <div className="text-center z-10" data-aos="zoom-in">
          <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl">ShopMart Beauty</h1>
          <p className="text-xl text-white/90 mt-4">Premium Skincare & Cosmetics</p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="px-4 py-8 max-w-7xl mx-auto">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border-none ring-2 ring-slate-200 focus:ring-pink-500 dark:bg-slate-700 outline-none"
            />
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-4 rounded-full bg-white dark:bg-slate-700 border-none ring-2 ring-slate-200 outline-none"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <button onClick={() => setShowFilter(!showFilter)} className="p-4 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-all flex items-center gap-2">
              <FaFilter /> Filter
            </button>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="px-4 py-12 max-w-7xl mx-auto">
        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {paginatedProducts.map((product) => (
              <div key={product._id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all group flex flex-col h-full" data-aos="fade-up">
                <div className="relative h-64 w-full mb-4 overflow-hidden rounded-2xl">
                  <Image src={product.img || '/placeholder.png'} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  {product.discountPrice && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">SALE</div>
                  )}
                </div>
                
                <h3 className="font-bold text-xl mb-1 truncate">{product.name}</h3>
                <p className="text-slate-500 text-sm mb-4">{product.category}</p>
                
                <div className="mt-auto mb-6 flex items-center justify-between">
                  <span className="text-2xl font-black text-pink-600">${product.discountPrice || product.price}</span>
                  <div className="flex items-center text-amber-500 font-bold">
                    <FaStar className="mr-1" /> {product.rating || 0}
                  </div>
                </div>

                {/* Buy Now & Secure Escrow Section */}
                <div className="space-y-3">
                    <button
                        onClick={() => handleBuyNow(product)}
                        disabled={isAdding === product._id}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {isAdding === product._id ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <ShoppingBag size={20} />
                                <span>Buy Now</span>
                            </>
                        )}
                    </button>

                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                        <ShieldCheck className="text-green-600" size={16} />
                        <p className="text-[10px] font-bold text-slate-500 uppercase leading-none">
                            Secure Escrow Payment
                        </p>
                    </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">No products found in the database.</div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-3">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                className={`w-12 h-12 rounded-xl font-bold transition-all ${currentPage === i + 1 ? 'bg-pink-600 text-white scale-110' : 'bg-slate-100 dark:bg-slate-800'}`}>
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}