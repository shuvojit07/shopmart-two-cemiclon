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

// Full 15 Gadgets Products JSON Data
const gadgetsData = [
  {
    id: 1,
    name: 'Apple AirPods Pro 2',
    category: 'Earbuds',
    price: 249,
    oldPrice: 299,
    rating: 4.8,
    reviews: 1200,
    image: 'https://thumbs.dreamstime.com/b/fashionable-elegant-watch-classic-design-high-end-luxury-brand-watch-couples-blue-style-starry-dreamy-background-black-431326800.jpg',
  },
  {
    id: 2,
    name: 'Samsung Galaxy Watch Ultra',
    category: 'Smartwatch',
    price: 799,
    oldPrice: 899,
    rating: 4.7,
    reviews: 850,
    image: 'https://thumbs.dreamstime.com/b/fashionable-elegant-watch-classic-design-high-end-luxury-brand-watch-couples-blue-style-starry-dreamy-background-black-431326849.jpg',
  },
  {
    id: 3,
    name: 'Anker PowerCore Slim 10000',
    category: 'Portable Charger',
    price: 29,
    oldPrice: 39,
    rating: 4.6,
    reviews: 1500,
    image: 'https://thumbs.dreamstime.com/b/gadgets-accessories-gadgets-accessories-isolated-white-background-133429004.jpg',
  },
  {
    id: 4,
    name: 'Sony WF-1000XM5 Earbuds',
    category: 'Earbuds',
    price: 299,
    oldPrice: 349,
    rating: 4.9,
    reviews: 950,
    image: 'https://imageio.forbes.com/specials-images/imageserve/68669e428abd4d4646f2f4ed/The-viaim-RecDot-AI-earbuds-against-a-black-background-/0x0.jpg?format=jpg&height=2500&width=3750',
  },
  {
    id: 5,
    name: 'Fitbit Charge 6',
    category: 'Fitness Tracker',
    price: 179,
    oldPrice: 199,
    rating: 4.5,
    reviews: 600,
    image: 'https://www.cnet.com/a/img/resize/a9f20833da0ab294480c77ba02ed9c5783425da2/hub/2025/11/04/f45467ec-39f5-47a3-938d-67290cb13616/walmart-dotd-nov-4.jpg?auto=webp&fit=crop&height=675&width=1200',
  },
  {
    id: 6,
    name: 'Garmin Vivosmart 5',
    category: 'Smartwatch',
    price: 149,
    oldPrice: 169,
    rating: 4.4,
    reviews: 400,
    image: 'https://thumbs.dreamstime.com/b/women-set-accessories-tablet-pc-smart-watch-passport-camera-key-note-pad-sunglasses-headphones-cosmetics-makeup-travel-109550542.jpg',
  },
  {
    id: 7,
    name: 'Belkin BoostCharge Pro',
    category: 'Wireless Charger',
    price: 59,
    oldPrice: 69,
    rating: 4.7,
    reviews: 700,
    image: 'https://thumbs.dreamstime.com/b/collection-smart-pet-tech-gadgets-arranged-modern-indoor-setting-devices-include-ai-feeders-gps-trackers-429636036.jpg',
  },
  {
    id: 8,
    name: 'Anker 737 Power Bank',
    category: 'Portable Charger',
    price: 99,
    oldPrice: 119,
    rating: 4.8,
    reviews: 1100,
    image: 'https://hips.hearstapps.com/hmg-prod/images/61xlecxv22l-ac-sl1500-693c5e93c28ba.jpg?crop=1.00xw:0.401xh;0,0.260xh&resize=1200:*',
  },
  {
    id: 9,
    name: 'Bose QuietComfort Earbuds II',
    category: 'Earbuds',
    price: 279,
    oldPrice: 299,
    rating: 4.9,
    reviews: 1300,
    image: 'https://thumbs.dreamstime.com/b/captivating-image-showcases-sleek-smartphone-glowing-neon-brain-design-symbolizing-advanced-artificial-intelligence-403525493.jpg',
  },
  {
    id: 10,
    name: 'Apple Watch Series 10',
    category: 'Smartwatch',
    price: 399,
    oldPrice: 449,
    rating: 4.8,
    reviews: 900,
    image: 'https://www.cnet.com/a/img/resize/00e7ae7973da5fae17f737cd9f96f940ac011433/hub/2026/02/02/982b5f19-558f-4077-b596-440e95e06769/walmart-dotd-feb-2.jpg?auto=webp&fit=crop&height=675&width=1200',
  },
  {
    id: 11,
    name: 'Twelve South HiRise 3 Deluxe',
    category: 'Wireless Charger',
    price: 149,
    oldPrice: 169,
    rating: 4.6,
    reviews: 500,
    image: 'https://www.cnet.com/a/img/resize/9a05e0fd9b31890f00b3c5a8a29aa251bf0088ff/hub/2024/11/26/23642402-e263-4d51-8aa7-d5e60c4599bc/hirise-3-deluxe-1.jpg?auto=webp&fit=crop&height=675&width=1200',
  },
  {
    id: 12,
    name: 'Jabra Elite 10',
    category: 'Earbuds',
    price: 249,
    oldPrice: 279,
    rating: 4.7,
    reviews: 800,
    image: 'https://thumbs.dreamstime.com/b/digital-gadgets-collection-isolated-white-background-image-features-including-laptop-smartphone-smartwatch-all-437120050.jpg',
  },
  {
    id: 13,
    name: 'Oura Ring Gen3',
    category: 'Smart Ring',
    price: 299,
    oldPrice: 349,
    rating: 4.5,
    reviews: 650,
    image: 'https://thumbs.dreamstime.com/b/fashionable-elegant-watch-classic-design-high-end-luxury-brand-watch-couples-blue-style-starry-dreamy-background-black-431326800.jpg',
  },
  {
    id: 14,
    name: 'Anker Soundcore Liberty 4',
    category: 'Earbuds',
    price: 99,
    oldPrice: 129,
    rating: 4.6,
    reviews: 1000,
    image: 'https://thumbs.dreamstime.com/b/gadgets-accessories-gadgets-accessories-isolated-white-background-133429004.jpg',
  },
  {
    id: 15,
    name: 'Samsung Galaxy Buds3 Pro',
    category: 'Earbuds',
    price: 229,
    oldPrice: 259,
    rating: 4.8,
    reviews: 750,
    image: 'https://imageio.forbes.com/specials-images/imageserve/68669e428abd4d4646f2f4ed/The-viaim-RecDot-AI-earbuds-against-a-black-background-/0x0.jpg?format=jpg&height=2500&width=3750',
  },
];

