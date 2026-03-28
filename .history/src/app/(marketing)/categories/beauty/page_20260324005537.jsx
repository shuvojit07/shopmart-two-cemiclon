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
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function GadgetsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [products, setProducts] = useState([]); // Database theke asha products
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Apnar database/API link ekhane hobe
        const res = await fetch('/api/products?category=Gadget'); 
        const data = await res.json();
        
        // Data structure check kore set kora
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data && Array.isArray(data.data)) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
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

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    e.preventDefault();

    if (!session) {
      alert("Please login first to add items to cart!");
      router.push("/login");
      return;
    }
    console.log("Adding to cart:", product.name);
  };

  // Safe Filtering logic jate error na dey
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
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[45vh] flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 dark:from-slate-950 dark:to-purple-950 overflow-hidden" data-aos="fade-in">
        <div className="text-center z-10">
          <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl">ShopMart Gadgets</h1>
          <p className="text-xl text-white/90 mt-4">Discover Premium Tech Essentials</p>
        </div>
      </section>

      {/* Search + Filters Section */}
      <section className="px-4 py-12 max-w-7xl mx-auto">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-3xl p-8 shadow-2xl relative">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative flex-1 group w-full">
              <input
                type="text"
                placeholder="Search Gadgets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-14 py-5 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-full text-lg font-medium transition-all focus:border-blue-600 shadow-md outline-none"
              />
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-gray-300 text-xl" />
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-5 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-full text-lg font-medium shadow-md outline-none"
              >
                <option value="price-asc">Price Low → High</option>
                <option value="price-desc">Price High → Low</option>
                <option value="rating">Highest Rating</option>
              </select>

              <button 
                onClick={() => setShowFilter(!showFilter)}
                className="px-6 py-5 bg-blue-600 text-white rounded-full text-lg font-medium hover:bg-blue-700 transition-all shadow-md flex items-center gap-2"
              >
                <FaFilter /> Filter
              </button>
            </div>
          </div>
          
          {showFilter && (
            <div className="mt-6 flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => { setFilterCategory(cat); setShowFilter(false); }}
                        className={`px-5 py-2 rounded-full border transition-all ${filterCategory === cat ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-slate-700 border-slate-300'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Carousel */}
      {allProducts.length > 0 && (
        <section className="px-4 py-20 bg-slate-50 dark:bg-slate-900" data-aos="fade-up">
          <h2 className="text-5xl font-black text-center mb-16">Featured Gadgets</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            navigation={true}
            breakpoints={{ 320: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="max-w-7xl mx-auto"
          >
            {allProducts.slice(0, 5).map((product) => (
              <SwiperSlide key={product._id}>
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all">
                  <div className="relative h-60 w-full mb-6">
                    <Image src={product.img || "/placeholder.jpg"} alt={product.name} fill className="rounded-2xl object-cover" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 truncate">{product.name}</h3>
                  <p className="text-xl mb-4 font-bold text-blue-600">
                    ${product.discountPrice || product.price} 
                    {product.discountPrice && <span className="line-through text-gray-500 text-sm ml-2">${product.price}</span>}
                  </p>
                  <div className="flex items-center text-yellow-400 font-bold">
                    <FaStar className="mr-2" /> {product.rating || 0}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

      {/* All Products Grid */}
      <section className="px-4 py-20 max-w-7xl mx-auto" data-aos="fade-up">
        <h2 className="text-5xl font-black text-center mb-16">All Gadgets</h2>
        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {paginatedProducts.map((product) => (
              <div 
                key={product._id} 
                className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl hover:scale-[1.02] transition-all group flex flex-col h-full border border-slate-100 dark:border-slate-700"
              >
                <div className="relative h-56 w-full mb-6 overflow-hidden rounded-2xl">
                    <Image 
                        src={product.img || "/placeholder.jpg"} 
                        alt={product.name} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    {product.discountPrice && (
                        <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                            SALE
                        </div>
                    )}
                </div>

                <h3 className="text-xl font-bold mb-2 truncate group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-slate-500 text-sm mb-4">{product.category}</p>

                <div className="mt-auto flex items-center justify-between mb-6">
                    <div>
                        <span className="text-2xl font-black text-slate-900 dark:text-white">
                            ${product.discountPrice || product.price}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                        <FaStar size={14} />
                        <span className="text-sm font-bold">{product.rating || 0}</span>
                    </div>
                </div>

                <button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-100 dark:shadow-none"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">No products found in the database.</div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
            <div className="flex justify-center mt-16 gap-4">
            {Array.from({ length: totalPages }).map((_, index) => (
                <button
                key={index}
                onClick={() => { setCurrentPage(index + 1); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                className={`w-12 h-12 rounded-2xl font-bold transition-all ${currentPage === index + 1 ? 'bg-blue-600 text-white scale-110 shadow-lg' : 'bg-slate-200 dark:bg-slate-700 hover:bg-blue-100'}`}
                >
                {index + 1}
                </button>
            ))}
            </div>
        )}
      </section>
    </div>
  );
}