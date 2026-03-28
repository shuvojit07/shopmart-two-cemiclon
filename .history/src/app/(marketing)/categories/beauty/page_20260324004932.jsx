"use client";

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
  
  // Mongoose theke data rakhar jonno state
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const itemsPerPage = 8; // Per page-e 8ti product dekhano hobe

  // 1. Database theke data fetch kora (API call)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products?category=Gadget'); // Apnar API route onujayi link change hote pare
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
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

  // 2. Add to Cart Logic (Same as your ProductPreview)
  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    e.preventDefault();

    if (!session) {
      alert("Please login first to add items to cart!");
      router.push("/login");
      return;
    }

    // Login thakle cart logic ekhane hobe
    console.log("Adding to cart:", product.name);
  };

  // 3. Filtering and Sorting Logic
  const filteredProducts = products
    .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(product => filterCategory === 'All' || product.category === filterCategory)
    .sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;
      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const categories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 dark:from-slate-950 dark:to-purple-950 overflow-hidden" data-aos="fade-in">
        <div className="text-center z-10">
          <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl">ShopMart Gadgets</h1>
          <p className="text-xl text-white/90 mt-4">Discover Premium Tech Essentials</p>
        </div>
      </section>

      {/* Search + Filters Section */}
      <section className="px-4 py-12 max-w-7xl mx-auto">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-3xl p-8 shadow-2xl relative">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative flex-1 group">
              <input
                type="text"
                placeholder="Search Gadgets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-14 py-5 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-full text-lg font-medium transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-200 shadow-md"
              />
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 text-xl group-hover:text-blue-600 pointer-events-none" />
            </div>

            <div className="flex flex-wrap gap-4 items-center relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-5 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-full text-lg font-medium shadow-md"
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

              {showFilter && (
                <div className="absolute top-full right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl shadow-2xl p-6 z-50 min-w-[220px]" data-aos="fade-down">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><FaFilter className="text-blue-600" /> Categories</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => { setFilterCategory(cat); setShowFilter(false); }}
                        className={`w-full text-left px-4 py-3 rounded-lg ${filterCategory === cat ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-blue-50'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Carousel (Dynamic Data) */}
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
          {products.slice(0, 5).map((product) => (
            <SwiperSlide key={product._id}>
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl">
                <Image src={product.img} alt={product.name} width={500} height={400} className="rounded-2xl mb-6 h-60 object-cover" />
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-xl mb-4">
                    ${product.discountPrice || product.price} 
                    {product.discountPrice && <span className="line-through text-gray-500 ml-2">${product.price}</span>}
                </p>
                <div className="flex items-center mb-4 text-yellow-400">
                  <FaStar className="mr-2" /> {product.rating || 0}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* All Products Grid (Dynamic Data) */}
      <section className="px-4 py-20 max-w-7xl mx-auto" data-aos="fade-up">
        <h2 className="text-5xl font-black text-center mb-16">All Gadgets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {paginatedProducts.map((product) => (
            <div key={product._id} className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl hover:scale-105 transition-all group flex flex-col h-full">
              
              <div className="relative h-60 w-full mb-6 overflow-hidden rounded-2xl">
                <Image src={product.img} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                {product.discountPrice && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                        SALE
                    </div>
                )}
              </div>

              <h3 className="text-2xl font-bold mb-3 truncate">{product.name}</h3>

              <p className="text-2xl font-bold mb-4 text-blue-600">
                ${product.discountPrice || product.price} 
                {product.discountPrice && <span className="text-sm line-through text-gray-400 ml-2">${product.price}</span>}
              </p>

              <div className="flex items-center mb-6 text-yellow-400">
                <FaStar className="mr-2" /> <span className="text-slate-700 dark:text-slate-200">{product.rating || 0}</span>
                <FaEye className="ml-auto text-gray-400" />
              </div>

              <button 
                onClick={(e) => handleAddToCart(e, product)}
                className="mt-auto w-full bg-blue-600 text-white py-4 rounded-2xl flex items-center justify-center gap-4 hover:bg-blue-700 transition-all text-lg font-bold"
              >
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
            <div className="flex justify-center mt-16 gap-6">
            {Array.from({ length: totalPages }).map((_, index) => (
                <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-8 py-4 rounded-2xl shadow-lg text-lg font-bold transition-all ${currentPage === index + 1 ? 'bg-blue-600 text-white scale-110' : 'bg-slate-200 dark:bg-slate-700 hover:bg-blue-100'}`}
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