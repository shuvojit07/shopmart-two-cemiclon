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
  
  const [products, setProducts] = useState([]); // Default empty array
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
        const res = await fetch('/api/products?category=Gadget');
        const data = await res.json();
        
        // API theke data jodi object-er bhetore thake (e.g. {data: []})
        if (data && Array.isArray(data)) {
            setProducts(data);
        } else if (data && data.data && Array.isArray(data.data)) {
            setProducts(data.data);
        } else {
            setProducts([]); // Safety for unexpected formats
        }
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

  // Safe Filtering Logic
  const filteredProducts = (Array.isArray(products) ? products : [])
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
  const categories = ['All', ...new Set(products.map(p => p.category))];

  // Loading State UI
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
      <section className="relative h-[40vh] flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 dark:from-slate-950 dark:to-purple-950">
        <div className="text-center z-10" data-aos="zoom-in">
          <h1 className="text-5xl md:text-6xl font-black text-white">Gadget Store</h1>
          <p className="text-xl text-white/80 mt-2">Premium Tech, Best Prices</p>
        </div>
      </section>

      {/* Search + Filters */}
      <section className="px-4 py-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-800">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 dark:bg-slate-800"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 md:w-48 p-4 rounded-2xl bg-white dark:bg-slate-800 border-none ring-1 ring-slate-200"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            <button 
              onClick={() => setShowFilter(!showFilter)}
              className="p-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              <FaFilter /> Filter
            </button>
          </div>
        </div>

        {/* Category Dropdown */}
        {showFilter && (
            <div className="mt-4 flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => {setFilterCategory(cat); setShowFilter(false);}}
                        className={`px-4 py-2 rounded-full border transition-all ${filterCategory === cat ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-slate-800 border-slate-300'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        )}
      </section>

      {/* Product Grid */}
      <section className="px-4 py-12 max-w-7xl mx-auto">
        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <div key={product._id} className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full" data-aos="fade-up">
                <div className="relative h-56 w-full mb-4 overflow-hidden rounded-2xl bg-slate-100">
                  <Image src={product.img || '/placeholder.png'} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                </div>
                
                <h3 className="font-bold text-lg mb-1 truncate">{product.name}</h3>
                <p className="text-slate-500 text-sm mb-3">{product.category}</p>
                
                <div className="mt-auto flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xl font-black text-blue-600">${product.discountPrice || product.price}</span>
                    {product.discountPrice && <span className="text-xs line-through text-slate-400 ml-2">${product.price}</span>}
                  </div>
                  <div className="flex items-center text-amber-500 text-sm font-bold">
                    <FaStar className="mr-1" /> {product.rating || 0}
                  </div>
                </div>

                <button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full bg-slate-900 dark:bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
                >
                  <FaShoppingCart size={16} /> Add to Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">No products found matching your search.</div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {setCurrentPage(index + 1); window.scrollTo({top: 0, behavior: 'smooth'});}}
                className={`w-12 h-12 rounded-xl font-bold transition-all ${currentPage === index + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200'}`}
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