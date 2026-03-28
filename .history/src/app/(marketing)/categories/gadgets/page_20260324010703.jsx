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
import { FaSearch, FaStar, FaTag, FaEye, FaFilter } from 'react-icons/fa';
import { ShoppingBag, ShieldCheck } from "lucide-react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";

export default function GadgetsPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(null); // specific product ID track korar jonno
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const itemsPerPage = 8;

  // Database theke Data Fetch kora
  useEffect(() => {
    const fetchGadgets = async () => {
      try {
        setLoading(true);
        // Apnar API route onujayi path change hote pare (e.g. /api/products)
        const res = await fetch('/api/products?category=Gadget'); 
        const result = await res.json();
        
        // Response Array naki Object sheta handle kora
        const data = Array.isArray(result) ? result : (result.data || result.products || []);
        setProducts(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGadgets();

    AOS.init({
      duration: 1200,
      once: false,
      offset: 100,
      easing: 'ease-in-out-quad',
    });
  }, []);

  // Buy Now Button Logic
  const handleBuyNow = async (product) => {
    setIsAdding(product._id);
    try {
      await addToCart(product);
      router.push("/checkout"); // Cart e add hoye direct checkout e jabe
    } catch (error) {
      console.error("Cart error:", error);
      alert("Error adding to cart. Try again.");
    } finally {
      setIsAdding(null);
    }
  };

  // Data Filtering & Sorting Logic
  const filteredProducts = products
    .filter(p => p.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(p => filterCategory === 'All' || p.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const categories = ['All', ...new Set(products.map(p => p.category))];

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[45vh] flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-900 dark:from-slate-950 dark:to-blue-950 overflow-hidden">
        <div className="text-center z-10" data-aos="fade-down">
          <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl">ShopMart Gadgets</h1>
          <p className="text-xl text-white/90 mt-4">Next-Gen Tech Essentials</p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="px-4 py-12 max-w-7xl mx-auto">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center gap-6">
          <div className="relative flex-1 w-full group">
            <input
              type="text"
              placeholder="Search latest tech..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-12 py-4 bg-white dark:bg-slate-700 border-2 border-transparent rounded-full focus:border-blue-500 shadow-md outline-none transition-all"
            />
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-6 py-4 bg-white dark:bg-slate-700 rounded-full shadow-md outline-none">
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <button onClick={() => setShowFilter(!showFilter)} className="px-6 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center gap-2 shadow-lg transition-all">
              <FaFilter /> Filter
            </button>
          </div>
        </div>
      </section>

      {/* Featured Slider */}
      <section className="px-4 py-10 max-w-7xl mx-auto" data-aos="fade-up">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          centeredSlides={true}
          slidesPerView={window.innerWidth < 768 ? 1 : 3}
          autoplay={{ delay: 3500 }}
          className="pb-12"
        >
          {products.slice(0, 5).map((p) => (
            <SwiperSlide key={p._id}>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700">
                <Image src={p.img || '/placeholder.png'} alt={p.name} width={400} height={300} className="rounded-2xl object-cover h-52 w-full mb-4" />
                <h3 className="font-bold text-lg">{p.name}</h3>
                <p className="text-blue-600 font-black text-xl">${p.price}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Product Grid */}
      <section className="px-4 py-12 max-w-7xl mx-auto">
        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {paginatedProducts.map((product) => (
              <div 
                key={product._id} 
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all group flex flex-col h-full"
                data-aos="zoom-in"
              >
                <div className="relative h-56 w-full mb-5 overflow-hidden rounded-2xl bg-slate-50">
                  <Image src={product.img || '/placeholder.png'} alt={product.name} fill className="object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>

                <h3 className="text-lg font-bold mb-1 truncate">{product.name}</h3>
                <p className="text-slate-400 text-xs mb-4 uppercase tracking-widest">{product.category}</p>

                <div className="mt-auto mb-6 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-blue-600">${product.price}</span>
                    {product.oldPrice && <span className="text-sm line-through text-slate-400">${product.oldPrice}</span>}
                  </div>
                  <div className="flex items-center bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg">
                    <FaStar className="text-amber-500 text-sm mr-1" />
                    <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">{product.rating || 0}</span>
                  </div>
                </div>

                {/* Buy Now & Escrow Logic */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleBuyNow(product)}
                    disabled={isAdding === product._id}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 disabled:opacity-70"
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

                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                    <ShieldCheck className="text-green-600" size={16} />
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Secure Escrow Protection</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-slate-400">No Gadgets found in Database.</h2>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-16 gap-3">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button 
                key={i} 
                onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 500, behavior: 'smooth' }); }}
                className={`w-12 h-12 rounded-xl font-bold transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white scale-110 shadow-lg' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}