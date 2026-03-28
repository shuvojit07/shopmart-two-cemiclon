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

// Full 15 Music Products JSON Data 
const musicData = [
  {
    id: 1,
    name: 'Bowers & Wilkins Px8 Headphones',
    category: 'Headphones',
    price: 699,
    oldPrice: 799,
    rating: 4.9,
    reviews: 1200,
    image: 'https://thumbs.dreamstime.com/b/clean-studio-focused-headphone-display-dark-surface-matte-black-headset-unmarked-box-accessories-crisp-420950932.jpg',
  },
  {
    id: 2,
    name: 'Sennheiser Momentum 4 Wireless',
    category: 'Headphones',
    price: 379,
    oldPrice: 399,
    rating: 4.8,
    reviews: 950,
    image: 'https://thumbs.dreamstime.com/b/modern-black-sound-speakers-headphones-dark-background-58820191.jpg',
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5',
    category: 'Headphones',
    price: 399,
    oldPrice: 449,
    rating: 4.7,
    reviews: 1100,
    image: 'https://www.iwantek.com/cdn/shop/articles/breaking-the-bank-the-highest-priced-headphones-ranked-3041490_1024x1024.jpg?v=1761017570.jpg',
  },
  {
    id: 4,
    name: 'JBL Tour Pro 2 Earbuds',
    category: 'Earbuds',
    price: 249,
    oldPrice: 299,
    rating: 4.6,
    reviews: 800,
    image: 'https://thumbs.dreamstime.com/b/premium-headphones-clean-desktop-soft-studio-lighting-modern-vibe-close-up-resting-desk-boxed-accessory-setup-421296957.jpg',
  },
  {
    id: 5,
    name: 'Bose QuietComfort Ultra',
    category: 'Headphones',
    price: 429,
    oldPrice: 479,
    rating: 4.9,
    reviews: 1300,
    image: 'https://imboldn.com/wp-content/uploads/2026/01/Meze-STRADA-Closed%E2%80%91Back-Luxury-With-Ebony-and-Magnesium-main.jpg',
  },
 {
  "id": 25,
  "name": "Audio-Technica ATH-M50x in Use",
  "category": "Headphones",
  "price": 149,
  "oldPrice": 169,
  "rating": 4.7,
  "reviews": 700,
  "image": "https://www.cnet.com/a/img/resize/0da9d626f87c8cc6ba7aa3ad8c6ad835a61ee79b/hub/2014/05/21/6f48ee2e-7bed-4816-aea9-9bb90429b67f/audio-technica-ath-m50x-product-photos07.jpg?auto=webp&fit=crop&height=675&width=1200"
},
  {
    id: 7,
    name: 'Beats Studio Buds+',
    category: 'Earbuds',
    price: 169,
    oldPrice: 199,
    rating: 4.5,
    reviews: 600,
    image: 'https://thumbs.dreamstime.com/b/d-rendering-showcases-headphones-as-ultimate-audio-listening-device-d-rendering-showcases-headphones-as-ultimate-audio-293818442.jpg',
  },
  {
    id: 8,
    name: 'Sonos Era 100 Speaker',
    category: 'Speakers',
    price: 249,
    oldPrice: 279,
    rating: 4.8,
    reviews: 850,
    image: 'https://thumbs.dreamstime.com/b/experience-immersive-sound-modern-wireless-headphones-premium-audio-bliss-comfortable-listening-immerse-yourself-403842993.jpg',
  },
  {
    id: 9,
    name: 'Jabra Elite 8 Active',
    category: 'Earbuds',
    price: 199,
    oldPrice: 229,
    rating: 4.6,
    reviews: 550,
    image: 'https://images.squarespace-cdn.com/content/v1/621663e7e8f5476ba5df4287/1731857102993-T1SWC9M8C0CHE7JCFMSD/Best-earbuds-for+bass.jpg',
  },
  {
    id: 10,
    name: 'Marshall Acton III Speaker',
    category: 'Speakers',
    price: 279,
    oldPrice: 299,
    rating: 4.7,
    reviews: 650,
    image: 'https://thumbs.dreamstime.com/b/audio-equipment-mouse-speakers-wooden-table-pair-headphones-arranged-neatly-creating-harmonious-display-technology-314346121.jpg',
  },
  {
    id: 11,
    name: 'Audio-Technica AT-LP60X Turntable',
    category: 'Turntable',
    price: 149,
    oldPrice: 169,
    rating: 4.5,
    reviews: 400,
    image: 'https://www.rollingstone.com/wp-content/uploads/2021/04/rolling-stone-audio-awards.jpg?w=1547&h=960&crop=1',
  },
  {
    id: 12,
    name: 'Sennheiser HD 660S2',
    category: 'Headphones',
    price: 599,
    oldPrice: 649,
    rating: 4.9,
    reviews: 900,
    image: 'https://cdn.mos.cms.futurecdn.net/FhKsyhnfiY8tDm7JrcsLB4.jpg',
  },
  {
    id: 13,
    name: 'Anker Soundcore Motion+',
    category: 'Speakers',
    price: 99,
    oldPrice: 119,
    rating: 4.6,
    reviews: 750,
    image: 'https://thumbs.dreamstime.com/b/studio-shot-pair-modern-black-over-ear-headphones-against-vibrant-blue-backdrop-image-highlights-sleek-design-premium-402879585.jpg',
  },
  {
    id: 14,
    name: 'Shure AONIC 50 Gen 2',
    category: 'Headphones',
    price: 349,
    oldPrice: 399,
    rating: 4.7,
    reviews: 550,
    image: 'https://www.digitaltrends.com/tachyon/2025/09/PXL_20250930_150935394.jpg?resize=1200%2C720',
  },
  {
    id: 15,
    name: 'Ultimate Ears BOOM 4',
    category: 'Speakers',
    price: 129,
    oldPrice: 149,
    rating: 4.5,
    reviews: 450,
    image: 'https://thumbs.dreamstime.com/b/clean-studio-focused-headphone-display-dark-surface-matte-black-headset-unmarked-box-accessories-crisp-420950932.jpg',
  },
]