export default function GadgetsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const itemsPerPage = 4;

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      offset: 100,
      easing: 'ease-in-out-quad',
    });
  }, []);

  const filteredProducts = gadgetsData
    .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(product => filterCategory === 'All' || product.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const categories = ['All', ...new Set(gadgetsData.map(p => p.category))];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 dark:from-slate-950 dark:to-purple-950 overflow-hidden" data-aos="fade-in" data-aos-duration="1500">
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
                className="w-full px-14 py-5 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-full text-lg font-medium transition-all duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 group-hover:border-blue-400 shadow-md"
              />
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-gray-300 text-xl group-hover:text-blue-600 transition-colors pointer-events-none" />
            </div>

            <div className="flex flex-wrap gap-4 items-center relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-5 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-full text-lg font-medium transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 shadow-md"
              >
                <option value="price-asc">Price Low → High</option>
                <option value="price-desc">Price High → Low</option>
                <option value="rating">Highest Rating</option>
              </select>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-6 py-5 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-full text-lg font-medium transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 shadow-md"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <button 
                onClick={() => setShowFilter(!showFilter)}
                className="px-6 py-5 bg-blue-600 text-white rounded-full text-lg font-medium hover:bg-blue-700 transition-all shadow-md flex items-center gap-2"
              >
                <FaFilter /> Filter
              </button>

              {showFilter && (
                <div 
                  className="absolute md:relative top-full left-0 md:left-auto mt-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl shadow-2xl p-6 z-50 min-w-[220px]" 
                  data-aos="fade-down" 
                  data-aos-duration="300"
                >
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <FaFilter className="text-blue-600" /> Select Category
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => {
                          setFilterCategory(cat);
                          setShowFilter(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors ${filterCategory === cat ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold' : 'text-gray-800 dark:text-gray-200'}`}
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

      {/* Featured Carousel */}
      <section className="px-4 py-20 bg-slate-50 dark:bg-slate-900" data-aos="fade-up" data-aos-duration="1500">
        <h2 className="text-5xl font-black text-center mb-16">Featured Gadgets</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          spaceBetween={40}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          navigation={true}
          breakpoints={{ 320: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          className="max-w-7xl mx-auto"
        >
          {gadgetsData.slice(0, 5).map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-500 hover:rotate-3">
                <Image src={product.image} alt={product.name} width={500} height={400} className="rounded-2xl mb-6 object-cover" />
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-xl mb-4">${product.price} <span className="line-through text-gray-500">${product.oldPrice}</span> <FaTag className="inline text-red-500 ml-2" /></p>
                <div className="flex items-center mb-4">
                  <FaStar className="text-yellow-400 mr-2" /> {product.rating} ({product.reviews} reviews) <FaEye className="ml-4 text-gray-500" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* All Products Grid */}
      <section className="px-4 py-20 max-w-7xl mx-auto" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1500">
        <h2 className="text-5xl font-black text-center mb-16">All Gadgets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {paginatedProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:scale-105 transition-all duration-500 group relative overflow-hidden flex flex-col h-full"
              data-aos="zoom-in-up" 
              data-aos-delay="200"
            >
              {/* Discount Badge */}
              {product.oldPrice && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold z-10 animate-pulse">
                  {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                </div>
              )}

              <Image 
                src={product.image} 
                alt={product.name} 
                width={400} 
                height={300} 
                className="rounded-2xl mb-6 object-cover group-hover:rotate-3 transition-transform duration-700 scale-105 group-hover:scale-110" 
              />

              <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors truncate">
                {product.name}
              </h3>

              <p className="text-2xl font-bold mb-4">
                ${product.price} 
                <span className="text-lg line-through text-gray-500 ml-3">${product.oldPrice}</span> 
                <FaTag className="inline text-red-500 ml-3" />
              </p>

              <div className="flex items-center mb-6">
                <FaStar className="text-yellow-400 text-2xl mr-2" /> 
                <span className="text-xl font-semibold">{product.rating}</span> 
                <span className="text-gray-500 ml-2">({product.reviews})</span>
                <FaEye className="ml-6 text-gray-500 text-xl" />
              </div>

              {/* Add to Cart -*/}
              <button className="mt-auto w-full bg-blue-600 text-white py-4 rounded-2xl flex items-center justify-center gap-4 hover:bg-blue-700 hover:scale-105 transition-all duration-300 group-hover:shadow-xl text-lg font-bold shadow-md">
                <FaShoppingCart className="text-2xl" /> Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-16 gap-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-8 py-4 rounded-2xl shadow-lg text-lg font-bold transition-all duration-300 ${currentPage === index + 1 ? 'bg-blue-600 text-white scale-110' : 'bg-slate-200 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-blue-900 hover:scale-105'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}