export default function MusicPage() {
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

  const filteredProducts = musicData
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
  const categories = ['All', ...new Set(musicData.map(p => p.category))];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900 dark:from-slate-950 dark:to-indigo-950 overflow-hidden" data-aos="fade-in" data-aos-duration="1500">
        <div className="text-center z-10">
          <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl">ShopMart Music</h1>
          <p className="text-xl text-white/90 mt-4">Discover Premium Audio Gear</p>
        </div>
      </section>

      {/* Search + Filters Section */}
      <section className="px-4 py-12 max-w-7xl mx-auto">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-3xl p-8 shadow-2xl relative">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative flex-1 group">
              <input
                type="text"
                placeholder="Search Music Gear..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-14 py-5 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-full text-lg font-medium transition-all duration-300 focus:border-purple-600 focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-900 group-hover:border-purple-400 shadow-md"
              />
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-gray-300 text-xl group-hover:text-purple-600 transition-colors pointer-events-none" />
            </div>

            <div className="flex flex-wrap gap-4 items-center relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-5 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-full text-lg font-medium transition-all focus:border-purple-600 focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-900 shadow-md"
              >
                <option value="price-asc">Price Low → High</option>
                <option value="price-desc">Price High → Low</option>
                <option value="rating">Highest Rating</option>
              </select>

              <button 
                onClick={() => setShowFilter(!showFilter)}
                className="px-6 py-5 bg-purple-600 text-white rounded-full text-lg font-medium hover:bg-purple-700 transition-all shadow-md flex items-center gap-2"
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
                    <FaFilter className="text-purple-600" /> Select Category
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => {
                          setFilterCategory(cat);
                          setShowFilter(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900 transition-colors ${filterCategory === cat ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 font-semibold' : 'text-gray-800 dark:text-gray-200'}`}
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
        <h2 className="text-5xl font-black text-center mb-16">Featured Music Gear</h2>
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
          {musicData.slice(0, 5).map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-500 hover:rotate-3">
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
        <h2 className="text-5xl font-black text-center mb-16">All Music Gear</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {paginatedProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:scale-105 transition-all duration-500 group relative overflow-hidden flex flex-col h-full"
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

              <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-600 transition-colors truncate">
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

              <button className="mt-auto w-full bg-purple-600 text-white py-4 rounded-2xl flex items-center justify-center gap-4 hover:bg-purple-700 hover:scale-105 transition-all duration-300 group-hover:shadow-xl text-lg font-bold shadow-md">
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
              className={`px-8 py-4 rounded-2xl shadow-lg text-lg font-bold transition-all duration-300 ${currentPage === index + 1 ? 'bg-purple-600 text-white scale-110' : 'bg-slate-200 dark:bg-slate-700 hover:bg-purple-100 dark:hover:bg-purple-900 hover:scale-105'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}